import { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebaseConfig'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)
const CART_KEY = 'sd_cart'

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    const fetchCart = async () => {
     
      const userId = user?.id || user?.email;
      
      if (userId) {
        try {
 
          const cartRef = doc(db, "carrinhos", String(userId))
          const docSnap = await getDoc(cartRef)

          if (docSnap.exists()) {
            setItems(docSnap.data().itens || [])
          }
        } catch (e) {
          console.error("Erro ao carregar carrinho do Firebase:", e)
        }
      } else {
        const local = localStorage.getItem(CART_KEY)
        if (local) setItems(JSON.parse(local))
      }
    }
    fetchCart()
  }, [user])

 
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])


  const syncWithFirebase = async (currentItems) => {
    const userId = user?.id || user?.email;

    
    if (userId && typeof userId !== 'undefined') {
      try {
        const idString = String(userId);
        const cartRef = doc(db, "carrinhos", idString);
        
        await setDoc(cartRef, {
          itens: currentItems,
          usuarioNome: user.name || "Usuário",
          total: currentItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
          atualizadoEm: serverTimestamp()
        });
      } catch (e) {
        console.error("Erro ao sincronizar com Firebase:", e);
      }
    }
  };

  const addItem = (product, quantity = 1, option = null) => {
    setItems((prev) => {
      const key = `${product.id}-${option?.label ?? 'default'}`
      const existing = prev.find((i) => i.key === key)
      let newItems
      
      if (existing) {
        newItems = prev.map((i) => i.key === key ? { ...i, quantity: i.quantity + quantity } : i)
      } else {
        newItems = [...prev, { key, product, option, quantity, price: product.price + (option?.extra ?? 0) }]
      }
      
      syncWithFirebase(newItems)
      return newItems
    })
    setIsOpen(true)
  }

  const removeItem = (key) => {
    setItems((prev) => {
      const newItems = prev.filter((i) => i.key !== key)
      syncWithFirebase(newItems)
      return newItems
    })
  }

  const updateQuantity = (key, quantity) => {
    if (quantity <= 0) return removeItem(key)
    setItems((prev) => {
      const newItems = prev.map((i) => i.key === key ? { ...i, quantity } : i)
      syncWithFirebase(newItems)
      return newItems
    })
  }

  const clearCart = async () => {
    setItems([])
    localStorage.removeItem(CART_KEY)
    
    const userId = user?.id || user?.email;
    if (userId) {
      try {
        await setDoc(doc(db, "carrinhos", String(userId)), { 
          itens: [], 
          atualizadoEm: serverTimestamp() 
        })
      } catch (e) {
        console.error("Erro ao limpar Firebase:", e)
      }
    }
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ 
      items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
} 