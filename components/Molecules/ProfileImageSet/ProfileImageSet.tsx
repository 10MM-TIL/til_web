import { useState, useCallback } from 'react';
import { SetContainer } from './style';
import ProfileImage from '@/components/Atom/ProfileImage';
const IMAGE_SET = [
  { id: 1, url: require('@/assets/images/profile/1.png') as string },
  { id: 2, url: require('@/assets/images/profile/2.png') as string },
  { id: 3, url: require('@/assets/images/profile/3.png') as string },
  { id: 4, url: require('@/assets/images/profile/4.png') as string },
  { id: 5, url: require('@/assets/images/profile/5.png') as string },
  { id: 6, url: require('@/assets/images/profile/6.png') as string },
  { id: 7, url: require('@/assets/images/profile/7.png') as string },
  { id: 8, url: require('@/assets/images/profile/8.png') as string },
];

const ProfileImageSet = ({ onClick, id }: { onClick: (id: number) => void; id: number }) => {
  const [selectedId, setSelectedId] = useState(id);
  const handleClick = useCallback(
    (id: number) => {
      onClick(id);
      setSelectedId(id);
    },
    [onClick],
  );
  return (
    <SetContainer>
      {IMAGE_SET.map((value) => (
        <ProfileImage
          key={value.id + value.url}
          id={value.id}
          selected={selectedId === value.id}
          url={value.url}
          onClick={() => handleClick(value.id)}
        />
      ))}
    </SetContainer>
  );
};

export default ProfileImageSet;
