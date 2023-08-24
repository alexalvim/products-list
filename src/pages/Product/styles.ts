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

export const ContentHolder = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 48rem) {
    flex-direction: row;
  }
`;

export const ProductImage = styled.img`
  height: 280px;
  width: 280px;
  object-fit: contain;
  margin: 0 auto ${spaces.base} auto;

  @media(min-width: 48rem) {
    margin: 0 ${spaces.large} 0 0;
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

export const ButtonsWrapper = styled.div`
  margin-top: ${spaces.base};
`;

export const ActionButtons = styled.div`
  margin-top: ${spaces.large};

  > button {
    margin-right: ${spaces.base};
    margin-bottom: ${spaces.base};

    &:last-child {
      margin-right: 0;
    }
  }
`;


export const ActionMessage = styled.span`
  margin-top: ${spaces.large};
  display: block;
  font-size: ${typo.base};
  color: ${colors.darkestColor};
`;
