import React, { useState } from 'react';
import i18n from "i18next";
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { DownOutlined, UpOutlined, } from '@ant-design/icons';

import { Subtitle, TextValue } from '@/components/atoms/Common';
import * as Style from './style';

const SingleDropdownSelector = ({ title, required, data, placeholder, value, onChange, style, disabled, titleStyle, opacity }) => {
  const { Option } = Select;
  const [chipsetSelect, setChipsetSelect] = useState(false);

  const handleOnChange = (val) => {
    onChange(data.find((item) => item.id === val));
  };

  const textValueJsx = (textValue) => {
    if (Array.isArray(textValue) && textValue.length > 0) {
      return textValue.map((item) => <TextValue key={item.id}>{item.name || '--'}</TextValue>);
    }
    return <TextValue>{value.name || '--'}</TextValue>;
  };

  return (
    <Style.Container style={style}>
      {title && <Subtitle required={required} style={titleStyle} opacity={opacity}>{title}</Subtitle>}
      {
        disabled
          ? textValueJsx(value)
          : (
            <Style.AdvancedSearch
              dropdownClassName="customDropdownMulti"
              placeholder={placeholder}
              value={value.id}
              onInputKeyDown={() => setChipsetSelect(true)}
              onFocus={() => setChipsetSelect(true)}
              onBlur={() => setChipsetSelect(false)}
              onChange={handleOnChange}
              suffixIcon={chipsetSelect ? <UpOutlined /> : <DownOutlined />}
              showArrow
            >
              {data.map((item) => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))}
            </Style.AdvancedSearch>
          )
      }
    </Style.Container>
  );
};

SingleDropdownSelector.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  required: PropTypes.bool,
  data: PropTypes.array,
  title: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
};

SingleDropdownSelector.defaultProps = {
  required: false,
  placeholder: i18n.t("COMMON.PLEASE_SELECT"),
  data: [],
  title: '',
  onChange: () => { },
  style: {},
  value: [],
  disabled: false,
};

export default SingleDropdownSelector;
