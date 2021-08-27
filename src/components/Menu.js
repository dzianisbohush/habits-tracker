import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { fireAuth } from '../firebase';
import { CalendarOutlined, BarChartOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import {CURRENT_DAY, DASHBOARD, EDIT} from '../constants/routes'

export const BottomMenu = () => {
    const history = useHistory();
    const [currentMenuItem, setCurrentMenuItem] = useState(CURRENT_DAY)
    const logoutKey = 'logoutButton'

    const handleMenuClick = e => {
        setCurrentMenuItem( e.key );

        switch (e.key) {
            case logoutKey:
                fireAuth.signOut();
                break;

            default:
                history.push(e.key)
                break;
        }
      };

      return (
        <Menu 
          onClick={handleMenuClick} 
          selectedKeys={[currentMenuItem]} 
          mode="horizontal"
        >
        <Menu.Item key={CURRENT_DAY} icon={<CalendarOutlined />} />
        <Menu.Item key={DASHBOARD} icon={<BarChartOutlined />} />
        <Menu.Item key={EDIT} icon={<EditOutlined />} />
        <Menu.Item key={logoutKey} icon={<LogoutOutlined />} />
      </Menu> 
      )
}