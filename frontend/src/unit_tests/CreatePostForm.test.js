import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/auth";
import CreatePostForm from "../components/CreatePostForm";
import PostService from "../services/post.service";

jest.mock("../services/post.service");
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    _esModule: true,
    ...originalModule,
    useNavigate: () => jest.fn(),
  };
});

describe("CreatePostForm", () => {
  beforeEach(() => {
    PostService.createNewPost.mockReset();
  });

  test("renders create new post form", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CreatePostForm />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Create/i)[1]).toBeInTheDocument();
  });

  test("handles input change", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreatePostForm />
        </BrowserRouter>
      </Provider>
    );
    const titleInput = screen.getByLabelText(/Title/i);
    const contentInput = screen.getByLabelText(/Content/i);

    fireEvent.change(titleInput, { target: { value: "My first post" } });
    fireEvent.change(contentInput, {
      target: { value: "This is my first post" },
    });

    expect(titleInput.value).toBe("My first post");
    expect(contentInput.value).toBe("This is my first post");
  });

  test("validates form and shows error", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreatePostForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.submit(screen.getAllByText(/Create/i)[1]);

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Content is required/i)).toBeInTheDocument();
    });
  });

  test("submits form and navigates on success", async () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);
    PostService.createNewPost.mockResolvedValue({
      status: 200,
      statusText: "OK",
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreatePostForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: {
        value: "My first post",
      },
    });
    fireEvent.change(screen.getByLabelText(/Content/i), {
      target: { value: "This is my first post" },
    });
    fireEvent.click(screen.getAllByText(/Create/i)[1]);

    await waitFor(() => {
      expect(PostService.createNewPost).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(PostService.createNewPost).toHaveBeenCalledWith({
        title: "My first post",
        content: "This is my first post",
      });
    });
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/posts");
    });
  });

  test("shows error message on failed new post creation", async () => {
    PostService.createNewPost.mockResolvedValue({
      status: 500,
      statusText: "Some error occurred while creating a new Post",
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreatePostForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: {
        value: "My first post",
      },
    });
    fireEvent.change(screen.getByLabelText(/Content/i), {
      target: { value: "This is my first post" },
    });
    fireEvent.click(screen.getAllByText(/Create/i)[1]);

    await waitFor(() => {
      expect(screen.getAllByText(/Create/i)[0]).toBeInTheDocument();
    });
  });
});
