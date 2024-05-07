import { Formik, Form } from "formik";
import * as Yup from "yup";
import PageContainer from "@/components/container/PageContainer";
import {
  Alert,
  Box,
  Button,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import CollapsibleForm from "./CollapsibleForm";
import FormSeparator from "./FormSeparator";
import { useRouter } from "next/router";
import AlertSubmmit from "@/components/atoms/alert/AlertSubmmit";

const steps = ["Cuenta", "Perfil", "Confirmar y Enviar"];

const FormWizard = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [error, setError] = React.useState<any>(null);
  const [success, setSuccess] = React.useState<any>(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Nombre de usuario es requerido"),
    password: Yup.string().required("Contraseña es requerida"),
    email: Yup.string().email("Invalid email").required("Email es requerido"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Las contraseñas no coinciden")
      .required("Contraseña es requerida"),
    firstName: Yup.string().required("Nombre es requerido"),
    lastName: Yup.string().required("Apellido es requerido"),
    phoneNumber: Yup.string().required("Número de teléfono es requerido"),
    country: Yup.string().required("Pais es requerido"),
    birthDate: Yup.date().required("Fecha de nacimiento es requerido"),
    fullName: Yup.string().required("Nombre completo es requerido"),
    phone: Yup.string().required("Número de teléfono es requerido"),
    address: Yup.string().required("Dirección es requerido"),
    postalCode: Yup.string().required("Codigo postal es requerido"),
    city: Yup.string().required("Ciudad es requerido"),
    cardNumber: Yup.string().required("Número de tarjeta es requerido"),
    cardHolderName: Yup.string().required("Número de teléfono es requerido"),
    cardExpirationDate: Yup.string().required("Requerido"),
    cardCVV: Yup.string().required("Requerido"),
  });

  const initialValues = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    birthDate: "",
    fullName: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    cardNumber: "",
    cardHolderName: "",
    cardExpirationDate: "",
    cardCVV: "",
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setError(null);
    const dataToSend = {
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      country: values.country,
      phoneNumber: values.phoneNumber,
      birthDate: values.birthDate,
      shippingAddress: {
        name: values.fullName,
        phoneNumber: values.phoneNumber,
        address: values.address,
        postalCode: values.postalCode,
        city: values.city,
      },
      paymentMethod: {
        cardNumber: values.cardNumber,
        expirationDate: values.cardExpirationDate,
        cardHolderName: values.cardHolderName,
        cvv: values.cardCVV,
      },
    };
    try {
      console.log(dataToSend);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/client`,
        dataToSend
      );
      console.log("Usuario registrado:", response.data);
      setSuccess(!success);
    } catch (error: any) {
      console.error("Error al registrar usuario:", error);
      setError(error.response.data.message);
    }
    setSubmitting(false);
  };

  return (
    <>
      <PageContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === 0 && <FormSeparator />}
              {activeStep === 1 && <CollapsibleForm />}
              {activeStep === 2 && (
                <Box sx={{ mt: 2 }}>
                  <Typography>
                    Revisa y confirma tus datos antes de enviar.
                  </Typography>
                  {error && (
                    <>
                      <Stack spacing={2} mt={3}>
                        <Alert severity="error">{error}</Alert>
                      </Stack>
                    </>
                  )}
                </Box>
              )}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={(e) => {
                    e.preventDefault();
                    handleBack();
                  }}
                >
                  Atrás
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep < steps.length - 1 ? (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleNext();
                    }}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Confirmar y Enviar
                  </Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </PageContainer>
      <AlertSubmmit
        open={success}
        handleClose={() => {
          setSuccess(!success);
          handleNext();
          router.push("/iniciar-sesion");
        }}
        title={"Usuario creado"}
        severity={"success"}
        duration={2000}
      />
    </>
  );
};

export default FormWizard;
