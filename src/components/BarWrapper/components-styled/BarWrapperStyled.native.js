import styled from "styled-components";

export default styled.View`
  height: ${props => props.styleHeight}px;
  margin-top: 10px;
  opacity: ${props => (props.isDisabled ? "0.5" : "1")};
  overflow: hidden;
  position: relative;
  width: ${props => props.styleWidth}px;
`;
