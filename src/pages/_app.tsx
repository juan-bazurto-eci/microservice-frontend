import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import "../_mockApis";
// CSS FILES
import BlankLayout from "@/components/templates/BlankLayout";
import FullLayout from "@/components/templates/FullLayout";
import createEmotionCache from "@/createEmotionCache";
import Store from "@/store/Store";
import { ThemeSettings } from "@/theme/Theme";
import { AuthProvider } from "@/context/AuthContext";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const layouts: any = {
  Blank: BlankLayout,
  Full: FullLayout,
};

const MyApp = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  }: any = props;
  const theme = ThemeSettings();
  const Layout = layouts[Component.layout] || FullLayout;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Ecommerce</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
};

MyApp.displayName = "MyApp";

const WrappedApp = (props: MyAppProps) => (
  <Provider store={Store}>
    <AuthProvider>
      <MyApp {...props} />
    </AuthProvider>
  </Provider>
);

WrappedApp.displayName = "WrappedApp";

export default WrappedApp;
