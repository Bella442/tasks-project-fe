import { CSSProperties } from "react";

import styled from "styled-components";

const StyledParagraph = styled.p`
  font-size: 17px;
`;

interface ParagraphProps {
  text?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

const Paragraph = (props: ParagraphProps) => {
  return (
    <StyledParagraph style={props.style}>
      {props.text || props.children}
    </StyledParagraph>
  );
};

export default Paragraph;
