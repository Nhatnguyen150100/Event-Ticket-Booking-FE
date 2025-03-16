import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, Button, message } from 'antd';
import Logo from '../icons/Logo';
import { IRootState } from '../../lib/store';
import { EEventType } from '../../types/event.types';
import ExtractNameEventType from '../../utils/extract-name-event-type';
import { ILogin } from '../../types/auth.tyes';
import authService from '../../services/authService';
import { setUser } from '../../lib/reducer/userSlice';
import cookiesStore from '../../plugins/cookiesStore';
import { TOKEN_KEY } from '../../constants/token-key';
import {
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Theme } from '../../constants/theme';
import toKebabCase from '../../utils/to-kebap-case';

export default function TheHeader() {
  const { userData } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    dispatch(setUser(undefined));
    cookiesStore.remove(TOKEN_KEY.ACCESS_TOKEN);
  };

  const switchToRegister = () => {
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  };

  const switchToLogin = () => {
    setOpenRegisterModal(false);
    setOpenLoginModal(true);
  };

  const handleLogin = async (values: ILogin) => {
    try {
      setLoading(true);
      const response = await authService.login(values);
      message.success('Đăng nhập thành công');
      setOpenLoginModal(false);
      dispatch(setUser(response.data.user));
      cookiesStore.set(TOKEN_KEY.ACCESS_TOKEN, response.data.accessToken);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values: any) => {
    try {
      setLoading(true);
      const response = await authService.register(values);
      message.success(response.message);
      setOpenRegisterModal(false);
      switchToLogin();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  const renderAuthModalHeader = () => (
    <div className="flex flex-col items-center mb-6">
      <Logo />
      <h2 className="text-2xl font-bold mt-2">Event Booking</h2>
    </div>
  );

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="container flex justify-between items-center py-4">
        <div className="flex items-center gap-3">
          <Logo />
          <h3 className="font-semibold text-2xl flex items-center gap-2">
            <span className="text-[#061c4d]">Event</span>
            <span className="text-gray-800">Booking</span>
          </h3>
        </div>

        <div className="flex items-center gap-4">
          {userData ? (
            <>
              <div className="flex items-center gap-2 text-gray-600 hover:text-[#061c4d] transition-colors">
                <UserOutlined className="text-lg" />
                <span className="font-medium">
                  Xin chào, {userData.name ?? userData.email}
                </span>
              </div>
              <Button
                type="link"
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500"
              >
                <LogoutOutlined />
                <span>Đăng xuất</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                type="link"
                onClick={() => setOpenLoginModal(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
              >
                <LoginOutlined className="text-lg" />
                <span className="font-medium">Đăng nhập</span>
              </Button>
              <Button
                type="primary"
                onClick={() => setOpenRegisterModal(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <UserAddOutlined className="text-lg" />
                <span className="font-medium">Đăng ký</span>
              </Button>
            </>
          )}
        </div>
      </div>

      <nav className={`w-full bg-[${Theme.primary}]`}>
        <div className="container flex items-center gap-6 py-3">
          <a href="/" className="text-sm text-white hover:text-blue-200">
            Trang chủ
          </a>
          {Object.values(EEventType).map((type) => (
            <a
              key={type}
              href={`/${toKebabCase(type)}`}
              className="text-sm text-white hover:text-blue-200 transition-colors duration-200"
            >
              {ExtractNameEventType(type)}
            </a>
          ))}
        </div>
      </nav>

      <Modal
        title={null}
        open={openLoginModal}
        onCancel={() => setOpenLoginModal(false)}
        footer={null}
        destroyOnClose
      >
        {renderAuthModalHeader()}
        <Form form={loginForm} onFinish={handleLogin} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input placeholder="Nhập địa chỉ email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng nhập
          </Button>
        </Form>

        <div className="mt-4 text-center">
          Chưa có tài khoản?{' '}
          <Button type="link" onClick={switchToRegister} className="p-0">
            Đăng ký ngay
          </Button>
        </div>
      </Modal>

      <Modal
        title={null}
        open={openRegisterModal}
        onCancel={() => setOpenRegisterModal(false)}
        footer={null}
        destroyOnClose
      >
        {renderAuthModalHeader()}
        <Form form={registerForm} onFinish={handleRegister} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input placeholder="Nhập địa chỉ email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng ký
          </Button>
        </Form>

        <div className="mt-4 text-center">
          Đã có tài khoản?{' '}
          <Button type="link" onClick={switchToLogin} className="p-0">
            Đăng nhập ngay
          </Button>
        </div>
      </Modal>
    </div>
  );
}
