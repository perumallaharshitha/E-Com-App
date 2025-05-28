import { userLoginContext } from "./UserLoginContext";
import { useState } from "react";

function UserLoginStore({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [err, setErr] = useState("");

  // User login
  async function loginUser(userCred) {
    try {
      const res = await fetch("https://e-commerce-app-one-smoky.vercel.app/user-api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(userCred),
      });

      const result = await res.json();

      if (result.message === 'login success') {
        setCurrentUser(result.user);
        setUserLoginStatus(true);
        setErr('');
        // Save token in session storage
        sessionStorage.setItem('token', result.token);
      } else {
        setErr(result.message);
        setCurrentUser({});
        setUserLoginStatus(false);
      }
    } catch (error) {
      setErr(error.message);
    }
  }

  // User logout
  function logoutUser() {
    setCurrentUser({});
    setUserLoginStatus(false);
    setErr('');
    sessionStorage.removeItem('token');
  }

  return (
    <userLoginContext.Provider
      value={{
        loginUser,
        logoutUser,
        userLoginStatus,
        err,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </userLoginContext.Provider>
  );
}

export default UserLoginStore;
