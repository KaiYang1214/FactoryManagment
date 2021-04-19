/* eslint-disable react/prop-types */
import React from 'react';
import i18n from "i18next";
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';

import { Subtitle, TextValue } from '@/components/atoms/Common';
import * as Style from './style';

const TextAreaSelector = ({ title, required, placeholder, onChange, style, value, disabled, textAreaStyle }) => {

  const handleOnChange = (val) => {
    onChange(val);
  };

  return (
    <Style.Container style={style}>
      {title && <Subtitle required={required}>{title}</Subtitle>}
      {
        !disabled ? (
          <Style.PJSearchContainer>
            <Style.PJSearch
              placeholder={placeholder}
              suffix={<SearchOutlined style={{ fontSize: "16px", marginRight: "14px" }} />}
              onChange={(e) => handleOnChange(e.target.value)}
              value={value || ''}
              style={textAreaStyle}
            />
          </Style.PJSearchContainer>
        ) : <TextValue style={{ width: '100%', height: '120px', alignItems: 'flex-start' }}>{value || '--'}</TextValue>
      }
    </Style.Container>
  );
};

TextAreaSelector.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

TextAreaSelector.defaultProps = {
  required: false,
  placeholder: i18n.t("COMMON.PLEASE_INPUT"),
};

export default TextAreaSelector;
