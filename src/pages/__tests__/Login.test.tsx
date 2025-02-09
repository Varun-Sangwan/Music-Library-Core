import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";
import { useAuth } from "../../context/AuthContext";

// ✅ Mock `useAuth()` BEFORE importing the component
jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// ✅ Mock `useNavigate()` BEFORE importing the component
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Page", () => {
  let mockLogin: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks(); // ✅ Ensures fresh mocks for each test

    // ✅ Mock login function before each test
    mockLogin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
  });

  const renderLogin = () => {
    return render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  };

  it("renders the login form", () => {
    renderLogin();

    expect(screen.getByText("Welcome!!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });

  it("allows admin to log in successfully", () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "admin123" },
    });

    fireEvent.click(screen.getByText("LOGIN"));

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("allows user to log in successfully", () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "user123" },
    });

    fireEvent.click(screen.getByText("LOGIN"));

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("shows an alert on incorrect login credentials", () => {
    renderLogin();

    jest.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "invalidUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByText("LOGIN"));

    expect(window.alert).toHaveBeenCalledWith("Invalid Credentials");
    expect(mockLogin).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("prevents login with empty fields", () => {
    renderLogin();

    fireEvent.click(screen.getByText("LOGIN"));

    expect(mockLogin).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
