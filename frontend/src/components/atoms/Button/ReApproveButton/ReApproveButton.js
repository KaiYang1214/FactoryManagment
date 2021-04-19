/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import i18n from 'i18next';
import * as Style from './style';

const ReApproveButton = (prop) => (
  <Style.SearchButton {...prop}>
    {i18n.t('BUTTON.REAPPROVE')}
  </Style.SearchButton>
);

export default ReApproveButton;
