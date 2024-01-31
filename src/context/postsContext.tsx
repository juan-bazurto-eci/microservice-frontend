import { PostType } from "@/types/postType";
import React, { createContext, useContext, useState } from "react";
import { getMaxPostId } from "@/utils/getMaxPostId";

export type PostContextType = {
  lengthPost: number;
  posts: PostType[] | never[];
  addPost: (post: PostType) => void;
  setPosts: (posts: PostType[]) => void;
  updatePost: (updatedPost: PostType) => void;
  removePost: (id: number) => void;
};

const PostsContext = createContext<PostContextType>({
  lengthPost: 0,
  posts: [],
  addPost: (post) => {},
  updatePost: (updatedPost) => {},
  setPosts: () => {},
  removePost: (id) => {},
});

export const PostsProvider = ({ children }: any) => {
  const [posts, setPostsProvider] = useState<PostType[] | never[]>([]);

  const setPosts = (posts: PostType[]) => {
    setPostsProvider(posts);
    localStorage.setItem("posts", JSON.stringify(posts));
  };

  const addPost = (post: PostType) => {
    setPostsProvider((prevPosts) => [...prevPosts, post]);
    localStorage.setItem("posts", JSON.stringify([...posts, post]));
  };

  const removePost = (id: number) => {
    setPostsProvider((prevPosts) =>
      prevPosts.filter((post) => post?.id !== id)
    );
    localStorage.setItem("posts", JSON.stringify([...posts]));
  };

  const updatePost = (updatedPost: PostType) => {
    const updatedIndex = posts.findIndex((post) => post.id === updatedPost.id);
    if (updatedIndex !== -1) {
      setPostsProvider((prevPosts) => [
        ...prevPosts.slice(0, updatedIndex),
        { ...prevPosts[updatedIndex], ...updatedPost },
        ...prevPosts.slice(updatedIndex + 1),
      ]);
      localStorage.setItem(
        "posts",
        JSON.stringify([
          ...posts.slice(0, updatedIndex),
          { ...posts[updatedIndex], ...updatedPost },
          ...posts.slice(updatedIndex + 1),
        ])
      );
    }
  };

  return (
    <PostsContext.Provider
      value={{
        lengthPost: getMaxPostId(posts) ?? 0,
        posts,
        addPost,
        setPosts,
        removePost,
        updatePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext);
};
