import styled from 'styled-components';
import { colors } from '../../colors';
import { spaces } from '../../spaces';

export const ContentWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.overlayGray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div`
  background-color: ${colors.lightestColor};
  padding: ${spaces.base};
  width: 100%;
  min-height: 100%;
  
  @media (min-width: 48rem) {
    border-radius: 4px;
    min-height: 0;
    max-width: 28rem;
    max-height: 35rem;
    overflow: auto;
  }
`;