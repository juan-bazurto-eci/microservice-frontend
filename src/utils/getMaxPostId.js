export const getMaxPostId = (posts) => {
  const maxId = posts.reduce((max, post) => (post.id > max ? post.id : max), 0);
  return maxId !== 0 ? maxId : null;
};
