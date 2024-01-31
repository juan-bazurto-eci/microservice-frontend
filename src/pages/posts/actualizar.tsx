import { Grid } from "@mui/material";

// components
import Breadcrumb from "@/components/organisms/Breadcrumb/Breadcrumb";
import ParentCard from "@/components/molecules/shared/ParentCard";
import PageContainer from "@/components/container/PageContainer";
import withAuthenticationRequired from "@/hoc/withAuthenticationRequired";
import { useState } from "react";
import EnhancedTableToolbar from "@/components/molecules/toolbar/EnhancedTableToolbar";
import AlertSubmmit from "@/components/atoms/alert/AlertSubmmit";
import FormPost from "@/components/organisms/Forms/FormPost";
import { PostType } from "@/types/postType";
import { GetPostDTO } from "@/models/ConsultPostDTO";
import axios from "axios";

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
    title: "Actualizar Post",
  },
];

const UpdatePost = () => {
  const [search, setSearch] = useState("");
  const [post, setPost] = useState<PostType | undefined>();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const handleClose = () => {
    setSubmitSuccess(false);
    setSubmitError(false);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPost({
      id: undefined,
      userId: undefined,
      title: undefined,
      body: undefined,
    });
  };
  const performSearch = async () => {
    try {
      const response = await axios.get(`/api/posts/filter/${search}`);
      setPost(GetPostDTO(response?.data ?? {}));
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (search) performSearch();
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (search) performSearch();
  };

  return (
    <>
      <PageContainer>
        {/* breadcrumb */}
        <Breadcrumb title="Actualizar Post" items={BCrumb} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <EnhancedTableToolbar
              search={search}
              handleSearch={(event: any) => handleSearch(event)}
              handleKeyDown={(event: any) => handleKeyDown(event)}
              handleBlur={(event: any) => handleBlur(event)}
              handleButtonClick={performSearch}
            />
            {/* </Stack> */}
            <ParentCard title="Post">
              <FormPost
                update={true}
                post={post}
                setSearch={setSearch}
                setPost={setPost}
              />
            </ParentCard>
          </Grid>
        </Grid>
      </PageContainer>
      <AlertSubmmit
        open={submitSuccess}
        handleClose={handleClose}
        title={`Post No.${post?.id}`}
        severity={"success"}
      />
      <AlertSubmmit
        open={submitError}
        handleClose={handleClose}
        title={"Post no encontrado. Por favor, inténtalo de nuevo."}
        severity={"error"}
      />
    </>
  );
};

export default withAuthenticationRequired(UpdatePost);
