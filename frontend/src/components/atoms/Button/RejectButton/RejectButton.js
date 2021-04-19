/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import i18n from 'i18next';

import * as Style from './style';

const RejectButton = (prop) => (
  <Style.ButtonStyle {...prop}>
    {i18n.t('BUTTON.REJECT')}
  </Style.ButtonStyle>
);

export default RejectButton;
