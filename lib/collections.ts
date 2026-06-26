import { products, type Product } from '@/lib/data'

export type CollectionFaq = {
  question: string
  answer: string
}

export type CollectionPage = {
  slug: string
  label: string
  title: string
  eyebrow: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  primaryKeyword: string
  secondaryKeywords: string[]
  productSlugs: string[]
  bestFor: string[]
  buyingGuide: string[]
  faqs: CollectionFaq[]
}

export const collections: CollectionPage[] = [
  {
    slug: 'peanut-butter-price-in-sri-lanka',
    label: 'Price guide',
    title: 'Kurkees Price Guide',
    eyebrow: 'Compare jar prices',
    metaTitle: 'Peanut Butter Price in Sri Lanka | Kurkees Price Guide',
    metaDescription:
      'Compare Kurkees jar prices in Sri Lanka by flavour and size, then checkout directly on the website.',
    h1: 'Kurkees Jar Prices in Sri Lanka',
    intro:
      'Use this page to compare available flavours, sizes and starting prices before you choose a jar. The full product page shows the exact size options for each flavour.',
    primaryKeyword: 'peanut butter price in Sri Lanka',
    secondaryKeywords: ['peanut butter price', 'peanut butter cost', 'peanut butter online order', 'peanut butter price list'],
    productSlugs: products.map((product) => product.slug),
    bestFor: ['Price comparison', 'First-time buyers', 'Family shopping', 'Checking available sizes'],
    buyingGuide: [
      'Start with the flavour your home will use most often: smooth for easy spreading, crunchy for texture, or Chocofeda for a sweeter chocolate option.',
      'Choose 220g for trial, 340g for regular home use, and 450g when your family or meal plan uses it often.',
      'Add your chosen jar to the basket and checkout on the website. Use WhatsApp only if you want a quick clarification before ordering.',
    ],
    faqs: [
      {
        question: 'Where can I see current Kurkees prices?',
        answer:
          'Product cards show the starting price, and each product page shows available 220g, 340g and 450g prices where that size exists.',
      },
      {
        question: 'Can I checkout on the website?',
        answer:
          'Yes. Choose a jar, add it to the basket and complete the checkout form. WhatsApp is available for questions if you are not comfortable ordering directly.',
      },
      {
        question: 'Which jar size is best for first-time buyers?',
        answer:
          'The 220g jar is a good trial size. If your family already uses it often, 340g or 450g can be better value.',
      },
    ],
  },
  {
    slug: 'natural-peanut-butter',
    label: 'Natural options',
    title: 'Natural Peanut Butter',
    eyebrow: 'Simple daily spreads',
    metaTitle: 'Natural Peanut Butter Sri Lanka | Kurkees Local Spreads',
    metaDescription:
      'Shop Kurkees natural-style peanut spreads in Sri Lanka, including smooth, crunchy, sugar-free and unsalted options.',
    h1: 'Natural Peanut Butter for Sri Lankan Homes',
    intro:
      'Kurkees is made for everyday Sri Lankan meals, from bread and roti to oats, smoothies and fruit. Choose the flavour that fits your family and ingredient preference.',
    primaryKeyword: 'natural peanut butter',
    secondaryKeywords: ['pure peanut butter', 'real peanut butter', 'healthy peanut butter', 'peanut butter spread'],
    productSlugs: ['unsalted-sugar-free-smooth', 'salted-sugar-free-smooth', 'sugar-salted-smooth', 'sugar-salted-crunchy'],
    bestFor: ['Everyday breakfast', 'School snacks', 'Home smoothies', 'Simple ingredients'],
    buyingGuide: [
      'Pick unsalted sugar-free smooth if you want roasted peanuts only with no added sugar and no added salt.',
      'Pick salted sugar-free smooth or crunchy if you want no added sugar but still prefer a light salted taste.',
      'Pick classic smooth or crunchy if your family prefers a familiar sweet-salty taste.',
    ],
    faqs: [
      {
        question: 'What does natural mean for Kurkees?',
        answer:
          'It means peanut-focused products with clear ingredients. Each product page lists exactly what is inside the jar.',
      },
      {
        question: 'Is oil separation normal?',
        answer:
          'Yes. Peanut oil can naturally rise to the top. Stir well before use and refrigerate if you prefer a thicker texture.',
      },
      {
        question: 'Which Kurkees jar has the simplest ingredient list?',
        answer:
          'Unsalted Sugar-Free Smooth is made with roasted peanuts only.',
      },
    ],
  },
  {
    slug: 'smooth-peanut-butter',
    label: 'Smooth texture',
    title: 'Smooth Peanut Butter',
    eyebrow: 'Creamy texture',
    metaTitle: 'Smooth Peanut Butter Sri Lanka | Creamy Kurkees Jars',
    metaDescription:
      'Shop smooth Kurkees jars in Sri Lanka for bread, roti, oats, smoothies and easy everyday spreading.',
    h1: 'Smooth Peanut Butter in Sri Lanka',
    intro:
      'Smooth texture is easiest for spreading and blending. It works well for bread, roti, oats, smoothies, milkshakes and simple family snacks.',
    primaryKeyword: 'smooth peanut butter',
    secondaryKeywords: ['creamy peanut butter', 'creamy peanut butter price', 'peanut butter spread'],
    productSlugs: ['sugar-salted-smooth', 'salted-sugar-free-smooth', 'unsalted-sugar-free-smooth'],
    bestFor: ['Bread and toast', 'Roti and pancakes', 'Oats', 'Smoothies'],
    buyingGuide: [
      'Choose classic smooth when you want a familiar sweet-salty taste for breakfast and snacks.',
      'Choose salted sugar-free smooth when you want no added sugar but still prefer a savoury taste.',
      'Choose unsalted sugar-free smooth when you want roasted peanuts only.',
    ],
    faqs: [
      {
        question: 'Is smooth texture better for smoothies?',
        answer:
          'Yes. It blends more easily into banana smoothies, milkshakes and oats than crunchy texture.',
      },
      {
        question: 'Do you have a sugar-free smooth option?',
        answer:
          'Yes. Kurkees has salted sugar-free smooth and unsalted sugar-free smooth options.',
      },
      {
        question: 'Which smooth jar is best for kids snacks?',
        answer:
          'Classic smooth is easy to spread for everyday snacks. For very simple ingredients, choose the unsalted sugar-free smooth jar and follow age/allergy safety guidance.',
      },
    ],
  },
  {
    slug: 'crunchy-peanut-butter',
    label: 'Crunchy texture',
    title: 'Crunchy Peanut Butter',
    eyebrow: 'Roasted peanut pieces',
    metaTitle: 'Crunchy Peanut Butter Sri Lanka | Kurkees Crunchy Jars',
    metaDescription:
      'Shop crunchy Kurkees jars in Sri Lanka with roasted peanut pieces for sandwiches, oats and snacks.',
    h1: 'Crunchy Peanut Butter with Roasted Peanut Pieces',
    intro:
      'Crunchy texture is for customers who enjoy extra roasted peanut pieces and stronger bite. It is a good choice for sandwiches, snack bowls, oats and desserts.',
    primaryKeyword: 'crunchy peanut butter',
    secondaryKeywords: ['peanut butter crunch', 'crunchy peanut butter price', 'extra crunchy peanut butter'],
    productSlugs: ['sugar-salted-crunchy', 'salted-sugar-free-crunchy'],
    bestFor: ['Crunch lovers', 'Sandwiches', 'Snack bowls', 'Dessert toppings'],
    buyingGuide: [
      'Choose classic crunchy when you want the familiar sweet-salty taste with roasted peanut pieces.',
      'Choose salted sugar-free crunchy when you want texture without added sugar.',
      'Use crunchy texture when bite matters more than smooth spreading.',
    ],
    faqs: [
      {
        question: 'What is the difference between smooth and crunchy?',
        answer:
          'Crunchy jars include roasted peanut pieces, giving more bite and texture compared with smooth jars.',
      },
      {
        question: 'Can I use crunchy texture in oats?',
        answer:
          'Yes. It gives oats and snack bowls a stronger roasted peanut texture. For smoothies, smooth texture usually blends better.',
      },
      {
        question: 'Do you have a sugar-free crunchy option?',
        answer:
          'Yes. Kurkees Salted Sugar-Free Crunchy has roasted peanut pieces without added sugar.',
      },
    ],
  },
  {
    slug: 'sugar-free-peanut-butter',
    label: 'No added sugar',
    title: 'Sugar-Free Peanut Butter',
    eyebrow: 'No added sugar options',
    metaTitle: 'Sugar-Free Peanut Butter Sri Lanka | No Sugar Kurkees Jars',
    metaDescription:
      'Compare Kurkees no added sugar jars in Sri Lanka, including salted, unsalted, smooth and crunchy choices.',
    h1: 'Sugar-Free Peanut Butter Options',
    intro:
      'These jars are for customers who want peanut flavour without added sugar. Choose salted, unsalted, smooth or crunchy depending on your taste and meal use.',
    primaryKeyword: 'sugar free peanut butter',
    secondaryKeywords: ['no sugar peanut butter', 'no sugar no salt peanut butter', 'unsweetened peanut butter', 'peanut butter without sugar'],
    productSlugs: ['salted-sugar-free-smooth', 'salted-sugar-free-crunchy', 'unsalted-sugar-free-smooth'],
    bestFor: ['No added sugar preference', 'Gym meals', 'Oats', 'Simple snacks'],
    buyingGuide: [
      'Choose salted sugar-free smooth if you want no added sugar and a smooth texture with light salt.',
      'Choose salted sugar-free crunchy if you want no added sugar and roasted peanut pieces.',
      'Choose unsalted sugar-free smooth if you want no added sugar and no added salt.',
    ],
    faqs: [
      {
        question: 'Which Kurkees jar has no sugar and no salt?',
        answer:
          'Unsalted Sugar-Free Smooth is made with roasted peanuts only, with no added sugar and no added salt.',
      },
      {
        question: 'Is sugar-free the same as unsalted?',
        answer:
          'No. Some sugar-free jars may still contain salt. Check each product ingredient list before ordering.',
      },
      {
        question: 'Can I use these jars in smoothies?',
        answer:
          'Yes. Smooth sugar-free options work well with banana, milk, oats and other smoothie ingredients.',
      },
    ],
  },
  {
    slug: 'chocolate-peanut-butter',
    label: 'Chocolate spread',
    title: 'Chocolate Peanut Butter',
    eyebrow: 'Chocofeda',
    metaTitle: 'Chocolate Peanut Butter Sri Lanka | Chocofeda Peanut Spread',
    metaDescription:
      'Shop Chocofeda in Sri Lanka, a smooth chocolate peanut spread for bread, roti, pancakes, crepes and fruit.',
    h1: 'Chocolate Peanut Spread for Sweet Snacks',
    intro:
      'Chocofeda is the Kurkees chocolate peanut spread for customers who want a sweeter snack with peanut flavour. It is smooth, spreadable and easy to use with Sri Lankan breakfast and snack foods.',
    primaryKeyword: 'chocolate peanut butter',
    secondaryKeywords: ['chocolate peanut spread', 'peanut butter and chocolate', 'chocolate peanut butter price'],
    productSlugs: ['chocofeda-chocolate-peanut'],
    bestFor: ['Kids snacks', 'Roti and pancakes', 'Crepes', 'Fruit dip'],
    buyingGuide: [
      'Choose Chocofeda when your family wants a sweeter chocolate peanut flavour instead of a classic spread.',
      'Use it on bread, roti, paratha, pancakes, crepes or fruit for quick snacks.',
      'Check the product ingredient list before ordering if you are avoiding added sugar.',
    ],
    faqs: [
      {
        question: 'Is Chocofeda the same as the classic jars?',
        answer:
          'No. Chocofeda is a chocolate peanut spread with a sweeter flavour compared with classic Kurkees jars.',
      },
      {
        question: 'How can I use Chocofeda?',
        answer:
          'Spread it on bread, roti, paratha, pancakes or crepes, or use it as a dip for banana and other simple snacks.',
      },
      {
        question: 'Does Chocofeda contain peanuts?',
        answer:
          'Yes. Chocofeda contains peanuts and is not suitable for people with peanut allergy.',
      },
    ],
  },
  {
    slug: 'protein-peanut-butter',
    label: 'Fitness meals',
    title: 'Protein Peanut Butter',
    eyebrow: 'For oats, shakes and snacks',
    metaTitle: 'Protein Peanut Butter Sri Lanka | Kurkees for Gym Meals',
    metaDescription:
      'Compare Kurkees jars for gym meals, oats, smoothies and calorie-dense snacks in Sri Lanka.',
    h1: 'Protein Peanut Butter for Gym Meals and Snacks',
    intro:
      'Peanut spreads are calorie-dense and contain plant-based protein, making them useful in oats, smoothies, sandwiches and snack bowls. Kurkees gives fitness-focused customers several smooth, crunchy and sugar-free choices.',
    primaryKeyword: 'protein peanut butter',
    secondaryKeywords: ['peanut butter protein', 'peanut butter for gym', 'fitness peanut butter', 'peanut butter for weight gain'],
    productSlugs: ['salted-sugar-free-smooth', 'salted-sugar-free-crunchy', 'unsalted-sugar-free-smooth', 'sugar-salted-smooth'],
    bestFor: ['Gym meal plans', 'Oats', 'Smoothies', 'Calorie-dense snacks'],
    buyingGuide: [
      'Choose smooth texture for shakes and smoothies because it blends easily.',
      'Choose crunchy texture when you want bite in oats, snack bowls or sandwiches.',
      'Choose sugar-free or unsalted sugar-free options if you want to control added sugar or salt in your own meal plan.',
    ],
    faqs: [
      {
        question: 'Is this useful for gym meal plans?',
        answer:
          'It can be useful because it is calorie-dense and contains plant-based protein. It should be used as part of your total diet, not as a magic result product.',
      },
      {
        question: 'Which texture is best for smoothies?',
        answer:
          'Smooth texture usually blends better into smoothies than crunchy texture.',
      },
      {
        question: 'Can this help with weight gain?',
        answer:
          'It can help increase calories when added to meals like oats, smoothies and sandwiches. Weight gain depends on your total daily calorie intake.',
      },
    ],
  },
]

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug)
}

export function getCollectionProducts(collection: CollectionPage): Product[] {
  return collection.productSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product))
}

export const featuredCollectionLinks = collections.map((collection) => ({
  href: `/collections/${collection.slug}`,
  label: collection.label,
  keyword: collection.primaryKeyword,
}))
