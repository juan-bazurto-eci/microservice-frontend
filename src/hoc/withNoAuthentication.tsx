import React, { FC } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";

const withNoAuthentication = (Component: FC) => {
  const NonAuthenticatedComponent: FC = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (user) {
      router?.push("/dashboard");
      return <></>;
    }

    return loading ? <></> : <Component {...props} />;
  };

  NonAuthenticatedComponent.displayName = `withNoAuthentication(${
    Component.displayName || Component.name || "Component"
  })`;

  return NonAuthenticatedComponent;
};

export default withNoAuthentication;
