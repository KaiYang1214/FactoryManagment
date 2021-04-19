/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { Modal, Tooltip } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { PortWidget } from '@projectstorm/react-diagrams';
import SelectableButton from '../SelectableButton/SelectableButton';
import * as Style from './style';

export class TableNodeWidget extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    modalVisible: false,
    modalData: this.props.node.getOptions().payload || {},
    columns: this.props.node.getAllColumn(),
    errorMessage: undefined,
  };

  componentDidMount() {
    this.props.node.setValidate(this.validate);
  }

  openModal = data => {
    this.setState({ modalVisible: true, modalData: data });
  };

  closeModal = () => {
    this.setState({ modalVisible: false, modalData: undefined });
  };

  toggleColumn = (id, selected) => {
    const nextList = [].concat(this.state.columns);
    const columnIdx = this.state.columns.findIndex(col => col.guid === id);
    if (columnIdx !== -1) {
      const sel =
        selected !== undefined ? selected : !nextList[columnIdx].selected;
      nextList[columnIdx].selected = sel;
      this.setState({ columns: nextList });
      this.props.node.setAllColumn(nextList);
    }
  };

  preventDragHandler = e => {
    e.preventDefault();
  };

  validate = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const check = this.state.columns.filter(type => type.selected).length
      ? undefined
      : 'Select at least one column';
    this.setState({ errorMessage: check });
    return check;
  };

  generatePort = port => {
    const portCom = (
      <PortWidget engine={this.props.engine} port={port} key={port.getID()}>
        <Style.tablePort />
      </PortWidget>
    );
    const label = <div className="table-port-label" />;

    return (
      <Style.tablePortLabelContainer>
        {port.getOptions().in ? portCom : label}
        {port.getOptions().in ? label : portCom}
      </Style.tablePortLabelContainer>
    );
  };

  render() {
    return (
      <Tooltip title={this.state.errorMessage} color="#e04355">
        <Style.tableNode
          className={`
            ${this.state.errorMessage ? 'error' : ''}
            ${this.props.node.isSelected() ? 'selected' : ''}
        `}
          onDrop={this.preventDragHandler}
        >
          <Style.tableTitle>
            <Style.tableTitleName>
              {this.props.node.getOptions().name}
            </Style.tableTitleName>
            {!this.props.node.isLocked() && (
              <DeleteFilled onClick={() => this.props.node.remove()} />
            )}
          </Style.tableTitle>
          <Style.tablePortContainer>
            {this.props.node.getInPorts().map(port => this.generatePort(port))}
            {this.props.node.getOutPorts().map(port => this.generatePort(port))}
          </Style.tablePortContainer>
          <div className="table-col-wrapper">
            {this.state.columns.map(col => (
              <SelectableButton
                key={col.guid}
                value={col.guid}
                selected={col.selected}
                onClick={() => this.toggleColumn(col.guid)}
                darkColor="#20a7c9"
                lightColor="#d2edf4"
                disabled={this.props.node.isLocked()}
              >
                {col.name}
              </SelectableButton>
            ))}
          </div>
          <Modal
            visible={this.state.modalVisible}
            onCancel={this.closeModal}
            onOk={this.closeModal}
          >
            {JSON.stringify(this.state.modalData)}
          </Modal>
        </Style.tableNode>
      </Tooltip>
    );
  }
}
