import React from 'react';
import { NavLink } from 'react-router-dom';

import colors from '~/styles/colors';

const LinkWrapper = props => {
  return <NavLink activeStyle={{ color: `${colors.darkGray}` }} {...props} />;
};
export default LinkWrapper;
