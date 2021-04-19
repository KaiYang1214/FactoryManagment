/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import i18n from 'i18next';

import * as Style from './style';

const CancelButton = (prop) => (
  <Style.SearchButton {...prop}>
    {i18n.t('BUTTON.CANCEL')}
  </Style.SearchButton>
);

export default CancelButton;
