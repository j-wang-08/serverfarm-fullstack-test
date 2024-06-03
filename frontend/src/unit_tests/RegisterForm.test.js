import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/auth";
import RegisterForm from "../components/RegisterForm";
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

describe("RegisterForm", () => {
  beforeEach(() => {
    AuthService.register.mockReset();
  });

  test("renders login form", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Password/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Register/i)[1]).toBeInTheDocument();
  });

  test("handles input change", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      </Provider>
    );
    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getAllByLabelText(/Password/i)[0];
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

    fireEvent.change(usernameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });

    expect(usernameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password");
    expect(confirmPasswordInput.value).toBe("password");
  });

  test("validates form and shows error", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.submit(screen.getAllByText(/Register/i)[1]);

    await waitFor(() => {
      expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getAllByText(/Password is required/i)[0]
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Confirm Password is required/i)
      ).toBeInTheDocument();
    });
  });

  test("submits form and navigates on success", async () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);
    AuthService.register.mockResolvedValue({
      status: 200,
      statusText: "OK",
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: {
        value: "John Doe",
      },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getAllByLabelText(/Password/i)[0], {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getAllByText(/Register/i)[1]);

    await waitFor(() => {
      expect(AuthService.register).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(AuthService.register).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
        firstName: "John",
        lastName: "Doe",
      });
    });
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/login");
    });
  });

  test("shows error message on failed register", async () => {
    AuthService.register.mockResolvedValue({
      status: 409,
      statusText: "Email already exists",
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: {
        value: "John Doe",
      },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getAllByLabelText(/Password/i)[0], {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getAllByText(/Register/i)[1]);

    await waitFor(() => {
      expect(screen.getAllByText(/Register/i)[0]).toBeInTheDocument();
    });
  });
});
