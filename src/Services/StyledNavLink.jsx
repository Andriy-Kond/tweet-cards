import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavLink = styled(NavLink)`
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  position: relative;
  padding-top: 5px;
  padding-bottom: 5px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0px;

    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: #2196f3;

    transform: scale(0);
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::after,
  &:focus::after {
    transform: scale(1);
  }

  &.active {
    color: #2196f3;
  }

  &.active::after {
    transform: scale(1);
  }
`;
