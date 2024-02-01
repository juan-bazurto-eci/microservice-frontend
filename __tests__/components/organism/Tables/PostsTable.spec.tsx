import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PostsProvider } from "@/context/postsContext";
import PostsTable from "@/components/organisms/Tables/PostsTable";

describe("PostsTable Component", () => {
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

  const posts = [
    { id: 1, title: "Title 1", body: "Body 1" },
    { id: 2, title: "Title 2", body: "Body 2" },
    { id: 3, title: "Title 3", body: "Body 3" },
  ];

  it("renders PostsTable", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PostsProvider posts={posts}>
          <PostsTable />
        </PostsProvider>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("sorts rows when clicking on column headers", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <PostsProvider posts={posts}>
          <PostsTable />
        </PostsProvider>
      </ThemeProvider>
    );

    fireEvent.click(getByText("Título"));

    fireEvent.click(getByText("ID"));
  });

  it("selects rows when clicking on checkboxes", () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <PostsProvider posts={posts}>
          <PostsTable />
        </PostsProvider>
      </ThemeProvider>
    );

    fireEvent.click(getByLabelText("select all rows"));
  });

  it("handles page change correctly", () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <PostsProvider posts={posts}>
          <PostsTable />
        </PostsProvider>
      </ThemeProvider>
    );

    fireEvent.click(getByLabelText("Go to next page"));
  });

  it("handles dense padding switch correctly", () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <PostsProvider posts={posts}>
          <PostsTable />
        </PostsProvider>
      </ThemeProvider>
    );

    fireEvent.click(getByLabelText("Dense padding"));
  });
});
