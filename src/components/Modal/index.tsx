import { Box, ContentWrapper } from "./styles"

interface IModalProps {
  children: string | JSX.Element | JSX.Element[];
  isOpened: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpened, onClose }: IModalProps) => {
  if(!isOpened) {
    return null;
  }

  return (
    <ContentWrapper onClick={onClose}>
      <Box onClick={e => e.stopPropagation()}>
        {children}
      </Box>
    </ContentWrapper>
  )
}