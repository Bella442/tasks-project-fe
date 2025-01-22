import { useTranslation } from "react-i18next";

import { Link, TableCell, TableRow } from "@mui/material";

import MyTable from "@components/Table/MyTable";
import { UniversityData } from "@sharedTypes/globalTypes";

interface UniversityTableProps {
  data: Array<UniversityData> | undefined;
}

const UniversityTable = (props: UniversityTableProps) => {
  const { t } = useTranslation();

  return (
    <MyTable<UniversityData>
      columns={[
        { name: t("UNIVERSITY_TABLE.COLUMNS.UNIVERSITY_NAME"), sortBy: "name" },
        { name: t("UNIVERSITY_TABLE.COLUMNS.WEB_PAGES") },
        { name: t("COMMON.LABELS.COUNTRY"), sortBy: "country" },
      ]}
      data={props.data}
      rowsContent={(row: UniversityData, index: number) => (
        <TableRow
          key={`${row.name}-${index}`}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="center">
            <Link href={`${row.web_pages[0]}`} rel="noreferrer" target="_blank">
              {row.web_pages[0]}
            </Link>
          </TableCell>
          <TableCell align="right">{row.country}</TableCell>
        </TableRow>
      )}
    />
  );
};

export default UniversityTable;
