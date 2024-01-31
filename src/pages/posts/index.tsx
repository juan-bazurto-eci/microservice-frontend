import { Grid } from "@mui/material";
import Breadcrumb from "@/components/organisms/Breadcrumb/Breadcrumb";
import PageContainer from "@/components/container/PageContainer";
import ComplexCard from "@/components/molecules/cards/ComplexCard";
import withAuthenticationRequired from "@/hoc/withAuthenticationRequired";

const BCrumb = [
  {
    to: "/dashboard",
    title: "Inicio",
  },
  {
    title: "Posts",
  },
];

const complexCard = [
  {
    title: "Publicar",
    href: "/posts/publicar",
  },
  {
    title: "Actualizar",
    href: "/posts/actualizar",
  },
];

const PostsPage = () => {
  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="Posts" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ComplexCard complexCard={complexCard} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default withAuthenticationRequired(PostsPage);
