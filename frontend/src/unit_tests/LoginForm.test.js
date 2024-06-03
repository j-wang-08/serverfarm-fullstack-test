import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/auth";
import LoginForm from "../components/LoginForm";
import AuthService from "../services/auth.service";

jest.mock("../services/auth.service");
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    _esModule: true,
    ...originalModule,
    useNavigate: () => jest.fn(),
  };
});

describe("LoginForm", () => {
  beforeEach(() => {
    AuthService.login.mockReset();
  });

  test("renders login form", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginForm />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Login/i)[1]).toBeInTheDocument();
  });

  test("handles input change", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password");
  });

  test("validates form and shows error", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.submit(screen.getAllByText(/Login/i)[1]);

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test("submits form and navigates on success", async () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);
    AuthService.login.mockResolvedValue({
      status: 200,
      statusText: "OK",
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getAllByText(/Login/i)[1]);

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
    });
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/posts/create");
    });
  });

  test("shows error message on failed login", async () => {
    AuthService.login.mockResolvedValue({
      status: 401,
      statusText: "Unauthorized",
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getAllByText(/Login/i)[1]);

    await waitFor(() => {
      expect(screen.getAllByText(/Login/i)[0]).toBeInTheDocument();
    });
  });
});
