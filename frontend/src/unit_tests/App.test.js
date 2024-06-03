import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { store } from "../store/auth";

test("renders welcome message", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );

  expect(screen.getByText(/Welcome to ServerFarm!/i)).toBeInTheDocument();
});
