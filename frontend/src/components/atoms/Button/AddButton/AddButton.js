/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import i18n from 'i18next';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';


import * as Style from './style';

const AddButton = (prop) => (
  <Tooltip title="New">
    <Style.SearchButton {...prop}>
      <PlusCircleOutlined style={{ fontSize: 14 }} />
      {i18n.t('BUTTON.ADD')}
    </Style.SearchButton>
  </Tooltip>
);

export default AddButton;
