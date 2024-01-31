import * as React from "react";
import { Snackbar, Alert, AlertTitle, AlertColor } from "@mui/material";

interface Props {
  title: string;
  severity: AlertColor;
  open: boolean;
  handleClose: () => void;
  dangerouslySetInnerHTML?: boolean;
}

const AlertSubmmit = ({
  title,
  severity,
  open,
  handleClose,
  dangerouslySetInnerHTML = false,
}: Props) => {
  return (
    <React.Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          {dangerouslySetInnerHTML ? (
            <AlertTitle dangerouslySetInnerHTML={{ __html: title }} />
          ) : (
            <AlertTitle>{title}</AlertTitle>
          )}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AlertSubmmit;
