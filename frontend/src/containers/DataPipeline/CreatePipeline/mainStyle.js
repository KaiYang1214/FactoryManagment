import styled from "styled-components";

export const WisdomContainer = styled.div`
  overflow: auto;
  height: 100vh;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  & :not(:last-child) {
    margin-right: 8px;
  }
  button {
    color: #ffffff;
    background-color: #20a7c9;
    border-color: #20a7c9;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 4px;
    margin-right: 10px;
  }
`;

export const MainTitle = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #333333;
  padding: 10px;
`;
