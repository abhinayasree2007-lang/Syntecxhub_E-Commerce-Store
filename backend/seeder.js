import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('🧹 Clearing existing database collections...');
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('👤 Seeding users...');
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const customerPassword = await bcrypt.hash('customer123', salt);

    const users = await User.insertMany([
      {
        name: 'Syntecx Admin',
        email: 'admin@syntecxhub.com',
        password: adminPassword,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      },
      {
        name: 'Alex Johnson',
        email: 'customer@syntecxhub.com',
        password: customerPassword,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      },
    ]);

    const adminUser = users[0];
    const customerUser = users[1];

    console.log('📦 Seeding products...');
    const productsData = [
      {
        name: 'Syntecx Pro ANC Wireless Headphones',
        description: 'Immerse yourself in crystal-clear audio with custom 40mm dynamic drivers, hybrid active noise cancellation, transparency mode, and up to 45 hours of ultra-long battery life with fast USB-C charging.',
        price: 249.99,
        originalPrice: 299.99,
        category: 'Audio',
        brand: 'Syntecx Sound',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        countInStock: 25,
        rating: 4.8,
        numReviews: 42,
        isFeatured: true,
        badge: 'Bestseller',
        reviews: [
          {
            user: customerUser._id,
            name: customerUser.name,
            rating: 5,
            comment: 'Unbelievable soundstage and the noise cancellation blocks out everything on my flights!',
          },
        ],
      },
      {
        name: 'Apex Ultra Mechanical Gaming Keyboard',
        description: 'Engineered for gaming and typing excellence. Features hot-swappable tactile switches, aircraft-grade aluminum top frame, sound-dampening foam, per-key RGB backlighting, and braided USB-C detachable cable.',
        price: 129.99,
        originalPrice: 159.99,
        category: 'Computing',
        brand: 'Apex Tech',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
        countInStock: 18,
        rating: 4.9,
        numReviews: 38,
        isFeatured: true,
        badge: 'Hot Deal',
        reviews: [],
      },
      {
        name: 'Nova Smartwatch Titanium Edition',
        description: 'Sleek aerospace titanium chassis paired with a vivid 1.43-inch Always-On AMOLED screen. Continuous heart-rate monitoring, SpO2 sensor, sleep analysis, built-in GPS, and 12-day battery endurance.',
        price: 199.99,
        originalPrice: 249.99,
        category: 'Wearables',
        brand: 'Nova',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        countInStock: 14,
        rating: 4.7,
        numReviews: 29,
        isFeatured: true,
        badge: 'Popular',
        reviews: [],
      },
      {
        name: 'Lumina 32" 4K OLED Studio Monitor',
        description: 'A visual masterpiece with genuine 4K UHD resolution, 99% DCI-P3 color gamut, 0.1ms response time, 144Hz refresh rate, HDR1000 certified, and 90W USB-C single cable power delivery for MacBook and PCs.',
        price: 649.99,
        originalPrice: 799.99,
        category: 'Electronics',
        brand: 'Lumina Display',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
        countInStock: 8,
        rating: 4.9,
        numReviews: 19,
        isFeatured: true,
        badge: 'Staff Pick',
        reviews: [],
      },
      {
        name: 'SonicPulse Waterproof Bluetooth Speaker',
        description: 'Room-filling 360-degree spatial audio with dual passive radiators for thunderous bass. IPX7 waterproof rating, 24-hour battery life, and wireless PartyCast pairing with up to 100 speakers.',
        price: 79.99,
        originalPrice: 99.99,
        category: 'Audio',
        brand: 'Syntecx Sound',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
        countInStock: 30,
        rating: 4.6,
        numReviews: 54,
        isFeatured: false,
        badge: 'Trending',
        reviews: [],
      },
      {
        name: 'AeroGlide Ergonomic Wireless Mouse',
        description: 'Designed to relieve wrist strain during long sessions. Precision 26,000 DPI optical sensor, silent tactile switches, tri-mode connectivity (2.4GHz, Bluetooth 5.2, USB-C), and 90 hours on a single charge.',
        price: 69.99,
        originalPrice: 89.99,
        category: 'Computing',
        brand: 'Apex Tech',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
        countInStock: 22,
        rating: 4.7,
        numReviews: 31,
        isFeatured: false,
        badge: '',
        reviews: [],
      },
      {
        name: 'Aura Smart Ambient Light Bar Duo',
        description: 'Transform your desk and entertainment setup. Dual reactive RGBIC light bars with music beat syncing, voice control compatibility, and over 16 million customizable colors via mobile app.',
        price: 54.99,
        originalPrice: 69.99,
        category: 'Smart Home',
        brand: 'Aura Home',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
        countInStock: 19,
        rating: 4.5,
        numReviews: 17,
        isFeatured: false,
        badge: 'New',
        reviews: [],
      },
      {
        name: 'HyperCharge 100W GaN Fast Charger',
        description: 'Ultra-compact Gallium Nitride (GaN) fast charger with 3x USB-C and 1x USB-A ports. Intelligently charges laptops, tablets, and phones simultaneously at peak safe speeds with multi-protect safety chip.',
        price: 44.99,
        originalPrice: 59.99,
        category: 'Accessories',
        brand: 'Syntecx Power',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
        countInStock: 45,
        rating: 4.9,
        numReviews: 63,
        isFeatured: false,
        badge: 'Essential',
        reviews: [],
      },
      {
        name: 'VisionPro 4K Ultra HD Streaming Webcam',
        description: 'Crystal-clear 4K 60fps video with dual omnidirectional stereo microphones, motorized physical privacy shutter, AI auto-framing, and brilliant low-light compensation for meetings and streaming.',
        price: 119.99,
        originalPrice: 149.99,
        category: 'Computing',
        brand: 'Apex Tech',
        image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80',
        countInStock: 12,
        rating: 4.7,
        numReviews: 24,
        isFeatured: false,
        badge: '',
        reviews: [],
      },
      {
        name: 'EcoLeather Minimalist Tech Folio Sleeve',
        description: 'Handcrafted premium microfiber vegan leather sleeve with magnetic spill-proof flap, soft scratch-resistant velvet interior, and dedicated slots for stylus, cables, and adapters. Fits up to 14-inch laptops.',
        price: 36.99,
        originalPrice: 48.00,
        category: 'Accessories',
        brand: 'Syntecx Gear',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        countInStock: 35,
        rating: 4.6,
        numReviews: 15,
        isFeatured: false,
        badge: '',
        reviews: [],
      },
      {
        name: 'Pulse Pro True Wireless Sport Earbuds',
        description: 'Ergonomic secure ear-hooks designed for high intensity workouts. IPX8 sweatproof rating, powerful deep-bass acoustic tuning, and compact wireless charging case with digital battery percentage display.',
        price: 89.99,
        originalPrice: 119.99,
        category: 'Audio',
        brand: 'Syntecx Sound',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
        countInStock: 28,
        rating: 4.8,
        numReviews: 49,
        isFeatured: true,
        badge: 'Top Rated',
        reviews: [],
      },
      {
        name: 'PureBreeze Smart HEPA Air Purifier',
        description: 'True 3-stage H13 medical-grade HEPA filtration capturing 99.97% of airborne particles, smoke, and allergens. Whisper-quiet 22dB sleep mode, ambient air quality laser sensor, and companion mobile controls.',
        price: 179.99,
        originalPrice: 219.99,
        category: 'Smart Home',
        brand: 'Aura Home',
        image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
        countInStock: 15,
        rating: 4.8,
        numReviews: 33,
        isFeatured: false,
        badge: 'Eco Smart',
        reviews: [],
      },
    ];

    const createdProducts = await Product.insertMany(productsData);

    console.log('🛍️ Seeding initial demo order...');
    await Order.create({
      user: customerUser._id,
      orderItems: [
        {
          name: createdProducts[0].name,
          qty: 1,
          image: createdProducts[0].image,
          price: createdProducts[0].price,
          product: createdProducts[0]._id,
        },
        {
          name: createdProducts[2].name,
          qty: 1,
          image: createdProducts[2].image,
          price: createdProducts[2].price,
          product: createdProducts[2]._id,
        },
      ],
      shippingAddress: {
        fullName: 'Alex Johnson',
        address: '742 Evergreen Terrace',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'United States',
        phone: '+1 (555) 234-5678',
      },
      paymentMethod: 'Credit Card (Simulated)',
      itemsPrice: 449.98,
      shippingPrice: 0.0,
      taxPrice: 36.0,
      totalPrice: 485.98,
      isPaid: true,
      paidAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      orderStatus: 'Shipped',
      paymentResult: {
        id: 'SIM_DEMO_998124',
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        email_address: customerUser.email,
      },
    });

    console.log('✅ Database seeded successfully!');
    console.log('----------------------------------------------------');
    console.log('👑 Admin Account:');
    console.log('   Email:    admin@syntecxhub.com');
    console.log('   Password: admin123');
    console.log('👤 Customer Account:');
    console.log('   Email:    customer@syntecxhub.com');
    console.log('   Password: customer123');
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeder Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
