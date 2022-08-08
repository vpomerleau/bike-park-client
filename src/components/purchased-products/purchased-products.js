import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from "../../components/page-layout/page-layout";


export const PurchasedProducts = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      
    </PageLayout>
  );
};
