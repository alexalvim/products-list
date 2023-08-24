import styled from 'styled-components';
import { typo } from '../../typo';
import { colors } from '../../colors';
import { spaces } from '../../spaces';

export const ContentWrapper = styled.label`
  display: block;
`;

export const TextLabel = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: ${typo.small};
  color: ${colors.darkestColor};
  margin-bottom: ${spaces.tiny};
`;

export const CustomInput = styled.input`
  display: block;
  font-size: ${typo.base};
  color: ${colors.darkestColor};
  padding: ${spaces.tiny};
  width: 100%;
  margin-bottom: ${spaces.tiny};
`;

export const ErrorMessage = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: ${typo.small};
  color: ${colors.dangerRed};
`;