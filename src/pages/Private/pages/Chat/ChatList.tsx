import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { v4 as uuid } from "uuid";

import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";

import { useGetChatUsersQuery } from "@api/users/usersApi";
import CustomDialog from "@components/Dialog/CustomDialog";
import Paragraph from "@components/Texts/Paragraph";
import { useAppSelector } from "@store/hooks/hooks";

import AllUsersList from "./AllUsersList";
import {
  useCreateRoomMutation,
  useGetUserChatListQuery,
  useJoinRoomMutation,
} from "./api/chatApi";
import { setActiveRoom } from "./api/chatSlice";
import { Chat, ChatUser } from "./types";

const selectedItemColors = {
  backgroundColor: "#213547",
  color: "white",
};

const ChatList = () => {
  const theme = useTheme();
  const activeRoom = useAppSelector((state) => state.chat.activeRoom);
  const unreadMessages = useAppSelector((state) => state.chat.unreadMessages);
  const dispatch = useDispatch();
  const [newUserId, setNewUserId] = useState<string | null>(null);
  const [dialogOpened, setDialogOpened] = useState(false);
  const loggedUser = useAppSelector((state) => state.loggedUser.user);
  const { data: chatList, refetch: refreshChatList } =
    useGetUserChatListQuery();
  const { data: availableUsers } = useGetChatUsersQuery();
  const [createRoom] = useCreateRoomMutation();
  const [joinRoom] = useJoinRoomMutation();

  useEffect(() => {
    chatList?.forEach((chat) => {
      joinRoom(chat.roomId);
    });
  }, [chatList, joinRoom]);

  const mappedUsers = useMemo(() => {
    if (chatList?.length && availableUsers?.length) {
      const result = availableUsers?.filter((user) => {
        const conversationExists = chatList?.find(
          (chat) =>
            chat.initiatorUser.id === user.id ||
            chat.participantUser.id === user.id,
        );

        return !conversationExists;
      });

      return result;
    } else {
      return availableUsers;
    }
  }, [availableUsers, chatList]);

  const handleStartNewConversation = async () => {
    if (!newUserId || !loggedUser?.id) {
      return;
    }

    const newRoomId = uuid();

    await createRoom({
      roomId: newRoomId,
      initiatorId: loggedUser?.id,
      participantId: newUserId,
    });
    refreshChatList();
    setNewUserId(null);
    setDialogOpened(false);
  };

  const getParticipantName = (chat: Chat) => {
    return chat.initiatorUser.firstName !== loggedUser?.firstName
      ? chat.initiatorUser?.firstName
      : chat.participantUser?.firstName;
  };

  return (
    <Grid
      container
      boxShadow="1px 0px rgb(37 38 41 / 8%)"
      display="flex"
      flexDirection="column"
      height="100%"
      minWidth="300px"
      padding={2}
      sx={{ backgroundColor: "#393db51a" }}
    >
      <Grid item>
        <Paragraph style={{ fontWeight: "bold", fontSize: "20px" }}>
          {"Active Conversations"}
        </Paragraph>
      </Grid>
      <Divider />
      <Grid item display="flex" padding={1}>
        <ListItemButton onClick={() => setDialogOpened(true)}>
          <PersonAddIcon />
          <Paragraph
            style={{
              fontSize: theme.typography.fontSize,
              margin: "0px 8px",
              width: "fit-content",
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            Start new conversation
          </Paragraph>
        </ListItemButton>
      </Grid>
      <Divider />
      <Grid item>
        <List sx={{ width: "100%" }}>
          {chatList?.map((chat: Chat, index: number) => (
            <Fragment key={index}>
              <ListItem
                disablePadding
                style={
                  activeRoom === chat.roomId ? selectedItemColors : undefined
                }
              >
                <ListItemButton
                  color="primary"
                  onClick={() =>
                    chat.roomId !== activeRoom &&
                    dispatch(setActiveRoom(chat.roomId))
                  }
                >
                  <PersonIcon
                    color="primary"
                    style={
                      activeRoom === chat.roomId
                        ? selectedItemColors
                        : undefined
                    }
                    sx={{ marginRight: "16px" }}
                  />
                  <ListItemText primary={getParticipantName(chat)} />
                  {unreadMessages[chat.roomId] > 0 && (
                    <div
                      style={{
                        ...selectedItemColors,
                        width: "24px",
                        fontSize: theme.typography.fontSize,
                        fontWeight: theme.typography.fontWeightBold,
                        borderRadius: "50%",
                        textAlign: "center",
                      }}
                    >
                      {unreadMessages[chat.roomId]}
                    </div>
                  )}
                </ListItemButton>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Grid>
      {dialogOpened && (
        <CustomDialog
          buttonHandlers={[
            {
              autoFocus: true,
              text: "Start conversation",
              onClick: handleStartNewConversation,
            },
            {
              autoFocus: true,
              text: "Cancel",
              onClick: () => {
                setNewUserId(null);
                setDialogOpened(false);
              },
            },
          ]}
          closeDialog={() => setDialogOpened(false)}
          isOpen={dialogOpened}
          title="Start new conversation"
          onCloseIconClick={() => {
            setNewUserId(null);
          }}
        >
          <AllUsersList
            availableUsers={mappedUsers as Array<ChatUser>}
            newUser={newUserId}
            setNewUser={(userId) => setNewUserId(userId)}
          />
        </CustomDialog>
      )}
    </Grid>
  );
};

export default ChatList;
