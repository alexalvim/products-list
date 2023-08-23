import styled from 'styled-components';
import { colors } from '../../colors';
import { typo } from '../../typo';
import { spaces } from '../../spaces';

export const CustomButton = styled.button`
  background-color: ${colors.mainColor};
  border: none;
  color: ${colors.lightestColor};
  font-size: ${typo.base};
  border-radius: 2px;
  width: 100%;
  padding: ${spaces.small} ${spaces.base};
  cursor: pointer;
`;