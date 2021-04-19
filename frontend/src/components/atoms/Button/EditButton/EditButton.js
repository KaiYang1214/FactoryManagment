/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import i18n from 'i18next';
import { FormOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import * as Style from './style';

const EditButton = (prop) => (
  <Tooltip title="Edit">
    <Style.SearchButton {...prop}>
      <FormOutlined style={{ marginRight: '8px', fontSize: 14 }} />
      {i18n.t('BUTTON.EDIT')}
    </Style.SearchButton>
  </Tooltip>
);

export default EditButton;
