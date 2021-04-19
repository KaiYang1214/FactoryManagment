import React from 'react';
import PropTypes from 'prop-types';
import { LoadingContainer, LoadingBar } from './style';

const LoadingMask = ({ background, position }) => (
  <LoadingContainer background={background} position={position}>
    <LoadingBar>
      <span />
      <span />
      <span />
      <span />
      <span />
    </LoadingBar>
  </LoadingContainer>
);

export default LoadingMask;

LoadingMask.propTypes = {
  background: PropTypes.string,
  position: PropTypes.string,
};

LoadingMask.defaultProps = {
  background: '',
  position: '',
};
