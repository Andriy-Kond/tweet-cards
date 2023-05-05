// Використовується в декількох місцях

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavLink = styled(NavLink)`
  &.active {
    color: #578ddd;
  }
`;
