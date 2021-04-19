/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Button, Modal, List } from 'antd';
import { LeftOutlined, RightOutlined, StarFilled } from '@ant-design/icons';
import { useModal } from '@/hooks/';
import TermItem from './TermItem';

const TermTable = ({ termList, loading }) => {
  const detailModal = useModal();
  const ref = useRef();

  const scroll = scrollOffset => {
    ref.current.scrollLeft += scrollOffset;
  };

  const handleSeeAlso = item => {
    if (item.wikiUrls.length !== 0) detailModal.openModal(item);
  };

  return (
    <div className="subblock">
      <div
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex="0"
        className="toolicon"
        onClick={() => scroll(-200)}
      >
        <LeftOutlined />
      </div>
      <div className="termlist" ref={ref}>
        <List
          grid={{ gutter: 4 }}
          size="large"
          dataSource={termList}
          scroll={{ y: 300 }}
          pagination={false}
          renderItem={item => (
            <div
              style={{
                cursor: item.wikiUrls.length !== 0 ? 'pointer' : 'default',
              }}
            >
              <TermItem data={item} onSeeAlso={() => handleSeeAlso(item)} />
            </div>
          )}
          loading={loading}
        />
      </div>
      <div
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex="0"
        className="toolicon"
        onClick={() => scroll(200)}
      >
        <RightOutlined />
      </div>
      <Modal
        width={900}
        visible={detailModal.visible}
        bodyStyle={{
          maxHeight: '70vh',
          overflow: 'auto',
        }} // 高度自動,超過螢幕的70％就scroll
        title={`Wiki-${
          detailModal.modalData &&
          `${detailModal.modalData.name}(${detailModal.modalData.qualifiedName})`
        }`}
        destroyOnClose
        onCancel={detailModal.closeModal}
        footer={
          <Button type="primary" onClick={detailModal.closeModal}>
            Ok
          </Button>
        }
      >
        {detailModal.modalData && (
          <div>
            {detailModal.modalData.wikiUrls.map(url => (
              <a href={url}>
                <StarFilled /> {url}
              </a>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

TermTable.propTypes = {
  termList: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};

TermTable.defaultProps = {
  termList: [],
  loading: false,
};

export default TermTable;
