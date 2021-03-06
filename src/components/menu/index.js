import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  CalendarOutlined,
  BarChartOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { fireAuth } from '../../firebase';
import styles from './style.module.css';
import { CURRENT_DAY, DASHBOARD, EDIT } from '../../constants/routes';

export const BottomMenu = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [currentMenuItem, setCurrentMenuItem] = useState('');
  const logoutKey = 'logoutButton';

  useEffect(() => {
    switch (pathname) {
      case '/edit':
        setCurrentMenuItem(EDIT);
        break;
      case '/dashboard':
        setCurrentMenuItem(DASHBOARD);
        break;
      case '/current-day':
        setCurrentMenuItem(CURRENT_DAY);
        break;
      default:
        break;
    }
  }, []);

  const handleMenuClick = (e) => {
    setCurrentMenuItem(e.key);

    switch (e.key) {
      case logoutKey:
        fireAuth.signOut();
        break;

      default:
        history.push(e.key);
        break;
    }
  };

  return (
    <Menu
      className={styles.menu}
      onClick={handleMenuClick}
      selectedKeys={[currentMenuItem]}
      mode="horizontal"
    >
      <Menu.Item
        className={styles.menuItem}
        key={CURRENT_DAY}
        icon={<CalendarOutlined />}
      />
      <Menu.Item
        className={styles.menuItem}
        key={DASHBOARD}
        icon={<BarChartOutlined />}
      />
      <Menu.Item
        className={styles.menuItem}
        key={EDIT}
        icon={<EditOutlined />}
      />
      <Menu.Item
        className={styles.menuItem}
        key={logoutKey}
        icon={<LogoutOutlined />}
      />
    </Menu>
  );
};
