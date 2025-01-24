import { useState } from "react";

import Button from "@components/Button/Button";
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
        size="small"
        sx={{
          width: "100%",
          marginRight: "16px",
          "& .MuiOutlinedInput-root": {
            height: "48px",
            "& fieldset": {
              backgroundColor: "#c952b31a",
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
      <Button
        style="height: 48px; background-color: #d1bbcd"
        text="Send"
        type="submit"
        onClick={() => handleSendMessage()}
      />
    </StyledTypeMessageContainer>
  );
};

export default TypeMessageContainer;
