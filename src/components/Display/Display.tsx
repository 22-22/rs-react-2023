import { FC } from 'react';
import { Person } from '../../types';
import { noResultsText } from '../../constants';

interface DisplayProps {
  data: Person[];
}
const Display: FC<DisplayProps> = ({ data }) => {
  return (
    <>
      {data.length === 0 ? (
        <p>{noResultsText}</p>
      ) : (
        <ul>
          {data.map(({ id, firstName, email }) => (
            <li key={id}>
              {firstName}: {email}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Display;
