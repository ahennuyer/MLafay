import { useState } from 'react';

export const useTogglePasswordVisibility = (): {passwordVisibility: boolean, rightIcon: string, handlePasswordVisibility: () => void} => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
  const [rightIcon, setRightIcon] = useState<string>('eye');

  const handlePasswordVisibility = (): void => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility
  };
};
