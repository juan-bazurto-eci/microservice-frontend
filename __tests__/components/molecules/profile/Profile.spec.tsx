import React from "react";
import { render } from "@testing-library/react";
import Profile from "@/components/molecules/profile/Profile";
import { Provider } from "react-redux";
import { store } from "@/store/Store";
import { AuthProvider } from "@/context/authContext";

describe("Profile component", () => {
  it("renders profile information correctly", () => {
    render(
      <Provider store={store}>
        <AuthProvider>
          <Profile />
        </AuthProvider>
      </Provider>
    );
  });
});
