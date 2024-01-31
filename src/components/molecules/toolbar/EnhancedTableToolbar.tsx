import { alpha } from "@mui/material/styles";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconSearch, IconTrash } from "@tabler/icons-react";

interface EnhancedTableToolbarProps {
  numSelected?: number;
  handleSearch?: React.ChangeEvent<HTMLInputElement> | any;
  search?: string;
  handleKeyDown?: React.KeyboardEvent<HTMLInputElement> | any;
  handleBlur?: React.FocusEvent<HTMLInputElement> | any;
  handleButtonClick?: () => void;
  handleDelete?: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const {
    numSelected,
    handleSearch,
    search,
    handleKeyDown,
    handleBlur,
    handleButtonClick,
    handleDelete,
  } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        mb: 2,
        ...(numSelected
          ? numSelected > 0
            ? {
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.activatedOpacity
                  ),
              }
            : null
          : null),
      }}
    >
      {numSelected && numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle2"
          component="div"
        >
          {numSelected}
        </Typography>
      ) : (
        <Grid
          container
          spacing={2}
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size="1.1rem" />
                  </InputAdornment>
                ),
              }}
              placeholder={handleButtonClick ? "Post Id" : "Buscador"}
              type={handleButtonClick ? "number" : "text"}
              size="small"
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              value={search}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {handleButtonClick ? (
              <Button onClick={handleButtonClick} fullWidth>
                Buscar
              </Button>
            ) : null}
          </Grid>
        </Grid>
      )}

      {numSelected && numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <IconTrash width="18" onClick={handleDelete} />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
