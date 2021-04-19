/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

const SelectableButton = ({
  value,
  darkColor,
  lightColor,
  selected,
  onClick,
  children,
  disabled,
}) => {
  return (
    <Style.selectableButton
      role="button"
      tabIndex="0"
      onClick={() => !disabled && onClick(value)}
      style={
        selected
          ? {
              color: lightColor,
              backgroundColor: darkColor,
            }
          : {
              color: darkColor,
              backgroundColor: lightColor,
            }
      }
    >
      {children}
    </Style.selectableButton>
  );
};

SelectableButton.propTypes = {
  id: PropTypes.string,
  darkColor: PropTypes.string,
  lightColor: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

SelectableButton.defaultProps = {
  id: undefined,
  darkColor: undefined,
  lightColor: undefined,
  selected: false,
  onClick: () => null,
  disabled: false,
};

export default SelectableButton;
