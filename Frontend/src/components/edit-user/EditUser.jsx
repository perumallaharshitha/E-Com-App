import "./EditUser.css";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { userLoginContext } from "../../contexts/UserLoginContext";
import { useNavigate } from "react-router-dom";

function EditUser() {
  const { register, handleSubmit, setValue } = useForm();
  const { currentUser, setCurrentUser, token } = useContext(userLoginContext);
  const navigate = useNavigate();

  // Prefill form values from currentUser
  useEffect(() => {
    if (currentUser) {
      setValue("username", currentUser.username);
      setValue("password", currentUser.password);
      setValue("email", currentUser.email || "");
      setValue("mobile", currentUser.mobile || "");
      setValue("profileImage", currentUser.profileImage || "");
    }
  }, [currentUser, setValue]);

  // Save modified user
  async function onSave(modifiedUser) {
    try {
      const res = await fetch("https://e-commerce-app-one-smoky.vercel.app/user-api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(modifiedUser),
      });

      const data = await res.json();
      console.log("Update response:", data);

      if (data.message === "User modified") {
        setCurrentUser(modifiedUser);
        navigate("/user-profile");
      } else {
        alert("Update failed.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <div>
      <form
        className="mx-auto mt-5 bg-light p-3 w-50"
        onSubmit={handleSubmit(onSave)}
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            {...register("username", { required: true })}
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password")}
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">Mobile no</label>
          <input
            type="number"
            id="mobile"
            className="form-control"
            {...register("mobile")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="profile" className="form-label">Paste profile Image URL</label>
          <input
            type="text"
            id="profile"
            className="form-control"
            {...register("profileImage")}
            disabled
          />
        </div>

        <button className="btn btn-success" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditUser;
