/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import i18n from 'i18next';
import cancelledIcon from '@/static/images/cancelled.svg';

import * as Style from './style';

const CancelledButton = (prop) => (
  <Style.ButtonStyle {...prop}>
    <Style.Icon src={cancelledIcon} />
    {i18n.t('BUTTON.CANCELLED')}
  </Style.ButtonStyle>
);

export default CancelledButton;
