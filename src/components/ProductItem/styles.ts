import styled from 'styled-components';
import { colors } from '../../colors';
import { spaces } from '../../spaces';
import { typo } from '../../typo';
import { Link } from 'react-router-dom';

export const ContentWrapper = styled.div`
  border: solid 1px ${colors.lightGray};
  border-radius: 4px;
  padding: ${spaces.base};
`;

export const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: ${spaces.base};
  width: 100%;
`;

export const ProductImage = styled.img`
  height: 140px;
  width: 140px;
  object-fit: contain;
`;

export const ProductLabel = styled(Link)`
  color: ${colors.darkestColor};
  display: block;
  font-size: ${typo.base};
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: ${spaces.small};
  text-decoration: none;
  height: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ProductPrice = styled.span`
  color: ${colors.darkestColor};
  display: block;
  font-size: ${typo.small};
  font-weight: normal;

  b {
    font-size: ${typo.base};
    font-weight: bold;
  }
`;

