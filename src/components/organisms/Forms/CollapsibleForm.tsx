import React from "react";
import { useFormikContext } from "formik";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import { IconChevronDown, IconHelp } from "@tabler/icons-react";
import CustomFormLabel from "@/components/atoms/label/CustomFormLabel";
import CustomOutlinedInput from "@/components/atoms/outlined-input/CustomOutlinedInput";
import CustomTextField from "@/components/atoms/textField/CustomTextField";

const CollapsibleForm = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext<any>();

  const handleChangePanel =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        sx={{ mb: 2 }}
        expanded={expanded === "panel1"}
        onChange={handleChangePanel("panel1")}
      >
        <AccordionSummary expandIcon={<IconChevronDown size="20" />}>
          <Typography variant="h6">Dirección de envío</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <CustomFormLabel htmlFor="fullName">
                Nombre completo
              </CustomFormLabel>
              <CustomTextField
                name="fullName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                fullWidth
                placeholder="John Deo"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomFormLabel htmlFor="phone">
                Número de teléfono
              </CustomFormLabel>
              <CustomTextField
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                fullWidth
                placeholder="3213213214"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormLabel htmlFor="address">Dirección</CustomFormLabel>
              <CustomTextField
                name="address"
                multiline
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                fullWidth
                placeholder="Calle 100 # 100 - 100"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomFormLabel htmlFor="postalCode">
                Código postal
              </CustomFormLabel>
              <CustomTextField
                name="postalCode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.postalCode}
                error={touched.postalCode && Boolean(errors.postalCode)}
                helperText={touched.postalCode && errors.postalCode}
                fullWidth
                placeholder="110111"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomFormLabel htmlFor="city">Ciudad</CustomFormLabel>
              <CustomTextField
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
                fullWidth
                placeholder="Bogotá"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ mb: 2 }}
        expanded={expanded === "panel3"}
        onChange={handleChangePanel("panel3")}
      >
        <AccordionSummary expandIcon={<IconChevronDown size="20" />}>
          <Typography variant="h6">Método de pago</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <CustomFormLabel htmlFor="cardNumber">
                Número de tarjeta
              </CustomFormLabel>
              <CustomTextField
                name="cardNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cardNumber}
                error={touched.cardNumber && Boolean(errors.cardNumber)}
                helperText={touched.cardNumber && errors.cardNumber}
                fullWidth
                placeholder="1250 4521 5630 1540"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomFormLabel htmlFor="cardHolderName">
                Nombre en la tarjeta
              </CustomFormLabel>
              <CustomTextField
                name="cardHolderName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cardHolderName}
                error={touched.cardHolderName && Boolean(errors.cardHolderName)}
                helperText={touched.cardHolderName && errors.cardHolderName}
                fullWidth
                placeholder="John Deo"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomFormLabel htmlFor="cardExpirationDate">
                Fecha de expiración
              </CustomFormLabel>
              <CustomTextField
                name="cardExpirationDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cardExpirationDate}
                error={
                  touched.cardExpirationDate &&
                  Boolean(errors.cardExpirationDate)
                }
                helperText={
                  touched.cardExpirationDate && errors.cardExpirationDate
                }
                fullWidth
                placeholder="MM/YY"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomFormLabel htmlFor="cardCVV">CCV</CustomFormLabel>
              <CustomOutlinedInput
                name="cardCVV"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cardCVV}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconHelp width="20" />
                    </InputAdornment>
                  ),
                }}
                error={touched.cardCVV && Boolean(errors.cardCVV)}
                helperText={touched.cardCVV && errors.cardCVV}
                fullWidth
                placeholder="456"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CollapsibleForm;
