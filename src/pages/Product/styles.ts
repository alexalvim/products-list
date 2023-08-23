import styled from 'styled-components';
import { spaces } from '../../spaces';
import { typo } from '../../typo';
import { colors } from '../../colors';
import { Link } from 'react-router-dom';

export const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${spaces.containerWidth};
  padding: ${spaces.large} ${spaces.base};
  width: 90%;
`;

export const ContentHolder = styled.div`
  display: flex;
`;

export const ProductImage = styled.img`
  height: 280px;
  width: 280px;
  object-fit: contain;
  margin-bottom: ${spaces.base};

  @media(min-width: 48rem) {
    margin-bottom: 0;
    margin-right: ${spaces.large};
  }
`;

export const ProductTitle = styled.h2`
  font-weight: bold;
  font-size: ${typo.large};
  color: ${colors.darkestColor};
  margin-bottom: ${spaces.base};
`;

export const ProductPrice = styled.span`
  color: ${colors.darkestColor};
  display: block;
  font-size: ${typo.small};
  font-weight: normal;
  margin-bottom: ${spaces.base};

  b {
    font-size: ${typo.base};
    font-weight: bold;
  }
`;

export const BackLink = styled(Link)`
  color: ${colors.mainColor};
  font-size: ${typo.base};
  display: inline-block;
  margin-bottom: ${spaces.base};
`;
