/* eslint-disable no-unused-vars */
import React from "react";
import i18n from "i18next";
import PropTypes from "prop-types";

import { Subtitle, TextValue } from "@/components/atoms/Common";
import * as Style from "./style";

const CascaderSelector = ({
  title,
  required,
  data,
  placeholder,
  value,
  onChange,
  style,
  disabled,
  expandTrigger,
}) => {
  const displayRender = (label) => label[label.length - 1];

  const handleOnChange = (val) => {
    onChange(val);
  };

  const textValueJsx = (textValue) => {
    if (Array.isArray(textValue) && textValue.length > 0) {
      return textValue.map((item) => <TextValue>{item || "--"}</TextValue>);
    }
    return <TextValue>{value || "--"}</TextValue>;
  };

  return (
    <Style.Container style={style}>
      {title && <Subtitle required={required}>{title}</Subtitle>}
      {disabled ? (
        textValueJsx(value)
      ) : (
        <Style.ErrorCascader
          options={data}
          value={value}
          expandTrigger={expandTrigger}
          onChange={handleOnChange}
          placeholder={placeholder}
          bordered={false}
        />
      )}
    </Style.Container>
  );
};

CascaderSelector.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  data: PropTypes.array,
  title: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.array,
  disabled: PropTypes.bool,
  expandTrigger: PropTypes.string,
};

CascaderSelector.defaultProps = {
  required: false,
  placeholder: i18n.t("COMMON.PLEASE_SELECT"),
  data: [],
  title: "",
  onChange: () => {},
  style: {},
  value: [],
  disabled: false,
  expandTrigger: "hover",
};

export default CascaderSelector;
