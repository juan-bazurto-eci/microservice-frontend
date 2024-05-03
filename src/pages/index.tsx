import React from "react";
import { Box } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
import Breadcrumb from "@/components/organisms/Breadcrumb/Breadcrumb";
import AppCard from "@/components/molecules/shared/AppCard";
import ProductList from "@/components/organisms/ProductList/ProductList";
import ProductSidebar from "@/components/organisms/ProductList/ProductSidebar";

const Ecommerce = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(true);

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="Ecom-Shop" />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
        <ProductSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box p={3} flexGrow={1}>
          <ProductList
            onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
          />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Ecommerce;
