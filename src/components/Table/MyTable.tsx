import {
  BaseSyntheticEvent,
  ReactNode,
  useState,
  useMemo,
  useEffect,
} from "react";

import {
  TableSortLabel,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";

import {
  NO_RECORDS_TO_DISPLAY,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
} from "@constants/constants";

import { NEED_TO_BE_ANY } from "@sharedTypes/globalTypes";

export interface Column {
  name: string;
  sortBy?: string;
}

type TableProps<T> = {
  data: Array<T> | undefined;
  columns: Array<Column>;
  rowsContent: (row: T, index: number) => ReactNode;
};

type K = { [key: string]: NEED_TO_BE_ANY };

type Order = "asc" | "desc";

const MyTable = <T extends K>(props: TableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<Array<T>>(props.data ?? []);
  const [sortOrder, setSortOrder] = useState<Order>(DESCENDING_ORDER);
  const [orderBy, setOrderBy] = useState("");
  const { typography } = useTheme();

  useEffect(() => {
    if (props.data) {
      setRows(props.data);
    }
  }, [props.data]);

  /**
   * Functions handling table pagination
   * @sets page, rows per page
   */
  const handleChangePage = (
    _event: BaseSyntheticEvent | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: BaseSyntheticEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**/

  /**
   * Sorting logic
   * @sets rows sorted ASC/DESC by "sortBy" column property
   * @
   */
  const sortedData = useMemo(() => {
    const key = orderBy;

    if (key && props.data) {
      return Array.from(props.data).sort((a: T, b: T) => {
        if (sortOrder === ASCENDING_ORDER) {
          return a[key]?.localeCompare(b[key]);
        } else {
          return b[key]?.localeCompare(a[key]);
        }
      });
    } else {
      return props.data || [];
    }
  }, [orderBy, sortOrder, props.data]);

  const toggleSortOrder = (sortBy: string) => {
    setOrderBy(sortBy);
    setSortOrder((prevOrder) =>
      prevOrder === ASCENDING_ORDER ? DESCENDING_ORDER : ASCENDING_ORDER,
    );
  };

  useEffect(() => {
    setRows(sortedData);
  }, [sortedData]);

  /**/

  return (
    <Grid container flexDirection="column" spacing={2}>
      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {props.columns?.map((column: Column) => (
                  <TableCell
                    key={column.name}
                    style={{ fontWeight: typography.fontWeightBold }}
                  >
                    {column.sortBy ? (
                      <TableSortLabel
                        active={orderBy === column.sortBy}
                        direction={
                          orderBy === column.sortBy
                            ? sortOrder
                            : ASCENDING_ORDER
                        }
                        onClick={() => toggleSortOrder(column.sortBy ?? "")}
                      >
                        {column.name}
                      </TableSortLabel>
                    ) : (
                      column.name
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length > 0 ? (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: T, index: number) => props.rowsContent(row, index))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={8}>
                    {NO_RECORDS_TO_DISPLAY}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows?.length || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[25, 50, 100]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
};

export default MyTable;
