
import { Product, Category, Banner, Review, Color } from '@/types';

// Colors
export const colors: Color[] = [
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Red', code: '#FF0000' },
  { name: 'Blue', code: '#0000FF' },
  { name: 'Green', code: '#008000' },
  { name: 'Yellow', code: '#FFFF00' },
  { name: 'Purple', code: '#800080' },
  { name: 'Pink', code: '#FFC0CB' },
  { name: 'Orange', code: '#FFA500' },
  { name: 'Grey', code: '#808080' },
  { name: 'Brown', code: '#A52A2A' },
  { name: 'Navy', code: '#000080' },
  { name: 'Gold', code: '#FFD700' },
  { name: 'Silver', code: '#C0C0C0' },
];

// Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Formal Wear',
    description: 'Elegant formal wear for special occasions',
    imageUrl: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac',
    slug: 'formal-wear',
  },
  {
    id: '2',
    name: 'Casual Wear',
    description: 'Comfortable everyday clothing',
    imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa',
    slug: 'casual-wear',
  },
  {
    id: '3',
    name: 'Ethnic Wear',
    description: 'Traditional Indian ethnic clothing',
    imageUrl: 'https://images.unsplash.com/photo-1610189019365-a71a66d110f4',
    slug: 'ethnic-wear',
  },
  {
    id: '4',
    name: 'Western Wear',
    description: 'Modern western fashion styles',
    imageUrl: 'https://images.unsplash.com/photo-1485125639709-a60c3a500bf1',
    slug: 'western-wear',
  },
  {
    id: '5',
    name: 'Accessories',
    description: 'Fashion accessories to complete your look',
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a',
    slug: 'accessories',
  },
  {
    id: '6',
    name: 'Festival Wear',
    description: 'Special outfits for Indian festivals',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750c9eb3a6a',
    slug: 'festival-wear',
  },
  {
    id: '7',
    name: 'Wedding Collection',
    description: 'Complete wedding outfits and accessories',
    imageUrl: 'https://images.unsplash.com/photo-1594472436408-73d68c88faef',
    slug: 'wedding-collection',
  },
  {
    id: '8',
    name: 'Designer Wear',
    description: 'Premium designer fashion collections',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
    slug: 'designer-wear',
  },
];

// Banners
export const banners: Banner[] = [
  {
    id: '1',
    title: 'Wedding Season Collection',
    subtitle: 'Rent premium designer wear for your special day',
    imageUrl: 'https://images.unsplash.com/photo-1594472436408-73d68c88faef',
    linkTo: '/category/wedding-collection',
    active: true,
  },
  {
    id: '2',
    title: 'Festival Special',
    subtitle: 'Traditional ethnic wear for the festive season',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750c9eb3a6a',
    linkTo: '/category/festival-wear',
    active: true,
  },
  {
    id: '3',
    title: 'Designer Collection',
    subtitle: 'Exclusive designer pieces at affordable rental prices',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
    linkTo: '/category/designer-wear',
    active: true,
  },
];

// Sample Reviews
export const sampleReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: 'user1',
    userName: 'Priya Sharma',
    rating: 5,
    comment: 'Absolutely gorgeous lehenga! The quality was amazing and I received so many compliments.',
    createdAt: '2023-09-15T10:30:00Z',
  },
  {
    id: '2',
    productId: '1',
    userId: 'user2',
    userName: 'Raj Kumar',
    rating: 4,
    comment: 'Beautiful piece, delivery was on time. Fit was slightly bigger than expected.',
    createdAt: '2023-10-02T14:20:00Z',
  },
  {
    id: '3',
    productId: '2',
    userId: 'user3',
    userName: 'Ananya Patel',
    rating: 5,
    comment: 'Perfect suit for my business meeting. Will definitely rent again!',
    createdAt: '2023-08-22T09:15:00Z',
  },
];

// Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Red Embroidered Wedding Lehenga',
    description: 'Stunning red bridal lehenga with intricate gold embroidery. Perfect for wedding ceremonies and receptions. Includes matching blouse and dupatta.',
    images: [
      'https://images.unsplash.com/photo-1610189019365-a71a66d110f4',
      'https://images.unsplash.com/photo-1582012103542-3b4df0ea8742',
      'https://images.unsplash.com/photo-1610222588641-1ba9b999d640',
    ],
    price: 2500, // Daily rental in INR
    originalPrice: 45000, // Original price for comparison
    brand: 'Sabyasachi',
    category: 'Wedding Collection',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Red', code: '#FF0000' },
      { name: 'Maroon', code: '#800000' },
    ],
    tags: ['wedding', 'bridal', 'lehenga', 'designer'],
    inStock: true,
    rating: 4.8,
    reviewCount: 24,
    createdAt: '2023-08-10T12:00:00Z',
    featured: true,
    trending: true,
  },
  {
    id: '2',
    name: 'Navy Blue Formal Suit',
    description: 'Classic navy blue suit perfect for business meetings and formal events. Includes matching pants and a crisp white shirt.',
    images: [
      'https://images.unsplash.com/photo-1507680434567-5739c80be1ac',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35',
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0',
    ],
    price: 800,
    originalPrice: 12000,
    brand: 'Raymond',
    category: 'Formal Wear',
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Navy', code: '#000080' },
    ],
    tags: ['suit', 'formal', 'menswear', 'business'],
    inStock: true,
    rating: 4.5,
    reviewCount: 18,
    createdAt: '2023-07-20T10:30:00Z',
    featured: false,
    trending: true,
  },
  {
    id: '3',
    name: 'Green Silk Saree',
    description: 'Elegant green silk saree with golden border. Perfect for festive occasions and celebrations.',
    images: [
      'https://images.unsplash.com/photo-1603202662737-c9f5cc365c03',
      'https://images.unsplash.com/photo-1610222588641-1ba9b999d640',
      'https://images.unsplash.com/photo-1583391733956-3750c9eb3a6a',
    ],
    price: 500,
    originalPrice: 8000,
    brand: 'Kanjeevaram',
    category: 'Ethnic Wear',
    sizes: ['Free Size'],
    colors: [
      { name: 'Green', code: '#008000' },
      { name: 'Gold', code: '#FFD700' },
    ],
    tags: ['saree', 'silk', 'ethnic', 'traditional'],
    inStock: true,
    rating: 4.7,
    reviewCount: 32,
    createdAt: '2023-09-05T09:15:00Z',
    featured: true,
    trending: false,
  },
  {
    id: '4',
    name: 'Black Cocktail Dress',
    description: 'Sophisticated black cocktail dress with a modern silhouette. Perfect for evening parties and formal dinners.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5',
      'https://images.unsplash.com/photo-1562137794-4757b41206b7',
    ],
    price: 600,
    originalPrice: 9500,
    brand: 'Zara',
    category: 'Western Wear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', code: '#000000' },
    ],
    tags: ['dress', 'cocktail', 'party', 'evening'],
    inStock: true,
    rating: 4.3,
    reviewCount: 15,
    createdAt: '2023-08-15T14:45:00Z',
    featured: false,
    trending: true,
  },
  {
    id: '5',
    name: 'Gold Statement Necklace',
    description: 'Stunning gold statement necklace with intricate design. Perfect for completing your festive or wedding look.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e',
    ],
    price: 300,
    originalPrice: 5000,
    brand: 'Tanishq',
    category: 'Accessories',
    sizes: ['Free Size'],
    colors: [
      { name: 'Gold', code: '#FFD700' },
    ],
    tags: ['jewelry', 'necklace', 'wedding', 'accessory'],
    inStock: true,
    rating: 4.9,
    reviewCount: 28,
    createdAt: '2023-07-10T11:20:00Z',
    featured: true,
    trending: true,
  },
  {
    id: '6',
    name: 'Men\'s Kurta Pyjama Set',
    description: 'Comfortable and stylish kurta pyjama set for festive occasions and celebrations.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750c9eb3a6a',
      'https://images.unsplash.com/photo-1583395838114-3346a13a4438',
      'https://images.unsplash.com/photo-1583396026455-00fa891dc514',
    ],
    price: 400,
    originalPrice: 4500,
    brand: 'Manyavar',
    category: 'Ethnic Wear',
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Beige', code: '#F5F5DC' },
    ],
    tags: ['kurta', 'ethnic', 'traditional', 'festival'],
    inStock: true,
    rating: 4.4,
    reviewCount: 22,
    createdAt: '2023-09-20T13:10:00Z',
    featured: false,
    trending: false,
  },
  {
    id: '7',
    name: 'Designer Evening Gown',
    description: 'Elegant floor-length evening gown with intricate beadwork. Perfect for gala dinners and formal events.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae',
      'https://images.unsplash.com/photo-1572804013427-4d7ca7268217',
      'https://images.unsplash.com/photo-1551803091-e20673f15770',
    ],
    price: 1200,
    originalPrice: 25000,
    brand: 'Manish Malhotra',
    category: 'Designer Wear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Royal Blue', code: '#4169E1' },
      { name: 'Silver', code: '#C0C0C0' },
    ],
    tags: ['gown', 'evening', 'designer', 'formal'],
    inStock: true,
    rating: 4.8,
    reviewCount: 12,
    createdAt: '2023-08-25T15:30:00Z',
    featured: true,
    trending: true,
  },
  {
    id: '8',
    name: 'Velvet Sherwani',
    description: 'Royal velvet sherwani with intricate embroidery. Perfect for wedding ceremonies and special occasions.',
    images: [
      'https://images.unsplash.com/photo-1610041321327-b794c052db27',
      'https://images.unsplash.com/photo-1595304500693-7e4bbce205c0',
      'https://images.unsplash.com/photo-1605025207886-45046a9e0884',
    ],
    price: 1500,
    originalPrice: 30000,
    brand: 'Manyavar',
    category: 'Wedding Collection',
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Maroon', code: '#800000' },
      { name: 'Navy', code: '#000080' },
    ],
    tags: ['sherwani', 'wedding', 'groom', 'traditional'],
    inStock: true,
    rating: 4.7,
    reviewCount: 19,
    createdAt: '2023-07-15T09:45:00Z',
    featured: true,
    trending: false,
  },
  {
    id: '9',
    name: 'Designer Clutch Purse',
    description: 'Stylish designer clutch purse with embellishments. Perfect for parties and evening events.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d',
      'https://images.unsplash.com/photo-1575822345533-a50d345cef33',
    ],
    price: 250,
    originalPrice: 3000,
    brand: 'Lavie',
    category: 'Accessories',
    sizes: ['Free Size'],
    colors: [
      { name: 'Gold', code: '#FFD700' },
      { name: 'Silver', code: '#C0C0C0' },
      { name: 'Black', code: '#000000' },
    ],
    tags: ['purse', 'clutch', 'accessory', 'evening'],
    inStock: true,
    rating: 4.5,
    reviewCount: 24,
    createdAt: '2023-09-10T10:00:00Z',
    featured: false,
    trending: true,
  },
  {
    id: '10',
    name: 'Casual Denim Jacket',
    description: 'Stylish denim jacket perfect for casual outings and everyday wear.',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa',
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9',
      'https://images.unsplash.com/photo-1608063615781-e2ef8c73d114',
    ],
    price: 300,
    originalPrice: 3500,
    brand: 'Levi\'s',
    category: 'Casual Wear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blue', code: '#0000FF' },
      { name: 'Light Blue', code: '#ADD8E6' },
    ],
    tags: ['jacket', 'denim', 'casual', 'everyday'],
    inStock: true,
    rating: 4.2,
    reviewCount: 31,
    createdAt: '2023-08-05T12:15:00Z',
    featured: false,
    trending: false,
  },
  {
    id: '11',
    name: 'Brocade Anarkali Suit',
    description: 'Elegant brocade Anarkali suit with detailed embroidery. Perfect for festive occasions and celebrations.',
    images: [
      'https://images.unsplash.com/photo-1610189019365-a71a66d110f4',
      'https://images.unsplash.com/photo-1606902965551-dce093cda6e7',
      'https://images.unsplash.com/photo-1629186235045-d6c191050acd',
    ],
    price: 900,
    originalPrice: 15000,
    brand: 'Biba',
    category: 'Festival Wear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Teal', code: '#008080' },
      { name: 'Purple', code: '#800080' },
    ],
    tags: ['anarkali', 'suit', 'festival', 'ethnic'],
    inStock: true,
    rating: 4.6,
    reviewCount: 17,
    createdAt: '2023-09-15T14:30:00Z',
    featured: true,
    trending: true,
  },
  {
    id: '12',
    name: 'Designer Sunglasses',
    description: 'Premium designer sunglasses with UV protection. Perfect for completing your summer look.',
    images: [
      'https://images.unsplash.com/photo-1577803645773-f96470509666',
      'https://images.unsplash.com/photo-1625591339971-4c9a87a66871',
      'https://images.unsplash.com/photo-1587656196069-0518f5bc033d',
    ],
    price: 150,
    originalPrice: 4000,
    brand: 'Ray-Ban',
    category: 'Accessories',
    sizes: ['Free Size'],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Brown', code: '#A52A2A' },
    ],
    tags: ['sunglasses', 'accessory', 'summer', 'designer'],
    inStock: true,
    rating: 4.3,
    reviewCount: 29,
    createdAt: '2023-07-25T11:45:00Z',
    featured: false,
    trending: true,
  },
];

// Generate more products dynamically if needed
export const generateProducts = (count: number): Product[] => {
  const extraProducts: Product[] = [];
  
  for (let i = products.length + 1; i <= products.length + count; i++) {
    // Randomly select attributes from existing products
    const randomIndex = Math.floor(Math.random() * products.length);
    const baseProduct = products[randomIndex];
    
    extraProducts.push({
      ...baseProduct,
      id: `${i}`,
      name: `${baseProduct.name} - Variant ${i}`,
      price: Math.floor(baseProduct.price * (0.8 + Math.random() * 0.4)),
      originalPrice: Math.floor((baseProduct.originalPrice || baseProduct.price * 10) * (0.8 + Math.random() * 0.4)),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      featured: Math.random() > 0.7,
      trending: Math.random() > 0.7,
    });
  }
  
  return [...products, ...extraProducts];
};
