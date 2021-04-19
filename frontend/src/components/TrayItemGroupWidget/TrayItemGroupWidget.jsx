import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

const TrayItemGroupWidget = ({ title, children }) => {
  return (
    <Style.trayGroup>
      <div className="tray-group-title">{title}</div>
      {children && <div className="tray-group-content">{children}</div>}
    </Style.trayGroup>
  );
};

TrayItemGroupWidget.propTypes = {
  title: PropTypes.string,
};

TrayItemGroupWidget.defaultProps = {
  title: '',
};

export default TrayItemGroupWidget;
