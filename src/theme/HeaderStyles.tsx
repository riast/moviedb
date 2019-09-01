import React from 'react';
import { LogoTitle } from '../components/LogoTitle';

export const HeaderStyle = {
  headerStyle: {
    height: 70,
  },
};

export const HeaderStyleWithLogo = {
  ...HeaderStyle,
  headerLeft: <LogoTitle />,
};
