import styled from "styled-components";

interface PageTitleProps {
  text: string;
}

const StyledParagraph = styled.p`
  font-size: 22px;
  font-weight: 600;
`;

const PageTitle = (props: PageTitleProps) => {
  return <StyledParagraph>{props.text}</StyledParagraph>;
};

export default PageTitle;
