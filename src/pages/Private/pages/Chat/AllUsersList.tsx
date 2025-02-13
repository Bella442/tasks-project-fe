import { useContext, useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import { Grid, List, ListItem, ListItemButton } from "@mui/material";

import { GlobalDialogContext } from "@contexts/globalDialogContext";

import { ChatUser } from "./types";

interface IProperties {
  availableUsers: Array<ChatUser>;
  newUser: number | null;
  setNewUser: (userId: number | null) => void;
}
const AllUsersList = (props: IProperties) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const { setDialogValues } = useContext(GlobalDialogContext);

  useEffect(() => {
    if (selectedUser) {
      setDialogValues({ selectedUser });
    }
  }, [selectedUser, setDialogValues]);

  return (
    <Grid container display="flex" flexDirection="column" spacing={2}>
      <Grid item>
        <List sx={{ width: "100%" }}>
          {props.availableUsers?.map((user: ChatUser) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  setSelectedUser(user.id);
                }}
              >
                <PersonIcon sx={{ marginRight: "8px" }} />
                {`${user.firstName} ${user.lastName}`}
                {selectedUser === user.id && (
                  <CheckIcon sx={{ marginLeft: "8px" }} />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default AllUsersList;
