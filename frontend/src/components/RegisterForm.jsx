import React, { useState } from "react";
import AuthService from "../services/auth.service";

const RegisterForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};

    if (!formState.username) {
      errors.username = "Username is required";
    }

    if (!formState.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Email address is invalid";
    }

    if (!formState.password) {
      errors.password = "Password is required";
    } else if (formState.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formState.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formState.confirmPassword !== formState.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully", formState);
      const [firstName, lastName] = formState.username.split(" ");
      const res = await AuthService.register({
        firstName,
        lastName,
        email: formState.email,
        password: formState.password,
      });
      console.log("res: ", res);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              formErrors.username ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {formErrors.username && (
            <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              formErrors.password ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              formErrors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
