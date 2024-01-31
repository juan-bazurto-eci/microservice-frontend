import React, { useEffect, useState } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Provider } from "react-redux";

// CSS FILES
import createEmotionCache from "@/createEmotionCache";
import { ThemeSettings } from "@/theme/Theme";
import Store from "@/store/Store";
import FullLayout from "@/components/templates/FullLayout";
import BlankLayout from "@/components/templates/BlankLayout";
import { useAuth, AuthProvider } from "@/context/authContext";
import { PostsProvider } from "@/context/postsContext";

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
  const { user } = useAuth();
  const [layout, setLayout] = useState<string>("Blank");
  useEffect(() => {
    if (user) {
      setLayout(Component.layout || "Full");
    } else {
      setLayout("Blank");
    }
  }, [user, Component.layout]);
  const Layout = layouts[layout] || FullLayout;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Posts App</title>
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
    <PostsProvider>
      <AuthProvider>
        <MyApp {...props} />
      </AuthProvider>
    </PostsProvider>
  </Provider>
);

WrappedApp.displayName = "WrappedApp";

export default WrappedApp;
