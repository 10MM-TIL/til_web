import { ImageContainer } from './style';
import Image from 'next/image';

interface ProfileImageProps {
  url: string;
  id: number;
  selected: boolean;
  onClick: () => void;
}

const ProfileImage = ({ url, selected, onClick }: ProfileImageProps) => {
  return (
    <ImageContainer selected={selected} onClick={onClick}>
      <Image alt='img' src={url} width={100} height={100} priority={true} />
    </ImageContainer>
  );
};

export default ProfileImage;
