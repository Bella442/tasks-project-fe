import { useTranslation } from "react-i18next";

import { Divider, Grid, TableCell, TableRow } from "@mui/material";

import { useGetPersonalTasksQuery } from "@api/tasks/tasksApi";
import Loader from "@components/Loader/Loader";
import MyTable from "@components/Table/MyTable";
import PageTitle from "@components/Texts/PageTitle";

import { TasksData } from "@sharedTypes/globalTypes";

const Table1Page = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetPersonalTasksQuery();

  const getAssigneeName = (row: TasksData) => {
    if (row.user) {
      return `${row.user?.firstName} ${row.user?.lastName}`;
    }
  };

  return (
    <Grid container flexDirection="column" spacing={2}>
      <Grid item>
        <PageTitle text={t("TABLE_1_PAGE.TITLE")} />
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid item>
          <MyTable<TasksData>
            columns={[
              {
                name: t("Task name"),
                sortBy: "name",
              },
              { name: t("Start Date") },
              { name: t("End Date") },
              { name: t("Assignee") },
              { name: t("Status") },
            ]}
            data={data}
            rowsContent={(row: TasksData, index: number) => (
              <TableRow
                key={`${row.taskName}-${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.taskName}
                </TableCell>
                <TableCell>{row.startDate.toString()}</TableCell>
                <TableCell>{row.startDate.toString()}</TableCell>
                <TableCell>{getAssigneeName(row)}</TableCell>
                <TableCell>{row.taskStatus}</TableCell>
              </TableRow>
            )}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Table1Page;
