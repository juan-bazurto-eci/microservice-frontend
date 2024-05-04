import Cart from "@/components/molecules/cart/Cart";
import Profile from "@/components/molecules/profile/Profile";
import MobileRightSidebar from "@/components/molecules/sidebar/MobileRightSidebar";
import { useAuth } from "@/context/AuthContext";
import { AppState, useSelector } from "@/store/Store";
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  styled,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";

const Header = () => {
  const { isUserLoggedIn } = useAuth();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));

  // drawer
  const customizer = useSelector((state: AppState) => state.customizer);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        {lgUp ? <>{/* <Navigation /> */}</> : null}

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}
          {lgDown ? <MobileRightSidebar /> : null}
          <Cart />
          {isUserLoggedIn() ? (
            <Profile />
          ) : (
            <>
              <Button
                variant="contained"
                href="/iniciar-sesion"
                component={Link}
              >
                Iniciar Sesión
              </Button>
              <Button variant="contained" href="/registrarse" component={Link}>
                Registrarse
              </Button>
            </>
          )}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
