import styled from 'styled-components';
import { spaces } from '../../spaces';
import { typo } from '../../typo';
import { colors } from '../../colors';

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: ${spaces.base} 0;
`;

export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: ${spaces.base};
`;

export const ContentHolder = styled.div`
  flex-grow: 1;

  > div {
    margin-bottom: ${spaces.base};
  }

  @media (min-width: 48rem) {
    display: flex;
    align-items: baseline;

    > div {
      flex: 1 1 0;
      margin-right: ${spaces.base};
    }
  }
`;

export const ProductLabel = styled.h3`
  font-size: ${typo.base};
  font-weight: normal;
  color: ${colors.darkestColor};
  margin-bottom: ${spaces.small};

  a {
    margin-left: ${spaces.tiny};
    color: ${colors.darkestColor};
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ProductPrice = styled.span`
  font-size: ${typo.small};
  font-weight: normal;
  color: ${colors.darkestColor};
  display: block;
  margin-bottom: ${spaces.small};
`;

export const TotalPrice = styled.span`
  font-size: ${typo.small};
  font-weight: bold;
  color: ${colors.darkestColor};
  display: block;
`;