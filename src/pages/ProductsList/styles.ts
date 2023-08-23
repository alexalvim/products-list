import styled from 'styled-components';
import { spaces } from '../../spaces';

export const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${spaces.containerWidth};
  padding: ${spaces.large} ${spaces.base};
  width: 90%;
`;

export const MaintList = styled.ul`
  @media(min-width: 48rem) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: ${spaces.base};
    row-gap: ${spaces.base};

    > li {
      min-width: 0;
    }
  }
`;