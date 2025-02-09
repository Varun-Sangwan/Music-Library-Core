import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
import { useAuth } from "../../context/AuthContext";

jest.mock("musicLibrary/MusicLibrary", () => ({
  default: () => <div>Mocked Music Library</div>,
}));

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const renderDashboard = () => {
  return render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Dashboard />
    </MemoryRouter>
  );
};

describe("Dashboard Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Dashboard for an admin user  and can logout", () => {
    const mockLogout = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      user: { username: "admin", role: "admin" },
      logout: mockLogout,
    });

    renderDashboard();

    expect(screen.getByText("Welcome, admin!")).toBeInTheDocument();
    expect(screen.getByText("Add Songs")).toBeInTheDocument();
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("redirects an unauthenticated user to login", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    renderDashboard();

    expect(screen.queryByText("Welcome")).not.toBeInTheDocument();
  });
});
