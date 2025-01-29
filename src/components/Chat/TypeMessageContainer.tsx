import { useState } from "react";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Button } from "@mui/material";

import InputField from "@components/Input/InputField";

import { StyledTypeMessageContainer } from "./Chatroom.style";

interface TypeMessageContainerProps {
  sendMessage: (message: string) => void;
}
const TypeMessageContainer = (props: TypeMessageContainerProps) => {
  const [text, setText] = useState("");

  const handleSendMessage = () => {
    props.sendMessage(text);
    setText("");
  };

  return (
    <StyledTypeMessageContainer>
      <InputField
        autoFocus
        endAdornment={
          <Button onClick={() => handleSendMessage()}>
            <SendRoundedIcon />
          </Button>
        }
        size="small"
        sx={{
          width: "100%",
          padding: "16px",
          "& .MuiOutlinedInput-root": {
            height: "48px",
            "& fieldset": {
              backgroundColor: "#393db51a",
              height: "48px",
              borderRadius: "4px",
            },
          },
        }}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
    </StyledTypeMessageContainer>
  );
};

export default TypeMessageContainer;
