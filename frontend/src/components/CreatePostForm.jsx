import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post.service";

const CreatePostForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
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

    if (!formState.title) {
      errors.title = "Title is required";
    }

    if (!formState.content) {
      errors.content = "Content is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully", formState);
      const res = await PostService.createNewPost({
        title: formState.title,
        content: formState.content,
      });

      if (res && res?.status === 200 && res?.statusText === "OK") {
        navigate("/posts");
      }
    }
  };

  return (
    <div className="max-w-md mx-5 sm:mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-5 text-center">Create New Post</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formState.title}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              formErrors.title ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {formErrors.title && (
            <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={5}
            value={formState.content}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              formErrors.content ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {formErrors.content && (
            <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
