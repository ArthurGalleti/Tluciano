const BASE = 'https://images.unsplash.com/photo-'
const img = (id, w = 600, h = 400) => `${BASE}${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export const restaurants = [
  {
    id: 1,
    name: 'Sweet Heaven',
    emoji: '🍰',
    image: img('1602351447937-745cb720612f', 800, 500),
    category: 'Bolos e Folhados',
    accent: '#e9557f',
    accentLight: '#fce7f0',
    gradient: 'linear-gradient(135deg, #fce7f0 0%, #ffd6e7 100%)',
    rating: 4.8,
    reviews: 342,
    time: '20–30 min',
    deliveryFee: 'Grátis',
    minOrder: 10,
    tags: ['Mais Avaliado', 'Mais Vendido'],
    description:
      'Bolos e doces artesanais feitos frescos toda manhã com ingredientes premium. De clássicos bolos de morango a sofisticados bolos de matcha em camadas.',
    menu: [
      {
        label: 'Mais Vendidos',
        items: [
          { id: 1, name: 'Bolo de Morango', price: 12.9, emoji: '🍰', image: img('1579356094148-9b74dab60f5b'), description: 'Bolo clássico em camadas com morangos frescos e chantilly.', rating: 4.9, reviews: 210, tags: ['Clássico', 'Mais Vendido'], options: [{ label: 'Pequeno (15cm)', extra: 0 }, { label: 'Médio (20cm)', extra: 4 }, { label: 'Grande (25cm)', extra: 8 }] },
          { id: 2, name: 'Bolo de Matcha em Camadas', price: 14.5, emoji: '🍵', image: img('1565958011792-fe9c5ac5cbfe'), description: 'Pão de ló de matcha com cobertura de cream cheese e raspas de chocolate branco.', rating: 4.7, reviews: 98, tags: ['Em Alta', 'Novo'], options: [{ label: 'Pequeno (15cm)', extra: 0 }, { label: 'Médio (20cm)', extra: 5 }] },
        ],
      },
      {
        label: 'Cupcakes',
        items: [
          { id: 3, name: 'Cupcake Red Velvet', price: 5.5, emoji: '🧁', image: img('1761746350777-b86ae72e8f41'), description: 'Red velvet úmido com cobertura cremosa de cream cheese.', rating: 4.8, reviews: 134, tags: ['Clássico'], options: [] },
          { id: 4, name: 'Cupcake de Limão e Mirtilo', price: 5.9, emoji: '🫐', image: img('1571877227200-a0d98ea607e9'), description: 'Base cítrica de limão com cobertura de mirtilo fresco.', rating: 4.6, reviews: 77, tags: ['Sazonal'], options: [] },
          { id: 5, name: 'Cupcake de Baunilha', price: 4.9, emoji: '🍦', image: img('1486427944299-d1955d23e34d'), description: 'Clássico de baunilha com um alto swirl de buttercream.', rating: 4.5, reviews: 55, tags: ['Clássico'], options: [] },
        ],
      },
      {
        label: 'Folhados',
        items: [
          { id: 6, name: 'Croissant de Amêndoa', price: 4.5, emoji: '🥐', image: img('1555507036-ab1f4038808a'), description: 'Croissant amanteigado e crocante recheado com creme de amêndoa.', rating: 4.7, reviews: 89, tags: ['Padaria'], options: [] },
          { id: 7, name: 'Éclair de Chocolate', price: 6.0, emoji: '🍫', image: img('1548907040-4baa42d10919'), description: 'Massa choux com ganache de chocolate belga.', rating: 4.6, reviews: 63, tags: ['Francês'], options: [] },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Donut World',
    emoji: '🍩',
    image: img('1551024601-bec78aea704b', 800, 500),
    category: 'Donuts e Café',
    accent: '#f97316',
    accentLight: '#fff7ed',
    gradient: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
    rating: 4.6,
    reviews: 518,
    time: '15–25 min',
    deliveryFee: 'Grátis',
    minOrder: 8,
    tags: ['Entrega Rápida', 'Popular'],
    description:
      'Os donuts mais gostosos da cidade, feitos frescos a cada hora. Escolha entre mais de 20 sabores, dos clássicos glaciados a incríveis opções sazonais.',
    menu: [
      {
        label: 'Clássicos',
        items: [
          { id: 8, name: 'Donut Glaceado Original', price: 2.9, emoji: '🍩', image: img('1597419765826-5b03fa018c18'), description: 'O icônico donut glaceado. Leve, fofo e adocicado na medida certa.', rating: 4.8, reviews: 320, tags: ['Clássico', 'Mais Vendido'], options: [] },
          { id: 9, name: 'Donut de Chocolate', price: 3.2, emoji: '🍫', image: img('1579761314396-b36fac12eba4'), description: 'Donut clássico com cobertura rica de chocolate e granulado colorido.', rating: 4.7, reviews: 198, tags: ['Clássico'], options: [] },
          { id: 10, name: 'Donut de Açúcar de Confeiteiro', price: 2.8, emoji: '⬜', image: img('1639736884479-ebdfeec6adbd'), description: 'Donut macio generosamente polvilhado com açúcar de confeiteiro.', rating: 4.5, reviews: 144, tags: ['Clássico'], options: [] },
        ],
      },
      {
        label: 'Especiais',
        items: [
          { id: 11, name: 'Donut de Morango', price: 3.5, emoji: '🍓', image: img('1666015322883-2a42050a439d'), description: 'Glasê de morango fresco com granulado colorido.', rating: 4.8, reviews: 211, tags: ['Popular'], options: [] },
          { id: 12, name: 'Maple com Bacon', price: 4.2, emoji: '🥓', image: img('1481391319972-98a89b4ff4c9'), description: 'Glasê de maple syrup com pedaços de bacon crocante.', rating: 4.6, reviews: 156, tags: ['Doce e Salgado'], options: [] },
          { id: 13, name: 'Donut de Mirtilo', price: 3.8, emoji: '🫐', image: img('1678859119995-4b75a2e86ec5'), description: 'Donut estilo bolo, denso e úmido com sabor intenso de mirtilo.', rating: 4.4, reviews: 89, tags: ['Estilo Bolo'], options: [] },
        ],
      },
      {
        label: 'Café',
        items: [
          { id: 14, name: 'Latte Gelado', price: 5.5, emoji: '☕', image: img('1509042239860-f550ce710b93'), description: 'Espresso suave com gelo e leite a sua escolha.', rating: 4.7, reviews: 203, tags: ['Bebida'], options: [{ label: 'Regular', extra: 0 }, { label: 'Grande', extra: 1 }] },
          { id: 15, name: 'Cold Brew', price: 5.9, emoji: '🧊', image: img('1461023058943-07fcbe16d735'), description: 'Café coado a frio por 18 horas, suave e encorpado.', rating: 4.8, reviews: 177, tags: ['Bebida', 'Popular'], options: [] },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Gelato Bros',
    emoji: '🍦',
    image: img('1717853411695-c9f844e1df46', 800, 500),
    category: 'Sorvetes e Gelato',
    accent: '#0891b2',
    accentLight: '#ecfeff',
    gradient: 'linear-gradient(135deg, #ecfeff 0%, #a5f3fc 100%)',
    rating: 4.9,
    reviews: 621,
    time: '25–35 min',
    deliveryFee: 'R$ 1,99',
    minOrder: 12,
    tags: ['Mais Avaliado', '🏆 Premiado'],
    description:
      'Gelato italiano autêntico produzido diariamente com ingredientes importados. Nossos sabores premiados são elaborados em pequenos lotes para máxima frescura.',
    menu: [
      {
        label: 'Gelato',
        items: [
          { id: 16, name: 'Gelato de Pistache', price: 7.5, emoji: '🌿', image: img('1497034825429-c343d7c6a68f'), description: 'Gelato cremoso e rico com pistache da Sicília.', rating: 4.9, reviews: 341, tags: ['Exclusivo', 'Mais Vendido'], options: [{ label: 'Uma Bola', extra: 0 }, { label: 'Duas Bolas', extra: 2.5 }, { label: 'Três Bolas', extra: 5 }] },
          { id: 17, name: 'Gelato de Chocolate Amargo', price: 7.0, emoji: '🍫', image: img('1548907040-4baa42d10919'), description: 'Gelato intenso de chocolate amargo 70% para os verdadeiros fãs.', rating: 4.8, reviews: 228, tags: ['Intenso'], options: [{ label: 'Uma Bola', extra: 0 }, { label: 'Duas Bolas', extra: 2.5 }] },
          { id: 18, name: 'Stracciatella', price: 7.0, emoji: '🤍', image: img('1567206563174-369fae27f2c9'), description: 'Gelato branco leitoso com delicados fios de chocolate amargo.', rating: 4.9, reviews: 192, tags: ['Clássico Italiano'], options: [{ label: 'Uma Bola', extra: 0 }, { label: 'Duas Bolas', extra: 2.5 }] },
        ],
      },
      {
        label: 'Sorbet',
        items: [
          { id: 19, name: 'Sorbet de Manga', price: 6.5, emoji: '🥭', image: img('1663904458920-f153c162fa79'), description: 'Sorbet tropical sem laticínios feito com mangas Alphonso selecionadas.', rating: 4.7, reviews: 145, tags: ['Vegano', 'Sem Laticínios'], options: [{ label: 'Uma Bola', extra: 0 }, { label: 'Duas Bolas', extra: 2.5 }] },
          { id: 20, name: 'Sorbet de Limão Siciliano', price: 6.0, emoji: '🍋', image: img('1462275646964-a0e3386b89fa'), description: 'Sorbet refrescante de limão siciliano com raspas frescas.', rating: 4.6, reviews: 112, tags: ['Vegano', 'Refrescante'], options: [{ label: 'Uma Bola', extra: 0 }, { label: 'Duas Bolas', extra: 2.5 }] },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Cupcake Studio',
    emoji: '🧁',
    image: img('1486427944299-d1955d23e34d', 800, 500),
    category: 'Cupcakes e Bolos',
    accent: '#7c3aed',
    accentLight: '#f5f3ff',
    gradient: 'linear-gradient(135deg, #f5f3ff 0%, #ddd6fe 100%)',
    rating: 4.7,
    reviews: 289,
    time: '20–30 min',
    deliveryFee: 'Grátis',
    minOrder: 15,
    tags: ['Popular', 'Para Presente'],
    description:
      'Cupcakes personalizados para cada ocasião, assados sob encomenda com ingredientes premium. Perfeito para aniversários, festas e o dia a dia.',
    menu: [
      {
        label: 'Cupcakes Exclusivos',
        items: [
          { id: 21, name: 'Purple Velvet', price: 6.5, emoji: '💜', image: img('1576618148400-f54bed99fcfd'), description: 'Bolo velvet com toque de lavanda e cobertura de mirtilo.', rating: 4.8, reviews: 156, tags: ['Exclusivo', 'Mais Vendido'], options: [] },
          { id: 22, name: 'Caramelo Salgado', price: 6.9, emoji: '🍮', image: img('1594054899345-f8a8967ccf25'), description: 'Cupcake de manteiga dourada com buttercream de caramelo salgado.', rating: 4.9, reviews: 203, tags: ['Favorito da Galera'], options: [] },
          { id: 23, name: 'Cookies & Cream', price: 6.5, emoji: '🍪', image: img('1486427944299-d1955d23e34d'), description: 'Cupcake de baunilha com cobertura recheada de Oreo.', rating: 4.7, reviews: 134, tags: ['Popular'], options: [] },
        ],
      },
      {
        label: 'Mini Cupcakes',
        items: [
          { id: 24, name: 'Caixinha de Mini Cupcakes', price: 14.9, emoji: '🎁', image: img('1486427944299-d1955d23e34d'), description: 'Caixa com 12 mini cupcakes, 4 sabores variados.', rating: 4.8, reviews: 89, tags: ['Presente', 'Econômico'], options: [] },
          { id: 25, name: 'Mini Cupcake de Chocolate', price: 3.5, emoji: '🍫', image: img('1649794167937-8741acc67ebc'), description: 'Mini cupcakes de fudge de chocolate com ganache.', rating: 4.6, reviews: 66, tags: ['Mini'], options: [] },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Choco House',
    emoji: '🍫',
    image: img('1549007994-cb92caebd54b', 800, 500),
    category: 'Chocolate e Trufas',
    accent: '#92400e',
    accentLight: '#fef3c7',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    rating: 4.5,
    reviews: 187,
    time: '30–40 min',
    deliveryFee: 'R$ 0,99',
    minOrder: 20,
    tags: ['Artesanal', 'Premium'],
    description:
      'Especialistas em chocolate belga e suíço. Cada peça é feita à mão com cacau de origem única e técnicas tradicionais transmitidas por gerações.',
    menu: [
      {
        label: 'Trufas',
        items: [
          { id: 26, name: 'Trufa Dark Clássica', price: 3.5, emoji: '🔮', image: img('1582493255270-b3844e2a63c8'), description: 'Trufa de chocolate amargo 72% enrolada à mão com cacau em pó.', rating: 4.8, reviews: 112, tags: ['Exclusivo', 'Belga'], options: [] },
          { id: 27, name: 'Pralinê de Avelã', price: 4.0, emoji: '🌰', image: img('1550989460-0dcc4d21d6f1'), description: 'Casca de chocolate ao leite com recheio de pralinê de avelã torrada.', rating: 4.7, reviews: 88, tags: ['Popular'], options: [] },
          { id: 28, name: 'Caramelo com Flor de Sal', price: 4.2, emoji: '🧂', image: img('1729673520849-263dbc8e0fc3'), description: 'Chocolate amargo com caramelo líquido e flor de sal Maldon.', rating: 4.9, reviews: 134, tags: ['Mais Vendido'], options: [] },
        ],
      },
      {
        label: 'Barras de Chocolate',
        items: [
          { id: 29, name: 'Barra Dark 85%', price: 8.9, emoji: '🍫', image: img('1548907040-4baa42d10919'), description: 'Barra de 85g de chocolate amargo de origem única do Equador.', rating: 4.6, reviews: 67, tags: ['Origem Única'], options: [] },
          { id: 30, name: 'Barra ao Leite com Amêndoas', price: 7.9, emoji: '🥛', image: img('1618320362989-d8a9eb2a1e52'), description: 'Chocolate ao leite suíço cremoso com amêndoas inteiras torradas.', rating: 4.7, reviews: 54, tags: ['Clássico'], options: [] },
        ],
      },
      {
        label: 'Bebidas Quentes',
        items: [
          { id: 31, name: 'Chocolate Quente Encorpado', price: 6.5, emoji: '☕', image: img('1517701550927-30cf4ba1dba5'), description: 'Chocolate quente belga encorpado, servido com chantilly.', rating: 4.9, reviews: 98, tags: ['Bebida', 'Quentinho'], options: [{ label: 'Regular', extra: 0 }, { label: 'Grande', extra: 1.5 }] },
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'The Bakery',
    emoji: '🥐',
    image: img('1509440159596-0249088772ff', 800, 500),
    category: 'Pães e Folhados',
    accent: '#b45309',
    accentLight: '#fffbeb',
    gradient: 'linear-gradient(135deg, #fffbeb 0%, #fde68a 100%)',
    rating: 4.4,
    reviews: 413,
    time: '20–35 min',
    deliveryFee: 'Grátis',
    minOrder: 10,
    tags: ['Fresquinho Todo Dia', 'Caseiro'],
    description:
      'Padaria tradicional com receitas feitas do zero desde 1998. Nossos sourdoughs, croissants e folhados são fermentados lentamente para um sabor incomparável.',
    menu: [
      {
        label: 'Croissants e Folhados',
        items: [
          { id: 32, name: 'Croissant de Manteiga', price: 3.5, emoji: '🥐', image: img('1555507036-ab1f4038808a'), description: 'Croissant de manteiga laminado, fermentação lenta de 72 horas.', rating: 4.9, reviews: 287, tags: ['Mais Vendido', 'Clássico'], options: [] },
          { id: 33, name: 'Pain au Chocolat', price: 4.0, emoji: '🍫', image: img('1509440159596-0249088772ff'), description: 'Massa de croissant com dois bastões de chocolate amargo.', rating: 4.8, reviews: 201, tags: ['Popular'], options: [] },
          { id: 34, name: 'Danish de Canela', price: 4.5, emoji: '🌀', image: img('1466224518681-8e7321f58f00'), description: 'Espiral de massa dinamarquesa com açúcar canela e glacê de baunilha.', rating: 4.6, reviews: 133, tags: ['Doce'], options: [] },
        ],
      },
      {
        label: 'Pães',
        items: [
          { id: 35, name: 'Sourdough Campesino', price: 9.9, emoji: '🍞', image: img('1549931319-a545dcf3bc73'), description: 'Pão grande de fermentação a frio por 48 horas, casca crocante.', rating: 4.8, reviews: 155, tags: ['Artesanal', 'Sourdough'], options: [] },
          { id: 36, name: 'Pão de Centeio com Sementes', price: 8.5, emoji: '🫓', image: img('1558618666-fcd25c85cd64'), description: 'Centeio escuro com sementes de girassol, abóbora e gergelim.', rating: 4.5, reviews: 79, tags: ['Saudável', 'Com Sementes'], options: [] },
        ],
      },
      {
        label: 'Doces',
        items: [
          { id: 37, name: 'Kouign-Amann', price: 5.5, emoji: '✨', image: img('1555507036-ab1f4038808a'), description: 'Torta bretã amanteigada e caramelizada — crocante por fora, macia por dentro.', rating: 4.9, reviews: 112, tags: ['Exclusivo', 'Francês'], options: [] },
        ],
      },
    ],
  },
]

export const allProducts = restaurants.flatMap((r) =>
  r.menu.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, restaurantId: r.id, restaurantName: r.name, restaurantAccent: r.accent }))
  )
)

export function getRestaurantById(id) {
  return restaurants.find((r) => r.id === Number(id)) ?? null
}

export function getProductById(id) {
  return allProducts.find((p) => p.id === Number(id)) ?? null
}
