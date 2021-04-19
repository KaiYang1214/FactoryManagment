import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Button } from 'antd';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Kanit');
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: black;
  perspective: 500px;  
  background-image: url(${(props) => props.bgImg});
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const LoginTitle = styled.img`
  display:block;
`;

export const Inner = styled.div`
  border-radius: 6px;
  border: 1px solid lightgreen;
  padding: 10px;
  color: lightgreen;
  background: white;
  h2 {
    color: lightgreen;
  }
  position: relative;
  z-index: 100;
`;

export const JWTContain = styled.div`
  width: 200px;
  height: 16px;
  font-size: 12px;
  line-height:16px;
  overflow-x: hidden;
`;

export const SB = styled.div`
  margin-bottom: 10px;
`;

export const PixelTitle = styled.h2``;

export const Layer = styled.div`
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0%;
  left: -50%;
  z-index: 1;
  transform-origin: center;
  animation: hymanrotate 20s linear infinite;
`;

export const GoBtn = styled.div`
  margin-top: 10px;
  background: black;
  border: 1px solid lightgreen;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

export const SubmitBtn = styled(Button)`
  margin-top: 10px;
  background: black;
  border: 1px solid lightgreen;
  width: 100%;
  text-align: center;
  cursor: pointer;
  color: white;
`;

export const PixelInput = styled.input`
  outline-color: #e7e7e7;   
  padding: 0.5rem 1rem;
  margin-top: 15px;
  margin-left: 2%;
  border: none;
  width: 96%;    
`;

export const PixelBtn = styled.button`
  border-size: 4px;
  position: relative;
  display: inline-block;
  padding: 10px 12px;
  margin-top: 10px;
  margin-left: 2%;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  color: #fff;
  background-color:  #a99221;
  box-shadow: inset -4px -4px #7b5720;
  width: 96%;
  margin-top:10px;
  &:hover,
  &:focus {
    background-color: #8c7819;
    box-shadow: inset -6px -6px #7b5720;
  }

  &:active {
    box-shadow: inset 4px 4px #7b5720;
  } 
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

export const Container = styled.div`
  font-family: 'Kanit', cursive; 
  padding: 0.7rem 2rem;  
  color: #a7a7a7d9;

  h1 {
    color: #dcdcdcd9;
    margin-bottom: 0.2em;
  }

  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    color: #333333;
    background: #a99221;
    border-color: #dcdcdcd9;
    border-bottom: 1px solid #fff;
  }
`;

export const Content = styled.div`
  margin-left: 30px;
  color: #dcdcdcd9;
  margin-bottom: 0.2em;
`;

export const TempContainer = styled.div`
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
