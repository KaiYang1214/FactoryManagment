/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Subtitle } from '@/components/atoms/Common';
import * as Style from './style';

const BaseSelector = ({ title, required, style, children }) => (
  <Style.Container style={style}>
    {title && <Subtitle required={required}>{title}</Subtitle>}
    <Style.Block>
      {children}
    </Style.Block>
  </Style.Container>
);

BaseSelector.propTypes = {
  required: PropTypes.bool,
};

BaseSelector.defaultProps = {
  required: false,
};

export default BaseSelector;
