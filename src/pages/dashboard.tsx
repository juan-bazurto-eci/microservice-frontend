import React from "react";
import withAuthenticationRequired from "@/hoc/withAuthenticationRequired";
import { Box } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
import PostsTable from "@/components/organisms/Tables/PostsTable";
// import { GetServerSideProps } from "next";
// import axios from "axios";
// import { PostType } from "@/types/postType";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const [posts] = await Promise.allSettled([
//     axios.get(`${process.env.NEXT_PUBLIC_POSTS_URL}/posts`),
//   ])
//     .then((response) =>
//       response.map((result) => {
//         if (result.status === "fulfilled") {
//           return result.value.data;
//         }
//         return [];
//       })
//     )
//     .catch(() => []);
//   return {
//     props: {
//       posts: ConsultPostDTO(posts ?? []),
//     },
//   };
// };

const Dashboard = () => {
  return (
    <PageContainer>
      <Box>
        <PostsTable dashboard={true} />
      </Box>
    </PageContainer>
  );
};
// interface Props {
//   posts?: PostType[];
// }
export default withAuthenticationRequired(Dashboard);
