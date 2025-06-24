# E-commerce Store

A modern, responsive e-commerce application built with React and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Product Management**: Browse, search, and manage products
- **Shopping Cart**: Add/remove items with real-time updates
- **Wishlist**: Save favorite products for later
- **User Authentication**: Firebase authentication with Google Sign-in
- **Search Functionality**: Real-time product search with suggestions
- **Flash Sales**: Countdown timer for special offers
- **Product Categories**: Browse products by category
- **Checkout Process**: Secure checkout flow
- **Account Management**: User profile and order management

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 3.4
- **Authentication**: Firebase Auth
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Icons**: Font Awesome
- **Sliders**: Swiper.js
- **HTTP Client**: Axios
- **Notifications**: React Toastify

## 🎨 Design System

### Colors
- **Primary**: Blue (#0ea5e9)
- **Secondary**: Pink (#ec4899)
- **Accent**: Orange (#f97316)
- **Gray Scale**: Full gray palette for text and backgrounds

### Components
- **Buttons**: Primary, secondary, and accent variants
- **Cards**: Product cards with hover effects
- **Forms**: Styled inputs with focus states
- **Navigation**: Responsive header with mobile menu
- **Modals**: Dropdown menus and overlays

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── Components/          # Reusable components
│   ├── Navigation/     # Header, Search, User components
│   ├── footer/         # Footer component
│   ├── protect/        # Route protection components
│   └── scrollTop/      # Scroll to top component
├── pages/              # Page components
│   ├── home/           # Home page with products
│   ├── shop/           # Shop page
│   ├── cart/           # Shopping cart
│   ├── wishlist/       # Wishlist page
│   ├── checkout/       # Checkout process
│   ├── auth/           # Login/Signup pages
│   └── ...
├── Feautres/           # Context providers and reducers
├── firebase/           # Firebase configuration
└── assets/             # Static assets
```

## 🎯 Key Features

### Modern Navigation
- Sticky header with search functionality
- Mobile-responsive hamburger menu
- User dropdown with account options
- Cart and wishlist counters

### Product Display
- Grid layout with responsive breakpoints
- Product cards with hover effects
- Quick add to cart functionality
- Wishlist integration

### Search & Filter
- Real-time search with product suggestions
- Category filtering
- Price range filtering
- Sort options

### User Experience
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications
- Responsive images and layouts

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Custom color palette
- Custom animations
- Responsive utilities
- Component classes

### Firebase
Configure your Firebase project in `src/firebase/firebase.js`:
- Authentication
- Firestore (if needed)
- Storage (if needed)

## 📝 Recent Updates

- ✅ Migrated from SCSS to Tailwind CSS
- ✅ Improved responsive design
- ✅ Enhanced UI components
- ✅ Better mobile navigation
- ✅ Modern card designs
- ✅ Improved search functionality
- ✅ Better accessibility
- ✅ Performance optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
