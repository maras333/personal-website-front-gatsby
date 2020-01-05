import styled, { css } from 'react-emotion';
import { fontSize } from 'styled-system';
import colors from '../../utils/colors';

const buttonBasic = css`
  width: 100%;
  padding: 0.5rem 1.25rem;
  border-radius: 5px;
  border: 2px solid ${colors.secondary};
`;

const buttonPrimary = css`
  ${buttonBasic};
  background-color: ${colors.secondary};
  color: ${colors.secondary};
  transition: all 0.3s ease;

  &:hover {
    background-color: transparent;
    color: ${colors.primary};
    cursor: pointer;
  }
`;

const buttonSecondary = css`
  ${buttonBasic};
  background-color: transparent;
  color: ${colors.secondary};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
    cursor: pointer;
  }
`;

export const ButtonPrimary = styled.button`
  ${buttonPrimary} ${fontSize};
`;

export const ButtonSecondary = styled.button`
  ${buttonSecondary} ${fontSize};
`;

export default {
  ButtonPrimary,
  ButtonSecondary
};
