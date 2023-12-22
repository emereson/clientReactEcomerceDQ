import { useSelector, useDispatch } from 'react-redux';
import './pagesStyle/cart.css';
import { decrementCounter, incrementCounter } from '../store/Slices/Cart.slice';

const Cart = ({ openCart }) => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Función para calcular el precio total de un producto en el carrito
  const calculateTotalPrice = (product) => {
    const optionPrice = product.selectOption.price || 0;
    const extraTotalPrice = product.selectExtra.reduce(
      (total, extra) => total + (extra.price || 0),
      0
    );
    return (optionPrice + extraTotalPrice) * product.counter;
  };

  console.log(cartData);
  return (
    <div className={`cart__container  ${openCart ? '' : 'closeCart'}`}>
      <section>
        {cartData?.map((dataProduct, index) => (
          <article key={index}>
            <img src={dataProduct.product.productImg} alt="" />
            <div>
              <h3>{dataProduct.product.name}</h3>
              <ul>
                <li>
                  {dataProduct.selectOption.name}:
                  {dataProduct.selectOption.size}
                </li>
                {dataProduct.selectExtra.map((extra, index) => (
                  <li key={index}>{extra.name}</li>
                ))}
              </ul>
              <div>
                <p onClick={() => dispatch(decrementCounter({ index }))}>-</p>
                <span>{dataProduct.counter}</span>
                <p onClick={() => dispatch(incrementCounter({ index }))}>+</p>
              </div>
            </div>
            <div>
              <p>s/{calculateTotalPrice(dataProduct)}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Cart;
