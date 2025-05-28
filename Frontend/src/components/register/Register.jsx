import "./Register.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function onUserRegister(newUser) {
    try {
      const res = await fetch("https://e-commerce-app-one-smoky.vercel.app/user-api/user", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (data.message === "user created") {
        navigate("/login");
      } else {
        setErr(data.message);
      }
    } catch (err) {
      console.log("err is ", err);
      setErr(err.message);
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-heading text-center">Register Yourself</h2>

        {err.length !== 0 && <p className="fs-2 text-danger text-center">{err}</p>}

        <form
          className="register-form mx-auto mt-4"
          onSubmit={handleSubmit(onUserRegister)}
        >
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <p className="text-danger lead">*Username is required</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger lead">*Password is required</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-danger lead">*Email is required</p>
            )}
          </div>

          {/* Mobile No */}
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile No</label>
            <input
              type="number"
              id="mobile"
              className="form-control"
              {...register("mobile", { required: true })}
            />
            {errors.mobile?.type === "required" && (
              <p className="text-danger lead">*Mobile No is required</p>
            )}
          </div>

          {/* Profile Image */}
          <div className="mb-3">
            <label htmlFor="profile" className="form-label">Paste Profile Image URL</label>
            <input
              type="text"
              id="profile"
              className="form-control"
              {...register("profileImage", { required: true })}
            />
            {errors.profileImage?.type === "required" && (
              <p className="text-danger lead">*Profile Image is required</p>
            )}
          </div>

          <button className="btn btn-success" type="submit">REGISTER</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
