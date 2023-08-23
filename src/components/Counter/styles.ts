import styled from 'styled-components';
import { colors } from '../../colors';
import { typo } from '../../typo';
import { spaces } from '../../spaces';

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionButton = styled.button`
  background-color: ${colors.lightestColor};
  color: ${colors.darkestColor};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: solid 1px ${colors.lightGray};
  font-size: 32px;
  cursor: pointer;
`;

export const ValueHolder = styled.span`
  font-size: ${typo.large};
  color: ${colors.darkestColor};
  font-weight: bold;
  margin: 0 ${spaces.large};
`;