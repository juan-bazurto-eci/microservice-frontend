import { Formik, Form } from "formik";
import * as Yup from "yup";
import PageContainer from "@/components/container/PageContainer";
import {
  Box,
  Button,
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

const steps = ["Cuenta", "Perfil", "Confirmar y Enviar"];

const FormWizard = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    birthDate: Yup.date().required("Required"),
    fullName: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    postalCode: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    cardNumber: Yup.string().required("Required"),
    cardHolderName: Yup.string().required("Required"),
    cardExpirationDate: Yup.string().required("Required"),
    cardCVV: Yup.string().required("Required"),
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
        "http://localhost:8080/client",
        dataToSend
      );
      console.log("Usuario registrado:", response.data);
      handleNext();
      // router.push("/iniciar-sesion");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
    setSubmitting(false);
  };

  return (
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
  );
};

export default FormWizard;
