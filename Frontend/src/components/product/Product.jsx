import './Product.css';
import { useContext } from 'react';
import { userLoginContext } from '../../contexts/UserLoginContext';
import { useNavigate } from 'react-router-dom';

function Product({ productObj }) {
  const { currentUser, token } = useContext(userLoginContext);
  const navigate = useNavigate();

  async function addProductToCart(productObj) {
    try {
      const username = currentUser.username;

      const res = await fetch(`https://e-commerce-app-one-smoky.vercel.app/user-api/add-to-cart/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productObj)
      });

      const result = await res.json();
      console.log("Cart Add Result:", result);

      if (result.payload?.modifiedCount === 1) {
        navigate('/user-profile/cart');
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred while adding to cart.");
    }
  }

  return (
    <div className='card text-center h-100 bg-light'>
      <div className="card-body d-flex flex-column justify-content-between">
        <img src={productObj.thumbnail} alt={productObj.title} className="card-img-top" />
        <p className="fs-4 text-secondary">{productObj.title}</p>
        <p className="fs-6 text-danger">{productObj.brand}</p>
        <p className="fs-3 text-warning">${productObj.price}</p>
        <button className="btn btn-success" onClick={() => addProductToCart(productObj)}>Add to cart</button>
      </div>
    </div>
  );
}

export default Product;
