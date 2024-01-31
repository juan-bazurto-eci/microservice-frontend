import { render } from "@testing-library/react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MockAdapter from "axios-mock-adapter";
import FormPost from "@/components/organisms/Forms/FormPost";
import { PostsProvider } from "@/context/postsContext";

describe("FormPost component", () => {
  const mockPost = {
    id: 1,
    userId: 1,
    title: "Test Title",
    body: "Test Body",
  };

  const mockSearch = jest.fn();
  const mockSetPost = jest.fn();

  const mockAxios = new MockAdapter(axios);
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

  beforeEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  it("renders FormPost for creating a new post", () => {
    render(
      <ThemeProvider theme={theme}>
        <PostsProvider>
          <FormPost />
        </PostsProvider>
      </ThemeProvider>
    );
  });

  it("renders FormPost for updating an existing post", async () => {
    render(
      <ThemeProvider theme={theme}>
        <PostsProvider>
          <FormPost
            post={mockPost}
            update
            setSearch={mockSearch}
            setPost={mockSetPost}
          />
        </PostsProvider>
      </ThemeProvider>
    );
  });
});
