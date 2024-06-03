import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/auth";
import Posts from "../components/Posts";
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

describe("Posts", () => {
  beforeEach(() => {
    PostService.getAllPosts.mockReset();
  });

  test("renders loading state", async () => {
    PostService.getAllPosts.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Posts />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(PostService.getAllPosts).toHaveBeenCalledTimes(1);
    });
  });

  test("renders no posts message", async () => {
    PostService.getAllPosts.mockResolvedValue({ data: [] });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Posts />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/no posts/i)).toBeInTheDocument();
    });
  });

  test("renders posts correctly", async () => {
    const mockPosts = [
      { id: 1, title: "First Post", body: "This is the first post." },
      { id: 2, title: "Second Post", body: "This is the second post." },
    ];

    PostService.getAllPosts.mockResolvedValue({ data: mockPosts });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Posts />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/my posts/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/first post/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/second post/i)).toBeInTheDocument();
    });
  });
});
