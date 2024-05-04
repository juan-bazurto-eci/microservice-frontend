import * as React from "react";
import { Snackbar, Alert, AlertTitle, AlertColor } from "@mui/material";

interface Props {
  title: string;
  severity: AlertColor;
  open: boolean;
  handleClose: () => void;
  dangerouslySetInnerHTML?: boolean;
  duration?: number;
}

const AlertSubmmit = ({
  title,
  severity,
  open,
  handleClose,
  dangerouslySetInnerHTML = false,
  duration = 6000,
}: Props) => {
  return (
    <React.Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={duration}
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
