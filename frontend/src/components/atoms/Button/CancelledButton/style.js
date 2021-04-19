import styled from 'styled-components';
import Button from '../Button';

export const ButtonStyle = styled(Button)`
&.ant-btn {
  padding: 5px 12px;
  background-color: #FF475F;
  min-width: 104px;
  height: 38px;
  border-radius: 4px;
  color: #FFF;
  border: 1px solid #FF475F;
  display: flex;
  align-items: center;
  justify-content: center;
}

&.ant-btn:hover {
  background-color: #FF5D72;
  color: #FFF;
  border: 1px solid #FF5D72;
}

&.ant-btn:active  {
  background-color: #FF475F;
  color: #FFF;
  border: 1px solid #FF475F;
}
`;
export const Icon = styled.img`
  width: 28px;
  height: 28px;
`;
