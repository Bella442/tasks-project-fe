import { useEffect, useState } from "react";

import { Grid } from "@mui/material";

import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import { useJoinRoomMutation, useLeaveRoomMutation } from "./api/chatApi";

const Chat = () => {
  const [activeRoom, setActiveRoom] = useState<string>("");
  const [joinRoom] = useJoinRoomMutation();
  const [leaveRoom] = useLeaveRoomMutation();

  useEffect(() => {
    // Join the initial room
    // joinRoom(activeRoom);
    // return () => {
    //   // Leave the active room on unmount
    //   leaveRoom(activeRoom);
    // };
  }, [activeRoom, joinRoom, leaveRoom]);

  const handleRoomChange = (newRoom: string) => {
    leaveRoom(activeRoom); // Leave the current room
    setActiveRoom(newRoom); // Switch to the new room
    joinRoom(newRoom); // Join the new room
  };

  return (
    <Grid container display="flex" height="100%" spacing={2} width="100%">
      <Grid item>
        <ChatList activeRoom={activeRoom} handleRoomChange={handleRoomChange} />
      </Grid>
      {activeRoom && (
        <Grid item flex={1}>
          <ChatRoom activeRoom={activeRoom} />
        </Grid>
      )}
    </Grid>
  );
};

export default Chat;
