import React, { act } from "react";
import { render, renderHook, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";
import { jwtDecode } from "jwt-decode";

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

describe("AuthContext", () => {
  let mockDecodedToken: { username: string; role: "admin" | "user" };
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    mockDecodedToken = { username: "user", role: "user" };
    (jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  const TestComponent = () => {
    const { user, login, logout } = useAuth();

    return (
      <div>
        <div data-testid="username">{user ? user.username : "No User"}</div>
        <button onClick={() => login("valid.jwt.token")}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };

  const renderWithProvider = () =>
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

  it("logs out a user and removes token from localStorage", () => {
    renderWithProvider();

    screen.getByText("Login").click();
    expect(localStorage.getItem("token")).toBe("valid.jwt.token");

    screen.getByText("Logout").click();
    expect(localStorage.getItem("token")).toBeNull();
    expect(screen.getByTestId("username").textContent).toBe("No User");
  });

  it("throws an error when `useAuth` is used outside `AuthProvider`", () => {
    const renderOutsideProvider = () => render(<TestComponent />);

    expect(renderOutsideProvider).toThrow(
      "useAuth must be used within an AuthProvider"
    );
  });

  it("handles invalid token gracefully", () => {
    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.login("invalid.jwt.token");
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Invalid token:",
      expect.any(Error)
    );
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
