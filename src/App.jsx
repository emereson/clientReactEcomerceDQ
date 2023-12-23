import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './utils/ProtecteRoutes';
import Login from './pages/Login';
import Header from './pages/Header';
import './icomoon/css/iconfont.css';
import './icomoon/css/iconfont.min.css';
import Home from './pages/Home';
import Footer from './pages/Footer';
import Products from './pages/Products';
import FinalizePurchase from './pages/FinalizePurchase';
import Register from './pages/Register';
function App() {
  return (
    <div className="app_container">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seccion/:id" element={<Products />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/finalizar-compra" element={<FinalizePurchase />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
