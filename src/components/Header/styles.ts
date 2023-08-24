import styled from 'styled-components';
import { colors } from '../../colors';
import { spaces } from '../../spaces';
import { typo } from '../../typo';
import { Link } from 'react-router-dom';

export const ContentWrapper = styled.header`
  background-color: ${colors.mainColor};
  color: ${colors.lightestColor};
`;

export const ContentHolder = styled.div`
  margin: 0 auto;
  max-width: ${spaces.containerWidth};
  padding: ${spaces.base} ${spaces.small};
  width: 90%;
  display: flex;
  align-items: baseline;
`;

export const HeaderTitle = styled.h1`
  font-size: ${typo.largest};
  font-weight: bold;
  display: inline-block;
  flex-grow: 1;
`;

export const CustomLink = styled(Link)`
  color: ${colors.lightestColor};
  font-size: ${typo.base};
  display: inline-block;
`;