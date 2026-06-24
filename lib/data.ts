export type ProductSize = {
  size: string
  price: number
  inStock: boolean // Set to true for "In Stock", or false for "Out of Stock"
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
}

// Helper template for standard ranges (makes management easier)
const standardSizes = (price220: number, price340: number, price450: number): ProductSize[] => [
  { size: '220g', price: price220, inStock: true },
  { size: '340g', price: price340, inStock: true },
  { size: '450g', price: price450, inStock: true }, // Change to false if out of stock
]

export const products: Product[] = [
  {
    slug: 'sugar-salted-smooth',
    name: 'Sugar Salted Smooth',
    flavor: 'Classic Balanced Smooth',
    image: '/classic-smooth.png',
    sizes: standardSizes(750, 1050, 1350),
    tags: ['Best Seller', 'Classic'],
    ingredients: 'Peanuts, Sugar, Salt',
    description: 'Our signature classic recipe. Ground to a silky-smooth consistency with the perfect touch of sweetness and salt.',
    usage: 'Drizzle over fresh bananas, spread generously on warm morning toast, or blend into thick breakfast smoothies.'
  },
  {
    slug: 'sugar-salted-crunchy',
    name: 'Sugar Salted Crunchy',
    flavor: 'Classic Textured Crunch',
    image: '/classic-crunchy.png',
    sizes: standardSizes(750, 1050, 1350),
    tags: ['Classic', 'Crunchy'],
    ingredients: 'Peanuts, Sugar, Salt',
    description: 'The traditional recipe you love with a satisfying crunch. Loaded with fresh-roasted peanut pieces throughout.',
    usage: 'Perfect for classic peanut butter sandwiches, baking rustic cookies, or enjoying straight off the spoon.'
  },
  {
    slug: 'salted-sugar-free-smooth',
    name: 'Salted Sugar-Free Smooth',
    flavor: 'Smooth Savory Blend',
    image: '/sugar-free-smooth.png',
    sizes: standardSizes(750, 1050, 1350),
    tags: ['Sugar-Free', 'Smooth'],
    ingredients: 'Peanuts, Salt',
    description: 'All of the rich peanut flavor, none of the sugar. Ground smooth with a light pinch of salt to highlight the roast.',
    usage: 'Excellent as a savory dip for sliced apples or celery, or stirred into warm oats for a clean, sugar-free breakfast.'
  },
  {
    slug: 'salted-sugar-free-crunchy',
    name: 'Salted Sugar-Free Crunchy',
    flavor: 'Crunchy Savory Blend',
    image: '/sugar-free-crunchy.png',
    sizes: standardSizes(750, 1050, 1350),
    tags: ['Sugar-Free', 'Crunchy'],
    ingredients: 'Peanuts, Salt',
    description: 'For those who want a crunchy texture with zero sugar. Simple, savory, and packed with roasted peanut chunks.',
    usage: 'Great for high-protein keto bowls, stirred into greek yogurt, or spread on low-carb crackers.'
  },
  {
    slug: 'unsalted-sugar-free-smooth',
    name: 'Unsalted Sugar-Free Smooth',
    flavor: '100% Pure Peanut',
    image: '/unsalted-sugar-free.png',
    // Example: Let's assume the 450g size is temporarily out of stock
    sizes: [
      { size: '220g', price: 750, inStock: true },
      { size: '340g', price: 1050, inStock: true },
      { size: '450g', price: 1350, inStock: false }, // Out of stock
    ],
    tags: ['100% Pure', 'Sugar-Free', 'Unsalted'],
    ingredients: 'Roasted Peanuts Only',
    description: 'Exactly one pure ingredient. No added sugar, no added salt, and no extra oils—just raw roasted peanut goodness.',
    usage: 'Highly recommended for high-protein gym shakes, home baking where you want to control the salt, or as a clean ingredient in baby food.'
  },
  {
    slug: 'nai-miris-spicy',
    name: 'Nai Miris Spicy',
    flavor: 'Fiery Savory Kick',
    image: '/nai-miris-spicy.png',
    sizes: standardSizes(750, 1050, 1350),
    tags: ['Nai Miris', 'Spicy', 'Savory'],
    ingredients: 'Peanuts, Nai Miris (Cobra Chilli), Sugar, Salt',
    description: 'Infused with a touch of fiery Sri Lankan Nai Miris (Cobra Chilli). A unique savory kick that bridges rich creaminess with native heat.',
    usage: 'Incredible spread directly onto beef or chicken burgers, whisked into a savory satay dipping sauce, or used as a spicy glaze for grilled local meats.'
  },
  {
    slug: 'chocofeda-chocolate-peanut',
    name: 'Chocofeda Chocolate Spread',
    flavor: 'Chocolate Peanut Blend',
    image: '/chocofeda.png',
    sizes: [
      { size: '220g', price: 790, inStock: true },
      { size: '340g', price: 1100, inStock: true },
      { size: '450g', price: 1400, inStock: true },
    ],
    tags: ['Chocofeda', 'Chocolate', 'Kids Favorite'],
    ingredients: 'Peanuts, Cocoa Powder, Sugar, Salt',
    description: 'Our delicious chocolate peanut spread under the Chocofeda brand. Rich, creamy, chocolaty, and deeply satisfying.',
    usage: 'Spread on crepes, parathas, roti, or sliced bread. Perfect as a cleaner dip for strawberries and pretzels.'
  }
]

export const flavorFilters = [
  'All', 'Classic', 'Sugar-Free', 'Unsalted', 'Nai Miris', 'Chocofeda'
]