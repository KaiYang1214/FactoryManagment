/* eslint-disable react/prop-types */
import React from 'react';
import i18n from "i18next";
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';

import { Subtitle, TextValue } from '@/components/atoms/Common';
import * as Style from './style';

const TextInputSelector = ({ title, required, placeholder, onSearch, onChange, style, value, disabled, disableSuffix, children, opacity, color, fontWeight }) => {

  const handleSearch = () => {
    onSearch(value);
  };

  const handleOnChange = (val) => {
    onChange(val);
  };

  const textValueJsx = (textValue) => {
    if (Array.isArray(textValue)) {
      if (textValue.length > 0) {
        return (
          <Style.Container>
            {textValue.map((item) => <TextValue key={item}>{item}</TextValue>)}
          </Style.Container>
        );
      }
      return <TextValue color={color}>--</TextValue>;
    }
    if (value) {
      return <TextValue color={color} fontWeight={fontWeight}>{value}</TextValue>;
    }

    return <TextValue color={color}>--</TextValue>;
  };

  return (
    <Style.Container style={style}>
      {title && <Subtitle required={required} opacity={opacity}>{title}</Subtitle>}
      <Style.Block>
        {children || (
          !disabled ? (
            <Style.PJSearchContainer>
              <Style.PJSearch
                placeholder={placeholder}
                suffix={disableSuffix ? '' : <SearchOutlined style={{ fontSize: "16px", marginRight: "14px" }} />}
                onChange={(e) => handleOnChange(e.target.value)}
                value={value}
                onSearch={handleSearch}
              />
            </Style.PJSearchContainer>
          ) : textValueJsx(value)
        )}
      </Style.Block>
    </Style.Container>
  );
};

TextInputSelector.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

TextInputSelector.defaultProps = {
  required: false,
  placeholder: i18n.t("COMMON.PLEASE_INPUT"),
};

export default TextInputSelector;
