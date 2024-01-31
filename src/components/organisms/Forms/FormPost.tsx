import {
  Grid,
  Button,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Stack } from "@mui/system";
import Link from "next/link";
import CustomTextField from "@/components/atoms/textField/CustomTextField";
import CustomFormLabel from "@/components/atoms/label/CustomFormLabel";
import { useFormik } from "formik";
import * as yup from "yup";
import AlertSubmmit from "@/components/atoms/alert/AlertSubmmit";
import axios from "axios";
import { PostType } from "@/types/postType";
import { usePostsContext } from "@/context/postsContext";
import { GetPostDTO } from "@/models/ConsultPostDTO";

interface Props {
  post?: PostType;
  update?: boolean;
  setSearch?: Dispatch<SetStateAction<string>>;
  setPost?: (post: PostType) => void;
}

const validationSchema = yup.object({
  userId: yup
    .number()
    .typeError("Debe ser un número")
    .min(1, "Debe ser mayor que 0")
    .required("Id del usuario es requerido"),
  title: yup
    .string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/,
      "Sólo puede contener letras, tildes y espacios"
    )
    .min(4, "Debe tener al menos 4 caracteres")
    .required("Título es requerido"),
  body: yup
    .string()
    .min(4, "Debe tener al menos 4 caracteres")
    .required("Descripción es requerida"),
});

const FormPost = ({ post, update = false, setSearch, setPost }: Props) => {
  const { lengthPost, addPost, updatePost } = usePostsContext();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const formik = useFormik({
    initialValues: {
      userId: 1,
      title: "",
      body: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = update
          ? await axios.put(`/api/posts/update/${post?.id}`, {
              post: {
                id: post?.id,
                userId: values.userId,
                title: values.title,
                body: values.body,
              },
            })
          : await axios.post("/api/posts/add", {
              post: {
                title: values.title,
                body: values.body,
              },
            });
        if (setSearch && setPost) {
          setSearch("");
          setPost({
            id: undefined,
            userId: undefined,
            title: undefined,
            body: undefined,
          });
        }
        if (response?.status === 200) {
          if (update) {
            updatePost(GetPostDTO(response?.data));
          } else {
            addPost({ ...GetPostDTO(response?.data), id: lengthPost + 1 });
          }
          setSubmitSuccess(true);
        } else {
          setSubmitError(true);
        }
        resetForm();
      } catch (error) {
        setSubmitError(true);
      }
    },
  });

  const handleClose = () => {
    setSubmitSuccess(false);
    setSubmitError(false);
  };

  useEffect(() => {
    if (post) {
      formik.resetForm({
        values: {
          userId: post?.userId ?? 0,
          title: post?.title?.replaceAll('"', "") ?? "",
          body: post?.body?.toString() ?? "",
        },
      });
    }
  }, [post]);

  return (
    <>
      <div>
        {update ? (
          <Typography variant="h6" mb={3}>
            Detalles Usuario
          </Typography>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* 1 */}
            {update ? (
              <>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="end"
                >
                  <CustomFormLabel
                    htmlFor="userId"
                    sx={{ mt: 0, mb: { xs: "-10px", sm: 0 } }}
                  >
                    ID del Usario
                  </CustomFormLabel>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <CustomTextField
                    id="userId"
                    name="userId"
                    placeholder="ID"
                    fullWidth
                    disabled={update}
                    value={formik.values.userId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.userId && Boolean(formik.errors.userId)
                    }
                    helperText={formik.touched.userId && formik.errors.userId}
                  />
                </Grid>
              </>
            ) : null}

            <Grid item xs={12}>
              {update ? <Divider sx={{ mx: "-24px" }} /> : null}
              <Typography variant="h6" mt={2}>
                Detalles del Post
              </Typography>
            </Grid>
            {/* 4 */}
            <Grid
              item
              xs={12}
              sm={3}
              display="flex"
              alignItems="center"
              justifyContent="end"
            >
              <CustomFormLabel
                htmlFor="title"
                sx={{ mt: 0, mb: { xs: "-10px", sm: 0 } }}
              >
                Título
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <CustomTextField
                id="title"
                name={"title"}
                placeholder="Título"
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            {/* 5 */}
            <Grid
              item
              xs={12}
              sm={3}
              display="flex"
              alignItems="center"
              justifyContent="end"
            >
              <CustomFormLabel
                htmlFor="body"
                sx={{ mt: lgUp ? -10 : 0, mb: { xs: "-10px", sm: 0 } }}
              >
                Descripción
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <CustomTextField
                id="body"
                name={"body"}
                placeholder="Descripción"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.body && Boolean(formik.errors.body)}
                helperText={formik.touched.body && formik.errors.body}
              />
            </Grid>
            <Grid item xs={12} sm={3} />
            <Grid item xs={12} sm={9}>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" type="submit">
                  Guardar
                </Button>
                <Link href={"/posts"}>
                  <Button variant="text" color="error">
                    Cancelar
                  </Button>
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </div>
      <AlertSubmmit
        open={submitSuccess}
        handleClose={handleClose}
        title={`Post ${update ? "actualizado" : "publicado"} correctamente!`}
        severity="success"
      />
      <AlertSubmmit
        open={submitError}
        handleClose={handleClose}
        title={`Ocurrió un error al ${
          update ? "actualizar" : "publicar"
        } el post. Por favor, inténtalo de nuevo.`}
        severity={"error"}
      />
    </>
  );
};

export default FormPost;
