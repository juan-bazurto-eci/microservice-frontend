import { Grid } from "@mui/material";

// components
import FormPost from "@/components/organisms/Forms/FormPost";
import ParentCard from "@/components/molecules/shared/ParentCard";
import Breadcrumb from "@/components/organisms/Breadcrumb/Breadcrumb";
import PageContainer from "@/components/container/PageContainer";
import withAuthenticationRequired from "@/hoc/withAuthenticationRequired";

const BCrumb = [
  {
    to: "/dashboard",
    title: "Inicio",
  },
  {
    to: "/posts",
    title: "Posts",
  },
  {
    title: "Publicar Post",
  },
];

const PublishPost = () => {
  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="Publicar Post" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ParentCard title="Post">
            <FormPost />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default withAuthenticationRequired(PublishPost);
