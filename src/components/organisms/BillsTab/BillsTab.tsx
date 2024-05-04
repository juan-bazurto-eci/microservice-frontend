import { Avatar, Box, CardContent, Grid, Typography } from "@mui/material";

// components
import CustomFormLabel from "@/components/atoms/label/CustomFormLabel";
import CustomTextField from "@/components/atoms/textField/CustomTextField";
import BlankCard from "@/components/molecules/shared/BlankCard";
import { useAuth } from "@/context/AuthContext";
import { Stack } from "@mui/system";
import { IconCreditCard } from "@tabler/icons-react";

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

const BillsTab = () => {
  const { user } = useAuth();
  if (!user) return null;
  const country = locations.find((loc) => loc.value === user.country);
  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={9}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Información de facturación
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-baddress">
                    Dirección
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-baddress"
                    value={country?.label}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-bcy">
                    País
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-bcy"
                    value={user.shippingAddress.city}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-bcy">
                    Ciudad
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-bcy"
                    value={user.shippingAddress.city}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-bcy">
                    Código postal
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-bcy"
                    value={user.shippingAddress.postalCode}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-fname">
                    Nombre
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-fname"
                    value={user.firstName}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-lname">
                    Apellido
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-lname"
                    value={user.lastName}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
          </BlankCard>
        </Grid>

        {/* 3 */}
        <Grid item xs={12} lg={9}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Método de pago
              </Typography>
              {/* list 1 */}
              <Stack direction="row" spacing={2} mt={4}>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: "grey.100",
                    color: "grey.500",
                    width: 48,
                    height: 48,
                  }}
                >
                  <IconCreditCard size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Visa
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    *****2102
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>

      {/* <Stack direction="row" spacing={2} sx={{ justifyContent: "end" }} mt={3}>
        <Button size="large" variant="contained" color="primary">
          Guardar
        </Button>
        <Button size="large" variant="text" color="error">
          Cancelar
        </Button>
      </Stack> */}
    </>
  );
};

export default BillsTab;
