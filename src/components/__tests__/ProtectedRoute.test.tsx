import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { useAuth } from "../../context/AuthContext";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("ProtectedRoute Component", () => {
  let mockUseAuth: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuth = useAuth as jest.Mock;
  });

  const ProtectedComponent = (
    <ProtectedRoute>
      <div>Protected Content</div>
    </ProtectedRoute>
  );

  it("renders children when user is authenticated", () => {
    mockUseAuth.mockReturnValue({ user: { username: "testuser" } });

    render(<MemoryRouter>{ProtectedComponent}</MemoryRouter>);

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to login when user is not authenticated", () => {
    mockUseAuth.mockReturnValue({ user: null });

    render(<MemoryRouter>{ProtectedComponent}</MemoryRouter>);

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });
});
