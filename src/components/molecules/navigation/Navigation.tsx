import React from "react";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const Navigation = () => {
  return (
    <>
      <Box>
        <Button
          color="inherit"
          sx={{ color: (theme) => theme.palette.text.secondary }}
          variant="text"
          href="/"
          component={Link}
        >
          Inicio
        </Button>
      </Box>
    </>
  );
};

export default Navigation;
