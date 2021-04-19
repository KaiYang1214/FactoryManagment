import styled from 'styled-components';

export const sqlDiagram = styled.div`
  display: flex;
  .tray {
    flex-basis: 20%;
    background-color: #333333;
    padding-top: 10px;
    overflow: hidden;
  }
  .layer {
    flex: 1;
    *[class*='ant-'] .css-18f0176 svg:not(:root) {
        overflow: unset !important;
      }
    .css-18f0176 svg:not(:root) {
        overflow: unset !important;
      }
    .css-18f0176 {
        height: 100vh;
        padding: 0;
        margin: 0;
        
        background-color: rgb(60, 60, 60) !important;
        background-size: 50px 50px;
        display: flex;
        background-image: linear-gradient(
        0deg,
        transparent 24%,
        rgba(255, 255, 255, 0.05) 25%,
        rgba(255, 255, 255, 0.05) 26%,
        transparent 27%,
        transparent 74%,
        rgba(255, 255, 255, 0.05) 75%,
        rgba(255, 255, 255, 0.05) 76%,
        transparent 77%,
        transparent
        ),
        linear-gradient(
        90deg,
        transparent 24%,
        rgba(255, 255, 255, 0.05) 25%,
        rgba(255, 255, 255, 0.05) 26%,
        transparent 27%,
        transparent 74%,
        rgba(255, 255, 255, 0.05) 75%,
        rgba(255, 255, 255, 0.05) 76%,
        transparent 77%,
        transparent
        );
      }
  }
  &.disabled {
    .tray {
      flex-basis: 0%;
    }
  }
`;

export const buttonTools = styled.div`
  background-color: #333333;
  display: flex;
  .ant-btn-text {
    color: white;
    background: transparent;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: transparent;
      color: white;
    }
    &:focus {
      background: transparent;
      color: white;
    }
  }
`;
