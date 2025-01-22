import styled from "styled-components";

const StyledBulb = styled.div<{ $isOn: boolean }>`
  position: relative;
  width: 150px;
  height: 150px;
  float: left;
  background: url(https://lh4.googleusercontent.com/-katLGTSCm2Q/UJC0_N7XCrI/AAAAAAAABq0/6GxNfNW-Ra4/s300/lightbulb.png)
    no-repeat right 0;
  z-index: 800;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    background-position: 0 0;
    transition: all 0.5s;
    opacity: ${(props) => (props.$isOn ? " 1" : "0")};
  }
`;

interface BulbProps {
  isOn: boolean;
  onClick?: () => void;
}

const Bulb = (props: BulbProps) => {
  return <StyledBulb $isOn={props.isOn} onClick={props.onClick} />;
};

export default Bulb;
