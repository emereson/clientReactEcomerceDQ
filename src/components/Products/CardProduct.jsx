import React, { useState, useEffect } from 'react';
import FormatPrice from '../../hooks/FormatPrice';
import './productsStyle/cardProduct.css';
import OptionsProduct from './OptionsProduct';
import { useDispatch } from 'react-redux';
import { setCart } from '../../store/Slices/Cart.slice';

const CardProduct = ({ product, selectCategory, filterTextProduct }) => {
  const [productOptions, setProductOptions] = useState([]);
  const [openOption, setopenOption] = useState(false);
  const [selectPrice, setSelectPrice] = useState(null);
  const [selectOption, setselectOption] = useState(null);
  const [selectExta, setselectExtra] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const configureProductOptions = () => {
      const options = product.productOptions.map((option) => option);
      setProductOptions(options);

      const defaultOption = options.find(
        (option) => option.name.toLowerCase() === 'mediana'
      );

      setselectOption(defaultOption || options[0]);
      setSelectPrice(defaultOption || options[0]);
    };

    configureProductOptions();
  }, [product]);

  const productLowerCaseName = product.name.toLowerCase();
  const filterTextLower = filterTextProduct.toLowerCase();

  const isTextMatch =
    filterTextLower.length === 0 ||
    productLowerCaseName.includes(filterTextLower) ||
    product.description.toLowerCase().includes(filterTextLower);

  const isCategoryMatch =
    selectCategory === 'Todas' ||
    product.categoryProductId === selectCategory.id;

  const shouldShowProduct = isCategoryMatch && isTextMatch;

  const validFilterProduct = shouldShowProduct
    ? ''
    : 'cardProduct__containerFilter';

  const handleAddToCart = () => {
    const cartItem = {
      product: product,
      selectExtra: selectExta,
      selectOption: selectOption,
      counter: 1,
    };

    dispatch(setCart([cartItem]));
    setselectExtra([]);
  };

  return (
    <div className={`cardProduct__container ${validFilterProduct}`}>
      <article className="cardProduct__articleOne">
        <img src={product.productImg} alt="" />
        <div>
          <h3>{product.name}</h3>
          <small>{product.description}</small>
          <p>Size: {selectPrice?.name?.charAt(0).toUpperCase()}</p>
        </div>
      </article>
      <article className="cardProduct__articleTwo">
        <ul>
          <li
            className="cardProduct__articleTwo__options"
            onClick={() => setopenOption(true)}
          >
            Opciones:
          </li>
          <li className="cardProduct__articleTwo__price">
            S/{selectPrice ? <FormatPrice price={selectPrice.price} /> : '0.00'}
          </li>
          <li
            className=" cardProduct__articleTwo__addCart"
            onClick={handleAddToCart}
          >
            Agregar
          </li>
        </ul>
      </article>
      <OptionsProduct
        productOptions={productOptions}
        openOption={openOption}
        setopenOption={setopenOption}
        product={product}
        setselectOption={setselectOption}
        selectOption={selectOption}
        setselectExtra={setselectExtra}
        selectExta={selectExta}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default CardProduct;
