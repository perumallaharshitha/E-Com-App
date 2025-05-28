import { useState, useEffect, useContext } from "react";
import { userLoginContext } from "../../contexts/UserLoginContext";
import { MdDeleteOutline } from "react-icons/md";
import "./Cart.css";

function Cart() {
  const { currentUser, token } = useContext(userLoginContext);
  const [cart, setCart] = useState([]);

  // Get the latest user cart
  async function getUserCart() {
    if (currentUser) {
      try {
        const res = await fetch(
          `https://e-commerce-app-one-smoky.vercel.app/user-api/users/${currentUser.username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setCart(data.payload.products || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    }
  }

  // Delete product from cart
  async function deleteProduct(productId) {
    try {
      // Fetch user details
      const res = await fetch(
        `https://e-commerce-app-one-smoky.vercel.app/user-api/users/${currentUser.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = await res.json();
      const updatedCart = userData.payload.products.filter(
        (item) => item.id !== productId
      );

      // Update user with new cart
      await fetch("https://e-commerce-app-one-smoky.vercel.app/user-api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...userData.payload,
          products: updatedCart,
        }),
      });

      getUserCart(); // Refresh cart
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }

  useEffect(() => {
    getUserCart();
  }, [currentUser]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id || index}>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(item.id)}
                  >
                    <MdDeleteOutline /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;
