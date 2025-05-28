import React, { useEffect, useState, useContext } from 'react';
import Product from '../product/Product';
import { userLoginContext } from '../../contexts/UserLoginContext';

function Products() {
  const [products, setProducts] = useState([]);
  const { token } = useContext(userLoginContext);

  async function getProducts() {
    try {
      const response = await fetch('https://e-commerce-app-one-smoky.vercel.app/product-api/products', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const productsData = await response.json();
      setProducts(productsData.payload);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5">
        {products.map((productObj, index) => (
          <div className="col" key={`${productObj.id}-${index}`}>
            <Product productObj={productObj} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
