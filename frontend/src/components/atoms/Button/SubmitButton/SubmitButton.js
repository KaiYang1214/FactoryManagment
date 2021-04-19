/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import i18n from 'i18next';

import * as Style from "./style";

const SubmitButton = (prop) => (
  <Style.SearchButton {...prop}>{i18n.t('BUTTON.SUBMIT')}</Style.SearchButton>
);

export default SubmitButton;
