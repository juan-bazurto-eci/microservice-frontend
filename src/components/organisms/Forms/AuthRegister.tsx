import { Box, CardContent, Typography } from "@mui/material";
import FormWizard from "./FormWizard";

const AuthRegister = ({ title, subtitle }: any) => {
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}
      <Box>
        <CardContent>
          <FormWizard />
        </CardContent>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
