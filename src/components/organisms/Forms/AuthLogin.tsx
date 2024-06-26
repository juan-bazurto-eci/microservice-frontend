import AlertSubmmit from "@/components/atoms/alert/AlertSubmmit";
import CustomFormLabel from "@/components/atoms/label/CustomFormLabel";
import CustomTextField from "@/components/atoms/textField/CustomTextField";
import { useAuth } from "@/context/AuthContext";
import { Box, Button, FormGroup, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

const AuthLogin = ({ title, subtitle, subtext }: any) => {
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState(false);
  const router = useRouter();
  const initialValues = {
    username: "",
    password: "",
  };

  const handleClose = () => {
    setSubmitError(false);
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/client/login`,
          {
            email: values.username,
            password: values.password,
          }
        );
        console.log("Inicio de sesión exitoso:", response.data);
        login(response.data.clientResponseDTO);
        router.push("/");
      } catch (error) {
        setSubmitError(true);
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
      <AlertSubmmit
        open={submitError}
        handleClose={handleClose}
        title={"Email o Contraseña incorrectas."}
        severity={"error"}
      />
    </>
  );
};

export default AuthLogin;
