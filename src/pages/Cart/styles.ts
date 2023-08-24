import styled from 'styled-components';
import { spaces } from '../../spaces';
import { typo } from '../../typo';
import { colors } from '../../colors';
import { Link } from 'react-router-dom';

export const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${spaces.containerWidth};
  padding: ${spaces.large} ${spaces.base};
  
  @media (min-width: 48rem) {
    width: 90%;
  }
`;

export const EmptyMessage = styled.span`
  display: block;
  color: ${colors.darkestColor};
  font-size: ${typo.base};
`;

export const BackLink = styled(Link)`
  color: ${colors.mainColor};
  font-size: ${typo.base};
  display: inline-block;
  margin-bottom: ${spaces.base};
`;

export const CartList = styled.ul`
  > li {
    border-bottom: solid 1px ${colors.lightGray};
  }
`;

export const PurchaseLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${spaces.large};

  span {
    color: ${colors.darkestColor};
    font-size: ${typo.base};
    font-weight: bold;
  }
`;
