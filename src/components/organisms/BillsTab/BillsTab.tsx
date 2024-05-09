import {
  Avatar,
  Box,
  Button,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";

import CustomFormLabel from "@/components/atoms/label/CustomFormLabel";
import CustomTextField from "@/components/atoms/textField/CustomTextField";
import BlankCard from "@/components/molecules/shared/BlankCard";
import { useAuth } from "@/context/AuthContext";
import { Stack } from "@mui/system";
import { IconCreditCard, IconHelp, IconPencilMinus } from "@tabler/icons-react";
import { useState } from "react";
import CustomOutlinedInput from "@/components/atoms/outlined-input/CustomOutlinedInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AlertSubmmit from "@/components/atoms/alert/AlertSubmmit";

const BillsTab = () => {
  const { user, updateUser } = useAuth();
  if (!user) return null;
  const [success, setSuccess] = useState<any>(false);
  const [error, setError] = useState<any>(null);
  const [showPaymentFields, setShowPaymentFields] = useState(false);
  const validationSchema = Yup.object({
    name: Yup.string().required("Requerido"),
    address: Yup.string().required("Requerido"),
    city: Yup.string().required("Requerido"),
    postalCode: Yup.string().required("Requerido"),
    phoneNumber: Yup.string().required("Requerido"),
    cardNumber: Yup.string(),
    cardHolderName: Yup.string(),
    cardExpirationDate: Yup.string(),
    cardCVV: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: user.shippingAddress.name,
      address: user.shippingAddress.address,
      city: user.shippingAddress.city,
      postalCode: user.shippingAddress.postalCode,
      phoneNumber: user.shippingAddress.phoneNumber,
      cardNumber: "",
      cardHolderName: "",
      cardExpirationDate: "",
      cardCVV: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError(null);
      const updateAddress = axios.put(
        `${process.env.NEXT_PUBLIC_URL}/client/${user.username}/address`,
        {
          name: values.name,
          phoneNumber: values.phoneNumber,
          address: values.address,
          postalCode: values.postalCode,
          city: values.city,
        }
      );

      const requests = [updateAddress];

      if (showPaymentFields) {
        const updatePaymentMethod = axios.put(
          `${process.env.NEXT_PUBLIC_URL}/client/${user.username}/payment-method`,
          {
            cardNumber: values.cardNumber,
            expirationDate: values.cardExpirationDate,
            cardHolderName: values.cardHolderName,
            cvv: values.cardCVV,
          }
        );
        requests.push(updatePaymentMethod);
      }

      Promise.all(requests)
        .then((responses) => {
          console.log("Address and payment info updated", responses);
          updateUser(responses?.pop()?.data);
          setSuccess(true);
          setShowPaymentFields(false);
        })
        .catch((error) => {
          console.error("Failed to update info", error);
          setError(error.response.data.message);
        });
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={9}>
            <BlankCard>
              <CardContent>
                <Typography variant="h4" mb={2}>
                  Información de facturación
                </Typography>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-fname">
                    Nombre Completo
                  </CustomFormLabel>
                  <CustomTextField
                    id="name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-baddress">
                      Dirección
                    </CustomFormLabel>
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
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-bcy">
                      Ciudad
                    </CustomFormLabel>
                    <CustomTextField
                      id="city"
                      name="city"
                      variant="outlined"
                      fullWidth
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-bcy">
                      Código postal
                    </CustomFormLabel>
                    <CustomTextField
                      id="postalCode"
                      name="postalCode"
                      variant="outlined"
                      fullWidth
                      value={formik.values.postalCode}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.postalCode &&
                        Boolean(formik.errors.postalCode)
                      }
                      helperText={
                        formik.touched.postalCode && formik.errors.postalCode
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-fname">
                      Número de teléfono
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
                {!showPaymentFields ? (
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
                        {"*******" +
                          user?.paymentMethod?.cardNumber?.split("==")[1]}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: "auto !important" }}>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={() =>
                            setShowPaymentFields(!showPaymentFields)
                          }
                        >
                          <IconPencilMinus size="22" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                ) : (
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="cardNumber">
                        Número de tarjeta
                      </CustomFormLabel>
                      <CustomTextField
                        id="cardNumber"
                        name="cardNumber"
                        variant="outlined"
                        fullWidth
                        value={formik.values.cardNumber}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.cardNumber &&
                          Boolean(formik.errors.cardNumber)
                        }
                        helperText={
                          formik.touched.cardNumber && formik.errors.cardNumber
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomFormLabel htmlFor="cardHolderName">
                        Nombre en la tarjeta
                      </CustomFormLabel>
                      <CustomTextField
                        id="cardHolderName"
                        name="cardHolderName"
                        variant="outlined"
                        fullWidth
                        value={formik.values.cardHolderName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.cardHolderName &&
                          Boolean(formik.errors.cardHolderName)
                        }
                        helperText={
                          formik.touched.cardHolderName &&
                          formik.errors.cardHolderName
                        }
                        placeholder="Nombre"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomFormLabel htmlFor="cardExpirationDate">
                        Fecha de expiración
                      </CustomFormLabel>
                      <CustomTextField
                        id="cardExpirationDate"
                        name="cardExpirationDate"
                        variant="outlined"
                        fullWidth
                        value={formik.values.cardExpirationDate}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.cardExpirationDate &&
                          Boolean(formik.errors.cardExpirationDate)
                        }
                        helperText={
                          formik.touched.cardExpirationDate &&
                          formik.errors.cardExpirationDate
                        }
                        placeholder="MM/YY"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomFormLabel htmlFor="cardCVV">CCV</CustomFormLabel>
                      <CustomOutlinedInput
                        id="cardCVV"
                        name="cardCVV"
                        variant="outlined"
                        fullWidth
                        value={formik.values.cardCVV}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.cardCVV &&
                          Boolean(formik.errors.cardCVV)
                        }
                        helperText={
                          formik.touched.cardCVV && formik.errors.cardCVV
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconHelp width="20" />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="456"
                      />
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </BlankCard>
          </Grid>
        </Grid>

        <Stack
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
            onClick={() => {
              setShowPaymentFields(false);
              formik.resetForm();
            }}
          >
            Cancelar
          </Button>
        </Stack>
      </form>
      <AlertSubmmit
        open={success}
        handleClose={() => {
          setSuccess(!success);
        }}
        title={"Cambios guardados correctamente"}
        severity={"success"}
        duration={2000}
      />
      <AlertSubmmit
        open={error}
        handleClose={() => {
          setError(null);
        }}
        title={error}
        severity={"error"}
        duration={2000}
      />
    </>
  );
};

export default BillsTab;
