import styled from "styled-components";

export const StyledChatRoom = styled.div`
  height: 100%;
  /* width: 100%; */
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
`;

export const StyledTypeMessageContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
`;

export const StyledChatMessage = styled.div<{ $isCurrentUser: boolean }>`
  font-size: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isCurrentUser ? "flex-end" : "flex-start")};
`;

export const StyledParagraph = styled.p<{ $isCurrentUser: boolean }>`
  padding: 8px 16px;
  font-size: 16px;
  margin: 0px;
  border-radius: 24px;
  background-color: ${(props) =>
    props.$isCurrentUser ? "#061e35b0" : "#213547"};
  color: white;
  width: fit-content;
  max-width: 350px;
  text-align: left;
`;

export const StyledNameParagraph = styled.p`
  padding: 8px;
  font-size: 12px;
  font-weight: 700;
  margin: 0px;
  color: grey;
  width: fit-content;
`;
