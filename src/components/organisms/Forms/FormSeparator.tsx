import React from "react";
import { useFormikContext } from "formik";
import CustomFormLabel from "@/components/atoms/label/CustomFormLabel";
import CustomOutlinedInput from "@/components/atoms/outlined-input/CustomOutlinedInput";
import CustomSelect from "@/components/atoms/select/CustomSelect";
import CustomTextField from "@/components/atoms/textField/CustomTextField";
import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const countries = [
  { value: "us", label: "Estados Unidos" },
  { value: "uk", label: "Reino Unido" },
  { value: "co", label: "Colombia" },
];

const FormSeparator = () => {
  const { values, handleChange, handleBlur, touched, errors, setFieldValue } =
    useFormikContext<any>();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomFormLabel htmlFor="username">
            Nombre de usuario
          </CustomFormLabel>
          <CustomTextField
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            fullWidth
            placeholder="John Deo"
          />

          <CustomFormLabel htmlFor="password">Contraseña</CustomFormLabel>
          <CustomOutlinedInput
            name="password"
            type={values.showPassword ? "text" : "password"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setFieldValue("showPassword", !values.showPassword)
                    }
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {values.showPassword ? <IconEyeOff /> : <IconEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
          <CustomTextField
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">@ejemplo.com</InputAdornment>
              ),
            }}
          />

          <CustomFormLabel htmlFor="confirmPassword">
            Confirmar contraseña
          </CustomFormLabel>
          <CustomOutlinedInput
            name="confirmPassword"
            type={values.showConfirmPassword ? "text" : "password"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setFieldValue(
                        "showConfirmPassword",
                        !values.showConfirmPassword
                      )
                    }
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {values.showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomFormLabel htmlFor="firstName">Nombre</CustomFormLabel>
          <CustomTextField
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            fullWidth
          />
          <CustomFormLabel htmlFor="country">País</CustomFormLabel>
          <CustomSelect
            name="country"
            value={values.country}
            onChange={handleChange}
            fullWidth
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomSelect>
          <CustomFormLabel htmlFor="birthDate">
            Fecha de nacimiento
          </CustomFormLabel>
          <CustomTextField
            type="date"
            name="birthDate"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.birthDate}
            error={touched.birthDate && Boolean(errors.birthDate)}
            helperText={touched.birthDate && errors.birthDate}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomFormLabel htmlFor="lastName">Apellido</CustomFormLabel>
          <CustomTextField
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            fullWidth
          />
          <CustomFormLabel htmlFor="phoneNumber">
            Número de teléfono
          </CustomFormLabel>
          <CustomTextField
            name="phoneNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phoneNumber}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default FormSeparator;
