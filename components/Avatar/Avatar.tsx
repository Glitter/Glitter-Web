import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AvatarPropsInterface {
  picture?: string;
}

const Avatar: React.FC<AvatarPropsInterface> = ({ picture = '' }) => {
  if (picture === '') {
    return (
      <div className="h-10 w-10 flex rounded-lg items-center justify-center bg-gray-300 text-gray-800 shadow-inner">
        <FontAwesomeIcon icon={['fas', 'user']} size="lg" fixedWidth />
      </div>
    );
  }

  return (
    <div
      className="h-10 w-10 flex rounded-lg items-center justify-center bg-cover bg-white shadow-inner"
      style={{ backgroundImage: `url('${picture}')` }}
    />
  );
};

export default Avatar;
