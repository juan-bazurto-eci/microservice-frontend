import React from "react";
import {
  CardContent,
  Grid,
  Typography,
  MenuItem,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// images
import { Stack } from "@mui/system";
import BlankCard from "@/components/molecules/shared/BlankCard";
import CustomFormLabel from "@/components/atoms/label/CustomFormLabel";
import CustomTextField from "@/components/atoms/textField/CustomTextField";
import CustomSelect from "@/components/atoms/select/CustomSelect";
import { useAuth } from "@/context/AuthContext";

// locations
const locations = [
  {
    value: "us",
    label: "Estados Unidos",
  },
  {
    value: "uk",
    label: "Reino Unido",
  },
  {
    value: "co",
    label: "Colombia",
  },
];

const AccountTab = () => {
  const { user } = useAuth();

  if (!user) return null;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Requerido"),
    lastName: Yup.string().required("Requerido"),
    country: Yup.string().required("Requerido"),
    email: Yup.string().email("Invalid email").required("Requerido"),
    phoneNumber: Yup.string().required("Requerido"),
    address: Yup.string().required("Requerido"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.shippingAddress.address,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        country: values.country,
        email: values.email,
        phoneNumber: values.phoneNumber,
        shippingAddress: { ...user.shippingAddress, address: values.address },
        username: user.username,
        birthDate: user.birthDate,
      };
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_URL}/client/${user.username}`,
          updateData
        );
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
  });

  return (
    <Grid container spacing={3}>
      {/* Change Profile */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Modificar perfil
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Cambia tu foto de perfil desde aquí
            </Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Avatar
                  src={"./images/profile/user-1.jpg"}
                  alt={"user1"}
                  sx={{ width: 120, height: 120, margin: "0 auto" }}
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  my={3}
                >
                  <Button variant="contained" color="primary" component="label">
                    Cargar
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                  <Button variant="outlined" color="error">
                    Restablecer
                  </Button>
                </Stack>
                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                  JPG, GIF o PNG permitidos. Tamaño máximo de 800K
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>
      {/*  Change Password */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Cambiar contraseña
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Para cambiar su contraseña, confirme aquí
            </Typography>
            <form>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-cpwd"
              >
                Contraseña actual
              </CustomFormLabel>
              <CustomTextField
                id="text-cpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 2 */}
              <CustomFormLabel htmlFor="text-npwd">
                Nueva contraseña
              </CustomFormLabel>
              <CustomTextField
                id="text-npwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 3 */}
              <CustomFormLabel htmlFor="text-conpwd">
                Confirmar contraseña
              </CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
            </form>
          </CardContent>
        </BlankCard>
      </Grid>
      {/* Edit Details */}
      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Datos personales
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Para cambiar tus datos personales, edítalos y guárdalos desde aquí
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                {/* Name */}
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="firstName">Nombre</CustomFormLabel>
                  <CustomTextField
                    id="firstName"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="lastName">Apellido</CustomFormLabel>
                  <CustomTextField
                    id="lastName"
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                {/* Country */}
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="country">País</CustomFormLabel>
                  <CustomSelect
                    name="country"
                    fullWidth
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                  >
                    {locations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                  <CustomTextField
                    id="email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                {/* Phone Number */}
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="phoneNumber">
                    Teléfono
                  </CustomFormLabel>
                  <CustomTextField
                    id="phoneNumber"
                    name="phoneNumber"
                    variant="outlined"
                    fullWidth
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                </Grid>
                {/* Address */}
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="address">Dirección</CustomFormLabel>
                  <CustomTextField
                    id="address"
                    name="address"
                    variant="outlined"
                    fullWidth
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
              </Grid>
              {/* <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "end" }}
                mt={3}
              >
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Guardar
                </Button>
                <Button
                  size="large"
                  variant="text"
                  color="error"
                  onClick={() => formik.resetForm()}
                >
                  Cancelar
                </Button>
              </Stack> */}
            </form>
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
  );
};

export default AccountTab;
