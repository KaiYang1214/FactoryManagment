/* eslint-disable react/prop-types */
import React from 'react';
import i18n from "i18next";
import PropTypes from 'prop-types';

import { Subtitle } from '@/components/atoms/Common';
import * as Style from './style';

const DateSelector = ({ title, required, placeholder, onChange, style, titleStyle }) => (
  <Style.Container style={style}>
    {title && <Subtitle required={required} style={titleStyle}>{title}</Subtitle>}
    <Style.DateContainer>
      <Style.Picker onChange={onChange} placeholder={placeholder} />
    </Style.DateContainer>
  </Style.Container>
);

DateSelector.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

DateSelector.defaultProps = {
  required: false,
  placeholder: i18n.t("COMMON.PLEASE_SELECT_DATE"),
};

export default DateSelector;
