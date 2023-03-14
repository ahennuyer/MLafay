import { useState } from 'react';

export const useTogglePasswordVisibility = (): {passwordVisibility: boolean, eye: string, handlePasswordVisibility: () => void} => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
  const [eye, setEye] = useState<string>('eye');

  const handlePasswordVisibility = (): void => {
    if (eye === 'eye') {
      setEye('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (eye === 'eye-off') {
      setEye('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    eye,
    handlePasswordVisibility
  };
};
