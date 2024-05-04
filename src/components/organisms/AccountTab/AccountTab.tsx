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

  const [location, setLocation] = React.useState(user?.country);

  const handleChange1 = (event: any) => {
    setLocation(event.target.value);
  };

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
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    Nombre
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    value={user.firstName}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 2 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-store-name"
                  >
                    Apellido
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-store-name"
                    value={user.lastName}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 3 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-location"
                  >
                    País
                  </CustomFormLabel>
                  <CustomSelect
                    fullWidth
                    id="text-location"
                    variant="outlined"
                    value={location}
                    onChange={handleChange1}
                  >
                    {locations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 5 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    Email
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-email"
                    value={user.email}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 6 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-phone"
                  >
                    Teléfono
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-phone"
                    value={user.phoneNumber}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* 7 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-address"
                  >
                    Dirección
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-address"
                    value={user.shippingAddress.address}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>
        {/* <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "end" }}
          mt={3}
        >
          <Button size="large" variant="contained" color="primary">
            Guardar
          </Button>
          <Button size="large" variant="text" color="error">
            Cancelar
          </Button>
        </Stack> */}
      </Grid>
    </Grid>
  );
};

export default AccountTab;
