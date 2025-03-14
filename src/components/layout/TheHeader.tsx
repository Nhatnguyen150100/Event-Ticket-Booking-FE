import React from 'react';
import Logo from '../icons/Logo';
import { useSelector } from 'react-redux';
import { IRootState } from '../../lib/store';

export default function TheHeader() {
  const { userData } = useSelector((state: IRootState) => state.user);

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="container flex justify-between items-center">
        <Logo />
        <div className="flex flex-row justify-end items-center space-x-3">
          {userData && (
            <div className="text-sm text-gray-500">
              Xin chào, {userData.name ?? userData?.email}
            </div>
          )}

          <button className="text-sm text-gray-500 hover:text-gray-600">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
