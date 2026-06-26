export type ProductSize = {
  size: string
  price: number
  inStock: boolean
}

export type ProductFaq = {
  question: string
  answer: string
}

export type Product = {
  slug: string
  name: string
  flavor: string
  image: string
  sizes: ProductSize[]
  tags: string[]
  ingredients: string
  description: string
  usage: string
  primaryKeyword: string
  secondaryKeywords: string[]
  bestFor: string[]
  faqs: ProductFaq[]
}

const standardSizes = (price220: number, price340: number, price450: number): ProductSize[] => [
  { size: '220g', price: price220, inStock: true },
  { size: '340g', price: price340, inStock: true },
  { size: '450g', price: price450, inStock: true },
]

const standardFaqs = (productName: string): ProductFaq[] => [
  {
    question: `How do I order ${productName} in Sri Lanka?`,
    answer: `Choose your jar size and add it to the basket to checkout on the website. WhatsApp is available if you want to ask a quick question before ordering.`,
  },
  {
    question: 'Is oil separation normal in peanut butter?',
    answer: 'Yes. Natural peanut butter can separate because peanut oil rises to the top. Stir well before use. Keeping the jar in the fridge can slow separation and keep the texture thicker.',
  },
  {
    question: 'Does this contain peanuts?',
    answer: 'Yes. All Kurkees peanut butter products contain peanuts and are not suitable for people with peanut allergy.',
  },
]

export const products: Product[] = [
  {
    slug: 'sugar-salted-smooth',
    name: 'Sugar Salted Smooth Peanut Butter',
    flavor: 'Classic Balanced Smooth',
    image: '/classic-smooth.png',
    sizes: standardSizes(750, 1050, 1350),
    tags: ['Best Seller', 'Classic', 'Smooth'],
    ingredients: 'Peanuts, Sugar, Salt',
    primaryKeyword: 'smooth peanut butter',
    secondaryKeywords: ['creamy peanut butter', 'peanut butter spread'],
    bestFor: ['Toast and bread', 'School snacks', 'Smoothies', 'Everyday family use'],
    description: 'A creamy smooth peanut butter made for Sri Lankan homes that want a familiar sweet-salty taste. It spreads easily on bread, blends well into smoothies, and works as a quick breakfast or snack option.',
    usage: 'Spread on toast, bread, roti or pancakes, blend with banana and milk, or stir into warm oats for a filling breakfast.',
    faqs: standardFaqs('Sugar Salted Smooth Peanut Butter'),
  },
  {
    slug: 'sugar-salted-crunchy',
    name: 'Sugar Salted Crunchy Peanut Butter',
    flavor: 'Classic Textured Crunch',
    image: '/classic-crunchy.png',
    sizes: standardSizes(750, 1050, 1350),
    tags: ['Classic', 'Crunchy'],
    ingredients: 'Peanuts, Sugar, Salt',
    primaryKeyword: 'crunchy peanut butter',
    secondaryKeywords: ['peanut butter crunch', 'crunchy peanut butter price', 'peanut butter Sri Lanka'],
    bestFor: ['Crunch lovers', 'Peanut butter sandwiches', 'Snack bowls', 'Baking'],
    description: 'A crunchy peanut butter with roasted peanut pieces for customers who enjoy extra texture. It gives bread, fruit, oats and desserts a stronger peanut bite.',
    usage: 'Use in peanut butter sandwiches, spread on sliced apples, add to oats, or enjoy as a crunchy topping for homemade snacks.',
    faqs: standardFaqs('Sugar Salted Crunchy Peanut Butter'),
  },
  {
    slug: 'salted-sugar-free-smooth',
    name: 'Salted Sugar-Free Smooth Peanut Butter',
    flavor: 'Smooth Savory Blend',
    image: '/sugar-free-smooth.png',
    sizes: standardSizes(750, 1050, 1350),
    tags: ['Sugar-Free', 'Smooth'],
    ingredients: 'Peanuts, Salt',
    primaryKeyword: 'no sugar peanut butter',
    secondaryKeywords: ['sugar free peanut butter', 'peanut butter without sugar', 'salted peanut butter'],
    bestFor: ['Low sugar diets', 'Gym meals', 'Oats', 'Savory snacks'],
    description: 'A smooth sugar-free peanut butter with a light salted taste. It is a simple choice for people who want peanut flavour without added sugar.',
    usage: 'Mix into oats, spread on bread, add to smoothies, or use as a savory dip with fruit or crackers.',
    faqs: standardFaqs('Salted Sugar-Free Smooth Peanut Butter'),
  },
  {
    slug: 'salted-sugar-free-crunchy',
    name: 'Salted Sugar-Free Crunchy Peanut Butter',
    flavor: 'Crunchy Savory Blend',
    image: '/sugar-free-crunchy.png',
    sizes: standardSizes(750, 1050, 1350),
    tags: ['Sugar-Free', 'Crunchy'],
    ingredients: 'Peanuts, Salt',
    primaryKeyword: 'sugar free crunchy peanut butter',
    secondaryKeywords: ['no sugar peanut butter', 'crunchy peanut butter', 'peanut butter without sugar'],
    bestFor: ['Crunchy snacks', 'Fitness meals', 'Low sugar eating', 'Toast'],
    description: 'A crunchy sugar-free peanut butter for customers who want roasted peanut pieces without added sugar. It is simple, savoury and easy to use in daily meals.',
    usage: 'Spread on toast, add to banana slices, mix into snack bowls, or use in homemade peanut sauces.',
    faqs: standardFaqs('Salted Sugar-Free Crunchy Peanut Butter'),
  },
  {
    slug: 'unsalted-sugar-free-smooth',
    name: 'Unsalted Sugar-Free Smooth Peanut Butter',
    flavor: '100% Pure Peanut',
    image: '/unsalted-sugar-free.png',
    sizes: [
      { size: '220g', price: 750, inStock: true },
      { size: '340g', price: 1050, inStock: true },
      { size: '450g', price: 1350, inStock: false },
    ],
    tags: ['100% Pure', 'Sugar-Free', 'Unsalted'],
    ingredients: 'Roasted Peanuts Only',
    primaryKeyword: 'unsalted peanut butter',
    secondaryKeywords: ['unsweetened peanut butter', 'no sugar no salt peanut butter', 'peanut butter without salt', 'peanut butter without sugar'],
    bestFor: ['Customers avoiding added salt', 'Customers avoiding added sugar', 'Baby food recipes where age-appropriate', 'Home baking'],
    description: 'Made with roasted peanuts only. No added sugar, no added salt and no extra oils, giving you a clean base for family meals, baking and smoothies.',
    usage: 'Use in smoothies, oats, homemade sauces, baking, or age-appropriate baby and toddler meals after checking allergy safety.',
    faqs: [
      ...standardFaqs('Unsalted Sugar-Free Smooth Peanut Butter'),
      {
        question: 'Is this the best Kurkees option with no sugar and no salt?',
        answer: 'Yes. This variant is made with roasted peanuts only, so it is the simplest Kurkees option if you want no added sugar and no added salt.',
      },
    ],
  },
  {
    slug: 'nai-miris-spicy',
    name: 'Nai Miris Spicy Peanut Butter',
    flavor: 'Fiery Savory Kick',
    image: '/nai-miris-spicy.png',
    sizes: standardSizes(750, 1050, 1350),
    tags: ['Nai Miris', 'Spicy', 'Savory'],
    ingredients: 'Peanuts, Nai Miris (Cobra Chilli), Sugar, Salt',
    primaryKeyword: 'spicy peanut butter',
    secondaryKeywords: ['savory peanut butter', 'Sri Lankan peanut butter', 'peanut spread'],
    bestFor: ['Spicy food lovers', 'Burgers', 'Satay-style sauces', 'Savory snacks'],
    description: 'A Sri Lankan-style spicy peanut butter with Nai Miris for customers who want a savoury, fiery twist instead of a sweet spread.',
    usage: 'Use on burgers, roti, sandwiches, grilled meat, fried snacks, or mix into a spicy peanut dipping sauce.',
    faqs: standardFaqs('Nai Miris Spicy Peanut Butter'),
  },
  {
    slug: 'chocofeda-chocolate-peanut',
    name: 'Chocofeda Chocolate Peanut Spread',
    flavor: 'Chocolate Peanut Blend',
    image: '/chocofeda.png',
    sizes: [
      { size: '220g', price: 790, inStock: true },
      { size: '340g', price: 1100, inStock: true },
      { size: '450g', price: 1400, inStock: true },
    ],
    tags: ['Chocofeda', 'Chocolate', 'Kids Favorite'],
    ingredients: 'Peanuts, Cocoa Powder, Sugar, Salt',
    primaryKeyword: 'chocolate peanut butter',
    secondaryKeywords: ['chocolate peanut spread', 'peanut butter and chocolate', 'chocolate peanut butter price'],
    bestFor: ['Kids snacks', 'Bread and roti', 'Crepes', 'Fruit dip'],
    description: 'A rich chocolate peanut spread made for customers who want a chocolaty snack with peanut flavour. Chocofeda is smooth, creamy and easy to spread on everyday Sri Lankan breakfast and snack foods.',
    usage: 'Spread on bread, roti, paratha, crepes or pancakes, or use as a dip for bananas, strawberries and simple snacks.',
    faqs: standardFaqs('Chocofeda Chocolate Peanut Spread'),
  },
]

export const flavorFilters = [
  'All', 'Classic', 'Sugar-Free', 'Unsalted', 'Nai Miris', 'Chocofeda'
]

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getStartingPrice(product: Pick<Product, 'sizes'>) {
  const prices = product.sizes.map((size) => size.price)
  return Math.min(...prices)
}

export function getMainImage(product: Product | any) {
  return product.image || product.images?.[0]?.image_url || product.images?.[0] || '/placeholder.svg'
}

export function isSizeInStock(size: ProductSize | any) {
  return Boolean(size.inStock ?? size.in_stock)
}

export function getInStockSizes(product: Pick<Product, 'sizes'> | any) {
  return product.sizes.filter((size: ProductSize | any) => isSizeInStock(size))
}
