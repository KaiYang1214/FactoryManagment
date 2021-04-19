import styled, { keyframes } from 'styled-components';
import { Button, Card } from 'antd';

export const LoginBody = styled.div`
  padding-top: 33vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: #ddd;
`;

export const LoginContainer = styled(Card)`
&.ant-card {
  height: 206px;
  width: 367px;
  color: #fff;
  background-color: #3e4042;
  box-shadow: 0px 7px 19px 1px rgba(0, 0, 0, .4);
  border-radius: 6px;
  text-align: center;
  border: none;

  p {
    text-align: right;
  }
}

`;

export const LoginButton = styled.img`
  cursor: pointer;
  width: 47px;
  height: 47px;
`;

export const LoginText = styled.div`
  font-size: 18px;
  margin-right: 20px;
`;

export const LoginTitle = styled.img`
  display:block;
`;

export const LoginHeaderContainer = styled.div`
  margin-bottom: 30px;
`;

export const LoginTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const superAnimate = keyframes`
  0% { transform:rotate(0deg) scale(1); }
  50% { transform:rotate(1080deg) scale(0.1); }
  100% { transform:rotate(0deg) scale(1); }
`;


export const LoginNotice = styled.div`
  position:absolute;
  bottom:0;
  right:0;
  left:0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  padding:2.75vh 0;
  background-color:rgba(0,0,0,0.6);
`;

export const GitVersion = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-size: 12px;
  color: #fff;
  line-height: 18px;
  cursor: pointer;
  transform-origin: center;
  animation: ${(p) => (p.actived ? superAnimate : '')} 1s ease-in-out 1;

  @media (max-width: 1070px) {
    left:0;
    right:0;
    bottom:13vh;
    text-align:center;
    font-size:8px;
  }
`;

export const TempContainer = styled.div`
    top: 55%;
    width: 500px;
    position: absolute;
    text-align: center;
`;

export const TempFunctionBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

export const TempButton = styled(Button)`
    background-color: #fff;
    color: #3177D8;
    font-size: 16px;
    line-height: 21px;
    box-shadow: 3px 3px 6px #00000029;
    border: 2px solid #3177D8;
    border-radius: 5px;
    width: 150px;
    margin: 0 10px;
`;
