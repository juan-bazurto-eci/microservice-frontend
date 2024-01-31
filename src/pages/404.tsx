import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const Error = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <Typography align="center" variant="h4" mb={4}>
        No se ha encontrado la página que busca.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        href="/"
        disableElevation
      >
        Volver
      </Button>
    </Container>
  </Box>
);

Error.layout = "Blank";
export default Error;
