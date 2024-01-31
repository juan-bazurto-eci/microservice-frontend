import React from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { AppState, useSelector } from "@/store/Store";
import { IconPower } from "@tabler/icons-react";
import { arrayDestructuring } from "@/utils/arrayDestructuring";
import { useAuth } from "@/context/authContext";

export const Profile = () => {
  const { user, logout } = useAuth();
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  const name = user ? arrayDestructuring(user?.email?.split("@"), "") : "";
  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={"/images/profile/user-1.jpg"} />

          {user ? (
            <Box>
              <Typography variant="h6">{name}</Typography>
            </Box>
          ) : null}
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Cerrar Sesión" placement="top">
              <IconButton
                color="primary"
                onClick={handleLogOut}
                aria-label="Cerrar Sesión"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
