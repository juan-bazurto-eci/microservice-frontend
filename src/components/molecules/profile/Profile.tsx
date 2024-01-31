import React, { useState } from "react";
import {
  Box,
  styled,
  BoxProps,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import { AppState, useSelector, useDispatch } from "@/store/Store";
import { Stack } from "@mui/system";
import { setDarkMode } from "@/store/customizer/CustomizerSlice";
import { arrayDestructuring } from "@/utils/arrayDestructuring";
import { useAuth } from "@/context/authContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: "20px",
    cursor: "pointer",
    justifyContent: "center",
    display: "flex",
    transition: "0.1s ease-in",
    border: "1px solid rgba(145, 158, 171, 0.12)",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }));
  const name = user ? arrayDestructuring(user?.email?.split("@"), "") : "";
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={"/images/profile/user-1.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 4,
          },
        }}
      >
        <Typography variant="h5">Perfil</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={"/images/profile/user-1.jpg"}
            alt={"ProfileImg"}
            sx={{ width: 95, height: 95 }}
          />
          {user ? (
            <Box>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                fontWeight={600}
              >
                {name}
              </Typography>
            </Box>
          ) : null}
        </Stack>
        <Divider />
        <Box mt={2}>
          <Box p={3}>
            {/* ------------------------------------------- */}
            {/* ------------ Dark light theme setting ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              Opción de tema
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => dispatch(setDarkMode("light"))}
                display="flex"
                gap={1}
              >
                <WbSunnyTwoToneIcon
                  color={
                    customizer.activeMode === "light" ? "primary" : "inherit"
                  }
                />
                Light
              </StyledBox>
              <StyledBox
                onClick={() => dispatch(setDarkMode("dark"))}
                display="flex"
                gap={1}
              >
                <DarkModeTwoToneIcon
                  color={
                    customizer.activeMode === "dark" ? "primary" : "inherit"
                  }
                />
                Dark
              </StyledBox>
            </Stack>

            <Box pt={3} />
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogOut}
            fullWidth
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
