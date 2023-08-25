import styled from 'styled-components';
import { spaces } from '../../spaces';
import { typo } from '../../typo';
import { colors } from '../../colors';
import { Link } from 'react-router-dom';

export const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${spaces.containerWidth};
  padding: ${spaces.large} ${spaces.base};
  display: flex;
  justify-content: center;
  
  @media (min-width: 48rem) {
    width: 90%;
  }
`;


export const PageText = styled.h2`
  font-size: ${typo.base};
  color: ${colors.darkestColor};
  margin-bottom: ${spaces.small};
`;

export const PageLink = styled(Link)`
  font-size: ${typo.base};
  color: ${colors.mainColor};
  text-decoration: underline;
`;