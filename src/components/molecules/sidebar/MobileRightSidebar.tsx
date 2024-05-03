import React, { useState } from "react";
import { IconGridDots } from "@tabler/icons-react";
import { Box, Typography, Drawer, IconButton } from "@mui/material";

import QuickLinks from "@/components/atoms/Links/QuickLinks";

const MobileRightSidebar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const cartContent = (
    <Box>
      <Box px={3} mt={3}>
        <QuickLinks />
      </Box>
    </Box>
  );

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        onClick={() => setShowDrawer(true)}
        sx={{
          ...(showDrawer && {
            color: "primary.main",
          }),
        }}
      >
        <IconGridDots size="21" stroke="1.5" />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Cart Sidebar */}
      {/* ------------------------------------------- */}
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{ sx: { width: "300px" } }}
      >
        <Box p={3} pb={0}>
          <Typography variant="h5" fontWeight={600}>
            Ecom-Shop
          </Typography>
        </Box>

        {/* component */}
        {cartContent}
      </Drawer>
    </Box>
  );
};

export default MobileRightSidebar;
