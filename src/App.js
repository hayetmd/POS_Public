import React, { useState } from 'react';
import { ShoppingCart, Package, LogIn, User, Lock, AlertCircle } from 'lucide-react';

// Demo users stored in memory (replace with backend auth later)
const DEMO_USERS = [
  { id: 1, username: 'cashier', password: 'cash123', role: 'cashier', name: 'John Doe' },
  { id: 2, username: 'manager', password: 'mgr123', role: 'manager', name: 'Jane Smith' },
  { id: 3, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' }
];

// Demo products for POS
const DEMO_PRODUCTS = [
  { id: 1, name: 'Coffee', price: 3.50, category: 'Beverages', stock: 50 },
  { id: 2, name: 'Sandwich', price: 6.99, category: 'Food', stock: 30 },
  { id: 3, name: 'Water Bottle', price: 1.50, category: 'Beverages', stock: 100 },
  { id: 4, name: 'Salad', price: 8.99, category: 'Food', stock: 25 },
  { id: 5, name: 'Juice', price: 4.50, category: 'Beverages', stock: 40 },
  { id: 6, name: 'Chips', price: 2.99, category: 'Snacks', stock: 60 },
  { id: 7, name: 'Cookie', price: 1.99, category: 'Snacks', stock: 45 },
  { id: 8, name: 'Tea', price: 2.50, category: 'Beverages', stock: 55 },
];

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const user = DEMO_USERS.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        onLogin(user);
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart size={48} className="animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold mb-2">POS System</h1>
          <p className="text-blue-100">Point of Sale Management</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3 font-semibold">Demo Credentials:</p>
            <div className="space-y-2 text-xs">
              {DEMO_USERS.map(user => (
                <div key={user.id} className="bg-gray-50 rounded p-2 flex justify-between">
                  <span className="font-medium text-gray-700">{user.role}:</span>
                  <span className="text-gray-600">{user.username} / {user.password}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const POSInterface = ({ user, onLogout, products }) => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: monospace; padding: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 5px; }
            .total { font-weight: bold; font-size: 1.2em; }
            .line { border-top: 1px dashed #000; }
          </style>
        </head>
        <body>
          <h1>POS RECEIPT</h1>
          <p>Date: ${new Date().toLocaleString()}</p>
          <p>Cashier: ${user.name}</p>
          <div class="line"></div>
          <table>
            ${cart.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}x</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </table>
          <div class="line"></div>
          <table>
            <tr><td>Subtotal:</td><td>$${subtotal.toFixed(2)}</td></tr>
            <tr><td>Tax (10%):</td><td>$${tax.toFixed(2)}</td></tr>
            <tr class="total"><td>TOTAL:</td><td>$${total.toFixed(2)}</td></tr>
          </table>
          <div class="line"></div>
          <p style="text-align: center;">Thank you for your purchase!</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleCompleteSale = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    
    handlePrint();
    alert('Sale completed successfully!');
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-blue-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">POS System</h1>
              <p className="text-sm text-gray-500">Cashier: {user.name}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Products Grid */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-300"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🛒</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-400 mt-1">Stock: {product.stock}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="bg-white rounded-lg shadow p-4 h-fit">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ShoppingCart size={24} />
            Current Sale
          </h2>

          <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{item.name}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-blue-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCompleteSale}
            disabled={cart.length === 0}
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Sale & Print
          </button>
        </div>
      </div>
    </div>
  );
};

const ManagerDashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Package className="text-purple-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Manager Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome, {user.name}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <Package className="mx-auto mb-4 text-purple-600" size={64} />
          <h2 className="text-2xl font-bold mb-4">Product Management</h2>
          <p className="text-gray-600 mb-6">
            Manager dashboard coming in the next step!
          </p>
          <p className="text-sm text-gray-500">
            Features: Add/Edit/Delete Products, View Reports, Manage Users
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentUser.role === 'cashier') {
    return <POSInterface user={currentUser} onLogout={handleLogout} products={DEMO_PRODUCTS} />;
  }

  return <ManagerDashboard user={currentUser} onLogout={handleLogout} />;
}
