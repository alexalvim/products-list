import styled from 'styled-components';
import { colors } from '../../colors';
import { typo } from '../../typo';
import { spaces } from '../../spaces';

export const ModalTitle = styled.h2`
  color: ${colors.mainColor};
  font-size: ${typo.large};
  font-weight: bold;
  margin-bottom: ${spaces.base};
`;

export const FieldsWrapper = styled.div`
  margin-bottom: ${spaces.large};

  > * {
    margin-bottom: ${spaces.small};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const CustomSubmit = styled.input`
  background-color: ${colors.mainColor};
  border: none;
  color: ${colors.lightestColor};
  font-size: ${typo.base};
  border-radius: 2px;
  padding: ${spaces.small} ${spaces.base};
  cursor: pointer;
`;

export const SavingMessage = styled.span`
  color: ${colors.darkestColor};
  font-size: ${typo.base};
  display: block;
`