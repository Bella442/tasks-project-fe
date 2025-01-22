import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Grid, useTheme } from "@mui/material";

import { useOpenWebSocketConnectionQuery, ws } from "@api/shared/api";

import Button from "@components/Button/Button";
import InputField from "@components/Input/InputField";
import Bulb from "@components/StyledComponents/Bulb";
import PageTitle from "@components/Texts/PageTitle";
import Paragraph from "@components/Texts/Paragraph";

import { useSocket } from "@webSocket/useSocket";

const ServerCommunicationPage = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [message, setMessage] = useState("");
  const [rtkMessage, setRtkMessage] = useState("");
  const [lightOn, setLightOn] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  const socket = useSocket();

  const { data } = useOpenWebSocketConnectionQuery({
    params: "/raw",
    externalApiUrl: "ws.postman-echo.com",
  });

  useEffect(() => {
    // RTK Query webSocket connection response handler
    if (data && data?.length > 0) {
      alert(
        t("SERVER_COMMUNICATION_PAGE.ALERTS.SERVER_RESPONDED_WITH_{RESPONSE}", {
          response: data,
        }),
      );
    }
  }, [data, t]);

  // WebSocket server with static url
  useEffect(() => {
    if (serverResponse) {
      if (serverResponse !== "true" && serverResponse !== "false") {
        alert(
          t(
            "SERVER_COMMUNICATION_PAGE.ALERTS.SERVER_RESPONDED_WITH_{RESPONSE}",
            { response: serverResponse },
          ),
        );
      } else {
        setLightOn(serverResponse === "true");
      }
    }
  }, [serverResponse, t]);

  const sendMessageToServer = (msg: string) => {
    socket.send(msg);

    socket.onmessage = (event) => {
      setServerResponse(event.data);
    };

    socket.onerror = (error) => {
      console.error(error);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        alert(
          t("SERVER_COMMUNICATION_PAGE.ALERTS.CONNECTION_CLOSED_{REASON}", {
            reason: event.reason,
          }),
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert(t("SERVER_COMMUNICATION_PAGE.ALERTS.CONNECTION_DIED"));
      }
    };
  };

  const handleSend = () => {
    // Send message to RTK Query webSocket
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(rtkMessage);
    }
  };

  return (
    <Grid container flexDirection="column" spacing={2}>
      <Grid item>
        <PageTitle text={t("SERVER_COMMUNICATION_PAGE.TITLE")} />
      </Grid>
      <Grid container item flexDirection="column" spacing={2}>
        <Grid item>
          <Paragraph
            text={t("SERVER_COMMUNICATION_PAGE.LABELS.SERVER_MESSAGE")}
          />
        </Grid>
        <Grid item>
          <InputField
            style={{ width: "500px" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Grid>
        <Grid item marginBottom={2}>
          <Button
            text={t("SERVER_COMMUNICATION_PAGE.BUTTONS.SEND_MESSAGE")}
            onClick={() => sendMessageToServer(message)}
          />
        </Grid>
        <Grid
          container
          item
          justifyContent="center"
          style={{ backgroundColor: palette.primary.main }}
        >
          <Bulb
            isOn={lightOn}
            onClick={() => {
              sendMessageToServer(String(!lightOn));
            }}
          />
        </Grid>
      </Grid>
      <Grid container item flexDirection="column" spacing={2}>
        <Grid item>
          <Paragraph
            text={t("SERVER_COMMUNICATION_PAGE.LABELS.RTK_SOCKET_CONNECTION")}
          />
        </Grid>
        <Grid item>
          <InputField
            style={{ width: "500px" }}
            value={rtkMessage}
            onChange={(e) => setRtkMessage(e.target.value)}
          />
        </Grid>
        <Grid item marginBottom={2}>
          <Button
            text={t("SERVER_COMMUNICATION_PAGE.BUTTONS.SEND_MESSAGE")}
            onClick={handleSend}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ServerCommunicationPage;
