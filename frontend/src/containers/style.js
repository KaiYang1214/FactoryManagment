import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Floating = styled.div`
  position: fixed;
  right: 24px;
  bottom: 25px;
  background: transparent;
`;

export const FeedbackBtn = styled.button`
  position: fixed;
  height:64px;
  width:64px;
  right: 15px;
  bottom: 15px;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
`;

export const Body = styled.div`
  background: #EBEBEB 0% 0% no-repeat padding-box;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  background-color: #808080;
  height: 64px;
  color: white;
  display: flex;
  justify-content:space-between;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  overflow-y: hidden;
`;

export const Logo = styled.div`
  display: flex;
  margin-left: 20px;
  padding: 15px 0 2px 5px;
  > img {
    width: 90px;
    height: 25px;
  }
`;

export const User = styled.div`
  display: flex;
  flex: 7;
`;
