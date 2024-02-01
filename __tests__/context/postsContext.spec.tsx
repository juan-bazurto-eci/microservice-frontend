import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PostsProvider, usePostsContext } from "@/context/postsContext";

describe("PostsProvider and usePostsContext", () => {
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

  it("renders PostsProvider and usePostsContext", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PostsProvider>
          <MockComponent />
        </PostsProvider>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("adds a post correctly", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <PostsProvider>
          <MockComponent />
        </PostsProvider>
      </ThemeProvider>
    );

    fireEvent.click(getByText("Add Post"));
  });

  it("updates a post correctly", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <PostsProvider>
          <MockComponent />
        </PostsProvider>
      </ThemeProvider>
    );

    fireEvent.click(getByText("Add Post"));
    fireEvent.click(getByText("Update Post"));
  });

  it("removes a post correctly", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <PostsProvider>
          <MockComponent />
        </PostsProvider>
      </ThemeProvider>
    );

    fireEvent.click(getByText("Add Post"));
    fireEvent.click(getByText("Remove Post"));
  });
});

const MockComponent = () => {
  const { addPost, updatePost, removePost } = usePostsContext();

  return (
    <div>
      <button
        onClick={() =>
          addPost({ id: 1, title: "Test Title", body: "Test Body" })
        }
      >
        Add Post
      </button>
      <button onClick={() => updatePost({ id: 1, title: "Updated Title" })}>
        Update Post
      </button>
      <button onClick={() => removePost(1)}>Remove Post</button>
    </div>
  );
};
