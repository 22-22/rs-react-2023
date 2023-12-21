import { useEffect, useState } from 'react';
import { errorTextForTest } from '../constants';

const ErrorTestButton = () => {
  const [error, setError] = useState('');

  const handleClick = () => {
    setError(errorTextForTest);
  };

  useEffect(() => {
    if (error === errorTextForTest) {
      throw new Error(errorTextForTest);
    }
  }, [error]);
  return (
    <button type="button" onClick={handleClick}>
      Test
    </button>
  );
};

export default ErrorTestButton;
