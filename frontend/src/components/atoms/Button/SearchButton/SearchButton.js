/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import i18n from 'i18next';
import { SearchOutlined } from '@ant-design/icons';

import * as Style from './style';

const SearchButton = (prop) => (
  <Style.SearchButton {...prop}>
    <SearchOutlined style={{ marginRight: '16px' }} />
    {i18n.t('BUTTON.SEARCH')}
  </Style.SearchButton>
);

export default SearchButton;
