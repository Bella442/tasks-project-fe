import { useContext } from "react";

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
import { GlobalDialogContext } from "@contexts/globalDialogContext";
import { SIZE } from "@theme/sizeOptions";

const GlobalDialog = () => {
  const theme = useTheme();
  const { isOpen, closeDialog, dialogProps } = useContext(GlobalDialogContext);

  return (
    <Dialog
      PaperProps={{ sx: { padding: "16px" } }}
      open={isOpen}
      onClose={closeDialog}
    >
      <Grid container alignItems="center">
        <Grid item>
          <Paragraph
            style={`font-weight: ${theme.typography.h3}; font-size: ${SIZE.LARGE}; margin: 0px 16px 0px 0px;`}
          >
            {dialogProps?.title}
          </Paragraph>
        </Grid>
        <Grid item marginLeft="auto">
          <CloseIcon
            fontSize="small"
            sx={{ color: theme.palette.grey[800], verticalAlign: "super" }}
            onClick={closeDialog}
          />
        </Grid>
      </Grid>
      <DialogContent>{dialogProps?.content}</DialogContent>
      <DialogActions>
        {dialogProps?.buttonHandlers.map((item) => (
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

export default GlobalDialog;
