/* eslint-disable no-confusing-arrow, arrow-body-style, no-underscore-dangle */
import React, { useState } from 'react';
import i18n from "i18next";
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { DownOutlined, UpOutlined, } from '@ant-design/icons';
import { compose, includes, toUpper, filter, getOr } from 'lodash/fp'

import { Subtitle, TextValue } from '@/components/atoms/Common';
import * as Style from './style';


const DropdownSelector = ({ title, required, data, placeholder, value, onChange, style, disabled, opacity }) => {
  const { Option } = Select;
  const [chipsetSelect, setChipsetSelect] = useState(false);
  const [keyword, setKeyword] = React.useState()

  const handleOnChange = (val) => {
    onChange(data.filter((item) => val.includes(item.id)));
  };

  const handleSearch = (val) => {
    setKeyword(val)
  }

  const renderItemName = (item) => {
    return `${item.nameA} / ${item.site}` || '--'
  };

  const textValueJsx = (textValue) => {
    if (Array.isArray(textValue) && textValue.length > 0) {
      return textValue.map((item) => <TextValue key={item.id}>{renderItemName(item)}</TextValue>);
    }
    return <TextValue>{renderItemName(value)}</TextValue>;
  };

  let _data = data

  if (keyword) {
    _data = filter(
      compose(
        includes(toUpper(keyword)),
        toUpper,
        getOr('', ['name'])
      )
    )(_data)
  }

  return (
    <Style.Container style={style}>
      {title && <Subtitle opacity={opacity} required={required}>{title}</Subtitle>}
      {
        disabled
          ? textValueJsx(value)
          : (
            <Style.AdvancedSearch
              mode="multiple"
              dropdownClassName="customDropdownMulti"
              placeholder={placeholder}
              value={value.map((o) => o.id)}
              onInputKeyDown={() => setChipsetSelect(true)}
              onFocus={() => setChipsetSelect(true)}
              onBlur={() => setChipsetSelect(false)}
              onSearch={handleSearch}
              onChange={handleOnChange}
              suffixIcon={chipsetSelect ? <UpOutlined /> : <DownOutlined />}
              showArrow
              filterOption={false}
            >
              {_data.map((item) => (
                <Option value={item.id} key={item.id}>{item.name || '--'}</Option>
              ))}
            </Style.AdvancedSearch>
          )
      }
    </Style.Container>
  );
};

DropdownSelector.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  required: PropTypes.bool,
  data: PropTypes.array,
  title: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.array,
  disabled: PropTypes.bool,
};

DropdownSelector.defaultProps = {
  required: false,
  placeholder: i18n.t("COMMON.PLEASE_SELECT"),
  data: [],
  title: '',
  onChange: () => { },
  style: {},
  value: [],
  disabled: false,
};

export default DropdownSelector;
