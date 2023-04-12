import { useState, useCallback } from 'react';
import { SetContainer } from './style';
import ProfileImage from '@/components/Atom/ProfileImage';
const IMAGE_SET = [
  { id: 1, url: require('@/assets/images/1.png') as string },
  { id: 2, url: require('@/assets/images/2.png') as string },
  { id: 3, url: require('@/assets/images/3.png') as string },
  { id: 4, url: require('@/assets/images/4.png') as string },
  { id: 5, url: require('@/assets/images/5.png') as string },
  { id: 6, url: require('@/assets/images/6.png') as string },
  { id: 7, url: require('@/assets/images/7.png') as string },
  { id: 8, url: require('@/assets/images/8.png') as string },
];

const ProfileImageSet = () => {
  const [selectedId, setSelectedId] = useState(1);
  const handleClick = useCallback((id: number) => {
    setSelectedId(id);
  }, []);
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
