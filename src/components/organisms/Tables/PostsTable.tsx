import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import CustomCheckbox from "@/components/atoms/checkbox/CustomCheckbox";
import { PostType } from "@/types/postType";
import CustomSwitch from "@/components/atoms/switch/CustomSwitch";
import EnhancedTableToolbar from "@/components/molecules/toolbar/EnhancedTableToolbar";
import AlertSubmmit from "@/components/atoms/alert/AlertSubmmit";
import axios from "axios";
import { ConsultPostDTO } from "@/models/ConsultPostDTO";
import { usePostsContext } from "@/context/postsContext";
import { isValidArray } from "@/utils/isValidArray";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  a: { [key in Key]: number | string },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Título",
  },

  {
    id: "body",
    numeric: false,
    disablePadding: false,
    label: "Descripción",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all rows",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const PostsTable = ({ dashboard = false }: Props) => {
  const { posts, setPosts, removePost } = usePostsContext();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("title");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<any>(posts);
  const [search, setSearch] = React.useState("");

  const fetchData = async () => {
    try {
      const consultedPosts =
        JSON.parse(localStorage.getItem("posts") || "[]") ?? [];
      if (!isValidArray(consultedPosts)) {
        const response = await axios.get(`/api/posts/get`);
        setPosts(ConsultPostDTO(response?.data ?? {}));
      } else {
        setPosts(ConsultPostDTO(consultedPosts ?? {}));
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!isValidArray(posts)) {
      fetchData();
    }
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredRows: PostType[] = posts?.filter((row: PostType) => {
      return row?.title
        ?.toString()
        ?.toLowerCase()
        ?.includes(event.target.value);
    });
    setSearch(event.target.value);
    setRows(filteredRows);
    setPage(0);
  };

  // This is for the sorting
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // This is for select all the row
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n.id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  // This is for the single row sleect
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleCloseAlert = () => {
    setDeleteSuccess(false);
  };

  const handleDeleteAlert = (status: number) => {
    setSelected([]);
    setDeleteSuccess(true);
  };

  const handleDelete = async () => {
    try {
      let successResponse = 404;
      for (const id of selected) {
        const response = await axios
          .delete(`/api/posts/delete/${id}`)
          ?.then((response) => {
            return response;
          });
        if (response?.status === 200) {
          successResponse = 200;
          removePost(parseInt(id));
        }
      }
      handleDeleteAlert(successResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  React.useEffect(() => {
    setRows(posts);
  }, [posts]);

  return (
    <>
      <Box>
        <Box>
          {dashboard ? (
            <EnhancedTableToolbar
              numSelected={selected.length}
              search={search}
              handleSearch={(event: any) => handleSearch(event)}
              handleDelete={handleDelete}
            />
          ) : null}
          <Paper
            variant="outlined"
            sx={{ mx: 2, mt: 1, border: `1px solid ${borderColor}` }}
          >
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index) => {
                      const isItemSelected = isSelected(row?.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row?.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={`${row?.userId}-${row?.id}-${index}`}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <CustomCheckbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <Typography variant="h6" fontWeight="400">
                              {row?.id ?? ""}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              color="textSecondary"
                              variant="subtitle2"
                              fontWeight="400"
                            >
                              {row?.title ?? ""}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={600} variant="h6">
                              {row?.body ?? ""}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Box sx={{ flex: "1 1 100%" }}>
              <FormControlLabel
                control={
                  <CustomSwitch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
              />
            </Box>
          </Toolbar>
        </Box>
      </Box>
      <AlertSubmmit
        open={deleteSuccess}
        handleClose={handleCloseAlert}
        title={"Posts eliminados correctamente!"}
        severity={"success"}
      />
    </>
  );
};

interface Props {
  posts?: PostType[];
  dashboard?: boolean;
}

export default PostsTable;
