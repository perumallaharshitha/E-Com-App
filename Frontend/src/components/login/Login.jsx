import "./Login.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { userLoginContext } from "../../contexts/UserLoginContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  let { loginUser, userLoginStatus ,err} = useContext(userLoginContext);
  //const [userLoginErr, setUserLoginErr] = useState('')
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //on user submit
  function onUserLogin(userCred) {
    loginUser(userCred);
    console.log(userLoginStatus);
  }

  useEffect(() => {
    if (userLoginStatus === true) {
      //save token in session storage


      navigate("/user-profile");
    }
  }, [userLoginStatus]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center">User Login</h2>

        {err.length !== 0 && <p className="text-danger text-center">{err}</p>}

        <form className="login-form" onSubmit={handleSubmit(onUserLogin)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <p className="text-danger">*Username is required</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger">*Password is required</p>
            )}
          </div>

          <button className="btn btn-primary btn-block" type="submit">
            LOGIN
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;