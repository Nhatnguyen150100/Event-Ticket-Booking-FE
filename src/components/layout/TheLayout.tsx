import { Outlet } from 'react-router-dom';
import TheHeader from './TheHeader';

export default function TheLayout() {
  return (
    <div className='w-full flex flex-col justify-start items-center'>
      <TheHeader />
      {<Outlet />}
    </div>
  );
}
