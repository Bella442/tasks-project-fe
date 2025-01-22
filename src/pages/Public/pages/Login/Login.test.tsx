import { BrowserRouter } from "react-router-dom";

import { render, screen, fireEvent } from "@testing-library/react";

import Login from "./Login";

describe("Login page tests", () => {
  it("Login page renders correctly", () => {
    render(<Login />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Login/i));
  });

  it("User loges in successfully", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const emailField = screen.getByPlaceholderText(/E-mail/i);
    const passwordField = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailField, { target: { value: "test@test.com" } });
    fireEvent.change(passwordField, { target: { value: "12345678" } });

    fireEvent(screen.getByText(/Submit/i), new MouseEvent("click"));

    expect(window.location.pathname === "/first_table");
  });
});
