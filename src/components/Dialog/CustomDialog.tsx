import CloseIcon from "@mui/icons-material/Close";

import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  useTheme,
} from "@mui/material";

import Button from "@components/Button/Button";
import Paragraph from "@components/Texts/Paragraph";
import { SIZE } from "@theme/sizeOptions";

interface IProperties {
  isOpen: boolean;
  closeDialog: () => void;
  title: string;
  children: React.ReactNode;
  onCloseIconClick?: () => void;
  buttonHandlers: Array<{
    text: string;
    autoFocus?: boolean;
    onClick: () => void;
  }>;
}
const CustomDialog = (props: IProperties) => {
  const theme = useTheme();

  return (
    <Dialog
      PaperProps={{ sx: { padding: "16px" } }}
      open={props.isOpen}
      onClose={props.closeDialog}
    >
      <Grid container alignItems="center">
        <Grid item>
          <Paragraph
            style={{
              fontWeight: theme.typography.h3.fontWeight,
              fontSize: SIZE.LARGE,
              margin: "0px 16px 0px 0px",
            }}
          >
            {props?.title}
          </Paragraph>
        </Grid>
        <Grid item marginLeft="auto">
          <CloseIcon
            fontSize="small"
            sx={{ color: theme.palette.grey[800], verticalAlign: "super" }}
            onClick={() => {
              props?.onCloseIconClick && props?.onCloseIconClick();
              props.closeDialog();
            }}
          />
        </Grid>
      </Grid>
      <DialogContent>{props?.children}</DialogContent>
      <DialogActions>
        {props?.buttonHandlers.map((item) => (
          <Button
            key={item.text}
            autoFocus={item.autoFocus}
            text={item.text}
            onClick={item.onClick}
          />
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
