import styled from "styled-components";

const StyledParagraph = styled.p<{ $style: string | undefined }>`
  font-size: 17px;
  ${(props) => props.$style}
`;

interface ParagraphProps {
  text?: string;
  style?: string;
  children?: React.ReactNode;
}

const Paragraph = (props: ParagraphProps) => {
  return (
    <StyledParagraph $style={props.style}>
      {props.text || props.children}
    </StyledParagraph>
  );
};

export default Paragraph;
