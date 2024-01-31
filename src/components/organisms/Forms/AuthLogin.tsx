import React from "react";
import { Box, Typography, Button, FormGroup, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomFormLabel from "@/components/atoms/label/CustomFormLabel";
import CustomTextField from "@/components/atoms/textField/CustomTextField";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";

const AuthLogin = ({ title, subtitle, subtext }: any) => {
  const { login } = useAuth();
  const router = useRouter();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        await login(values?.username, values?.password);
        router.push("/dashboard");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    },
  });

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}
      {subtext}
      <Stack component="form" onSubmit={formik.handleSubmit}>
        <Box>
          <CustomFormLabel htmlFor="username">Email</CustomFormLabel>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Contraseña</CustomFormLabel>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup />
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{ textDecoration: "none", color: "primary.main" }}
          >
            ¿Ha olvidado su contraseña?
          </Typography>
        </Stack>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          fullWidth
        >
          Iniciar sesión
        </Button>
      </Stack>
      {subtitle}
    </>
  );
};

export default AuthLogin;
