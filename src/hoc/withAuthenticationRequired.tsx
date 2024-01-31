import React, { useEffect, FC } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";

const withAuthenticationRequired = (Component: FC) => {
  const AuthenticatedComponent: FC = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router?.push("/");
        }
      }
    }, [user, loading]);

    if (loading || !user) {
      return <></>;
    }

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuthenticationRequired(${
    Component.displayName || Component.name || "Component"
  })`;

  return AuthenticatedComponent;
};

export default withAuthenticationRequired;
