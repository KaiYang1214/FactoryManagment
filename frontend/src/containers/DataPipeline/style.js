import styled from 'styled-components';

export const Body = styled.div`
  background-color: #EBEBEB;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
`;

export const workspaceContainer = styled.div`
  background-color: white;
  height: 100%;
  display: flex;
  width: 100%;
  overflow: auto;
`;

export const etlList = styled.div`
  flex-basis: 25%;
  height: 100%;
  background-color: #333;
  transition: all .1s ease-in;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  flex-shrink: 0;
  .ant-list {
    max-height: 400px;
    transition: color .3s ease;
    overflow-y: scroll;
    color: rgba(0, 0, 0, 0);
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 0 10px;
    }
    &::-webkit-scrollbar, &::-webkit-scrollbar-thumb {
      width: 26px;
      border-radius: 13px;
      background-clip: padding-box;
      border: 10px solid transparent;
    }
    .listItem {
      position: relative;
      color: #cfd8dc;
      padding: 8px 18px;
      cursor: pointer;
      transition: all .1s ease-in;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      &:hover, &.curr {
        background-color: #4d4d4d;
      }
      &.curr:before {
        content: '';
        display: block;
        width: 3px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #20a7c9;
      }
      p {
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      span {
        font-size: 12px;
        color: #8E8E8E;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .ant-list-empty-text {
      color: #cfd8dc;
      text-align: left;
    }
    svg {
      width: 90px;
    }
    ul {
      background-color: #333333;
      border-right: 1px solid #333333;
      li {
        background-color: #333333;
        border-right: 1px solid #333333;
      }
    }
    .ant-menu-submenu-title {
      .ant-menu-submenu-arrow::before {
        content: '';
        background-image: linear-gradient(to right, #fff, #fff);
       }
      .ant-menu-submenu-arrow::after {
       content: '';
       background-image: linear-gradient(to right, #fff, #fff);
      }
    }
    .ant-menu-item {
      margin: 0;
      color: #cfd8dc;
    }
`;

export const listTitle = styled.div`
  color: #879399;
  padding: 20px 18px 0;
  .ant-divider {
    border-color: #879399;
    margin: 8px 0 12px 0;
  }
`;

export const etlDetail = styled.div`
  flex: 1;
  min-width: 0;
  overflow: auto;
  .ant-spin-nested-loading {
    height: 100%;
  }
  .ant-result-info .ant-result-icon > .anticon {
    color: @brand-primary-light3;
  }
`;

export const etlHeader = styled.div`
box-shadow: rgba(9, 30, 66, 0.08) 0px 5px 7px;
display: flex;
padding: 10px;
.left {
  flex: 1;
  min-width: 0;
  .title {
    font-size: 18px;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    display: inline-block;
    .ant-progress {
      display: inline-flex;
      margin-left: 5px;
    }
  }
  p {
    font-size: 14px;
    color: #879399;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.right {
  display: flex;
  align-items: center;
}
`;

export const etlInfoDetailContainer = styled.div`
  display: flex;
  .edit-info {
    margin-left: 40px;
  }
`;

export const etlContent = styled.div`
  padding: 15px;
  .toolbutton {
    display: flex;
    justify-content: flex-end;
  }
`;

export const cronSelect = styled.div`
  display: flex;
  align-items: center;
`;

export const cronSelectText = styled.div`
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 24px;
`;
