import styled from 'styled-components';
import { Spin } from 'antd';

export const LoadingContainer = styled.div`
  background: ${(props) => props.background};
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20000;
  display: flex;
  align-items: ${(props) => props.position};
  justify-content: center;
  user-select: none;
`;

export const LoadingSpin = styled(Spin)`
  position: fixed !important;
  left: 50% !important;
  top: 50% !important;
  z-index: 100000 !important;
  .ant-spin-dot-item{

  background-color:red;
  }
`;

export const LoadingBar = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 112px;
  width: 112px;
  background: #444444;
  border-radius: 8px;
  transform: translateX(-50%) translateY(-50%);

  span {
    position: absolute;
    left: 24px;
    display: block;
    bottom: 49px;
    width: 8px;
    height: 13px;
    background: rgba(0, 0, 0, 0.25);
    -webkit-animation: bars6 1.5s  infinite ease-in-out;
            animation: bars6 1.5s  infinite ease-in-out;
  }

  span:nth-child(2) {
    left: 38px;
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s;
  }

  span:nth-child(3) {
    left: 52px;
    -webkit-animation-delay: 0.4s;
            animation-delay: 0.4s;
  }

  span:nth-child(4) {
    left: 66px;
    -webkit-animation-delay: 0.6s;
            animation-delay: 0.6s;
  }

  span:nth-child(5) {
    left: 80px;
    -webkit-animation-delay: 0.8s;
            animation-delay: 0.8s;
  }

  @keyframes bars6 {
    0% {
      height: 13px;
      -webkit-transform: translateY(0px);
              transform: translateY(0px);
      -webkit-transform: translateY(0px);
              transform: translateY(0px);
      background: rgba(0, 0, 0, 0.25);
    }
    25% {
      height: 48px;
      -webkit-transform: translateY(15px);
              transform: translateY(15px);
      -webkit-transform: translateY(15px);
              transform: translateY(15px);
      background: #F5C910;
    }
    50% {
      height: 13px;
      -webkit-transform: translateY(0px);
              transform: translateY(0px);
      -webkit-transform: translateY(0px);
              transform: translateY(0px);
      background: rgba(0, 0, 0, 0.25);
    }
    100% {
      height: 13px;
      -webkit-transform: translateY(0px);
              transform: translateY(0px);
      -webkit-transform: translateY(0px);
              transform: translateY(0px);
      background: rgba(0, 0, 0, 0.25);
    }
  }

  @-webkit-keyframes bars6 {
    0% {
      height: 13px;
      -webkit-transform: translateY(0px);
              transform: translateY(0px);
      background: rgba(0, 0, 0, 0.25);
    }
    25% {
      height: 48px;
      -webkit-transform: translateY(15px);
              transform: translateY(15px);
      background: #F5C910;
    }
    50% {
      height: 13px;
      -webkit-transform: translateY(0px);
              transform: translateY(0px);
      background: rgba(0, 0, 0, 0.25);
    }
    100% {
      height: 13px;
      -webkit-transform: translateY(0px);
              transform: translateY(0px);
      background: rgba(0, 0, 0, 0.25);
    }
  }
`;
