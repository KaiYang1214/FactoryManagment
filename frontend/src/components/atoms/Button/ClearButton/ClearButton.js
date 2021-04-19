/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import i18n from 'i18next';
import { ReloadOutlined } from '@ant-design/icons';

import * as Style from './style';

const ClearButton = (prop) => (
  <Style.ClearButton {...prop}>
    <ReloadOutlined style={{ marginRight: '16px', transform: "rotate(90deg)" }} />
    {i18n.t('BUTTON.CLEAR')}
  </Style.ClearButton>
);

export default ClearButton;
