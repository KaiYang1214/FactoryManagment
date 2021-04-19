/* eslint-disable react/jsx-props-no-spreading */
import React, { Component, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import useModal from '@/hooks/useModal';

import TopBar from "@/components/compos/TopBar";
import SideMenu from '@/components/compos/SideMenu';

import * as Style from "./style";

const Demo = (props) => {
  return (
    <div style={{ backgroundColor: '#333', display: 'flex', padding: '0', height: '100vh', width: '100%', flexWrap: 'wrap' }}>
      <TopBar path="/app/Demo" />
    </div>
  );
};

export default Demo;
