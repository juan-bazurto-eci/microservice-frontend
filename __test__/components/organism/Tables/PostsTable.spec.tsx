import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import PostsTable from "@/components/organisms/Tables/PostsTable";
import { store } from "@/store/Store";

describe("PostsTable Component", () => {
  it("renders PostsTable", () => {
    const theme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
    });

    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PostsTable />
        </ThemeProvider>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
