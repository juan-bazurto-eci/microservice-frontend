import React from "react";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const AppDD = () => {
  return (
    <>
      <Box>
        <Button
          color="inherit"
          sx={{ color: (theme) => theme.palette.text.secondary }}
          variant="text"
          href="/dashboard"
          component={Link}
        >
          Inicio
        </Button>
        <Button
          color="inherit"
          sx={{ color: (theme) => theme.palette.text.secondary }}
          variant="text"
          href="/posts"
          component={Link}
        >
          Posts
        </Button>
        {/* <Button
          color="inherit"
          sx={{ color: (theme) => theme.palette.text.secondary }}
          variant="text"
          href="/usuarios"
          component={Link}
        >
          Usuarios
        </Button> */}
      </Box>
    </>
  );
};

export default AppDD;
