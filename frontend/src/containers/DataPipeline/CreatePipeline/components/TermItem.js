/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Button, List, Card } from 'antd';
import './TermItem.less';

const TermItem = ({ data, onSeeAlso }) => {
  return (
    <List.Item key={data.guid}>
      <Card
        onClick={() => (onSeeAlso ? onSeeAlso() : null)}
        bordered={false}
        hoverable={data.seeAlso}
        bodyStyle={{
          display: 'flex',
          alignItems: 'center',
          height: '250px',
          width: '200px',
          padding: '10px 20px',
        }}
      >
        <div className="itemWrapper">
          <div className="itemTitle" title={data.name}>
            {data.name}
          </div>
          <div className="itemsubTitle" title={data.qualifiedName}>
            ({data.qualifiedName})
          </div>
          <div className="itemContent ellipsis">
            <div title={data.longDescription}>
              <p>{data.longDescription}</p>
            </div>
          </div>
          {data.seeAlso ? (
            <Button
              size="small"
              type="link"
              style={{ alignSelf: 'flex-end' }}
              disabled={!data.seeAlso}
            >
              See Also
            </Button>
          ) : null}
        </div>
      </Card>
    </List.Item>
  );
};

TermItem.propTypes = {
  data: PropTypes.shape({}).isRequired,
  onSeeAlso: PropTypes.func,
};

TermItem.defaultProps = {
  onSeeAlso: () => null,
};

export default TermItem;
