import { Routes, Route } from 'react-router-dom'
import ShopLayout from './layouts/ShopLayout.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Product from './pages/Product.jsx'
import CartPage from './pages/CartPage.jsx'
import Checkout from './pages/Checkout.jsx'
import SignIn from './pages/SignIn.jsx'
import Profile from './pages/Profile.jsx'
import Orders from './pages/Orders.jsx'
import OrderDetails from './pages/OrderDetails.jsx'
import Addresses from './pages/Addresses.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Help from './pages/Help.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Returns from './pages/Returns.jsx'
import Shipping from './pages/Shipping.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Deals from './pages/Deals.jsx'
import NotFound from './pages/NotFound.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import AdminDashboard from './admin/Dashboard.jsx'
import AdminProducts from './admin/Products.jsx'
import AdminOrders from './admin/Orders.jsx'
import AdminUsers from './admin/Users.jsx'
import AdminInventory from './admin/Inventory.jsx'
import AdminReports from './admin/Reports.jsx'
import AdminSettings from './admin/Settings.jsx'
import AdminMedia from './admin/Media.jsx'
import { CartProvider } from './contexts/cart-store.js'

export default function App(){
  return (
    <CartProvider>
      <Routes>
        <Route element={<ShopLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="products" element={<Products/>}/>
          <Route path="products/:id" element={<Product/>}/>
          <Route path="cart" element={<CartPage/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="signin" element={<SignIn/>}/>
          <Route path="account" element={<RequireAuth><Profile/></RequireAuth>}/>
          <Route path="orders" element={<RequireAuth><Orders/></RequireAuth>}/>
          <Route path="orders/:id" element={<RequireAuth><OrderDetails/></RequireAuth>}/>
          <Route path="addresses" element={<RequireAuth><Addresses/></RequireAuth>}/>
          <Route path="wishlist" element={<RequireAuth><Wishlist/></RequireAuth>}/>
          <Route path="help" element={<Help/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="returns" element={<Returns/>}/>
          <Route path="shipping" element={<Shipping/>}/>
          <Route path="privacy" element={<Privacy/>}/>
          <Route path="terms" element={<Terms/>}/>
          <Route path="deals" element={<Deals/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminDashboard/>}/>
          <Route path="products" element={<AdminProducts/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="users" element={<AdminUsers/>}/>
          <Route path="inventory" element={<AdminInventory/>}/>
          <Route path="reports" element={<AdminReports/>}/>
          <Route path="settings" element={<AdminSettings/>}/>
          <Route path="media" element={<AdminMedia/>}/>
        </Route>
      </Routes>
    </CartProvider>
  )
}
