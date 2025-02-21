import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import { useAppSelector } from "@store/hooks/hooks";

import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import {
  useGetUnreadMessagesQuery,
  useListenForNotificationsQuery,
} from "./api/chatApi";
import { setUnreadMessages } from "./api/chatSlice";

const Chat = () => {
  const activeRoom = useAppSelector((state) => state.chat.activeRoom);
  const dispatch = useDispatch();
  const { data } = useGetUnreadMessagesQuery();

  useListenForNotificationsQuery();

  useEffect(() => {
    if (data) {
      data.forEach((room) => {
        dispatch(setUnreadMessages(room));
      });
    }
  }, [data, dispatch]);

  return (
    <Grid container display="flex" height="100%" spacing={2} width="100%">
      <Grid item>
        <ChatList />
      </Grid>
      {activeRoom && (
        <Grid item flex={1}>
          <ChatRoom />
        </Grid>
      )}
    </Grid>
  );
};

export default Chat;
