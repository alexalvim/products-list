import styled from 'styled-components';
import { colors } from '../../colors';
import { spaces } from '../../spaces';
import { typo } from '../../typo';

export const ContentWrapper = styled.header`
  background-color: ${colors.mainColor};
  color: ${colors.lightestColor};
  padding: ${spaces.base} ${spaces.small};
`;

export const ContentHolder = styled.div`
  margin: 0 auto;
  max-width: ${spaces.containerWidth};
  width: 90%;
`;

export const HeaderTitle = styled.h1`
  font-size: ${typo.largest};
  font-weight: bold;
`;