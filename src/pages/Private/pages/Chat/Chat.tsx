import { useEffect, useState } from "react";

import { Grid } from "@mui/material";

import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import { useJoinRoomMutation } from "./api/chatApi";

const Chat = () => {
  const [activeRoom, setActiveRoom] = useState<string>("");
  const [joinRoom] = useJoinRoomMutation();

  useEffect(() => {
    // Join the initial room
    if (activeRoom) {
      joinRoom(activeRoom);
    }
  }, [activeRoom, joinRoom]);

  const handleRoomChange = (newRoom: string) => {
    setActiveRoom(newRoom); // Switch to the new room
  };

  return (
    <Grid container display="flex" height="100%" spacing={2} width="100%">
      <Grid item>
        <ChatList
          activeRoom={activeRoom}
          handleRoomChange={handleRoomChange}
          setActiveRoom={setActiveRoom}
        />
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
