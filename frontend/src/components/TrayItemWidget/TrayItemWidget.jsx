import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

const TrayItemWidget = ({ model }) => {
  return (
    <Style.trayItem
      title={model.name}
      color={model.color}
      draggable
      onDragStart={event => {
        event.dataTransfer.setData('diagram-node', JSON.stringify(model));
      }}
      style={{
        backgroundColor: model.color,
      }}
    >
      {model.name}
    </Style.trayItem>
  );
};

TrayItemWidget.propTypes = {
  model: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
    key: PropTypes.string,
  }),
};

TrayItemWidget.defaultProps = {
  model: {
    color: undefined,
    name: '',
    key: undefined,
  },
};

export default TrayItemWidget;
