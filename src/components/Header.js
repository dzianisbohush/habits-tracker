import React, { useContext, useState } from 'react';
// @todo remove this css
import '../App.css';
import { Link } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import { fireAuth } from '../firebase';
import { UserContext } from '../utils/context';
import { CURRENT_DAY, EDIT } from '../constants/routes';

export const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { email } = useContext(UserContext);

  const showDrawer = () => {
    setIsOpenMenu(true);
  };
  const onCloseDrawer = () => {
    setIsOpenMenu(false);
  };

  const signOut = () => {
    fireAuth.signOut();
  };

  return (
    <>
      <div className="header-wrapper">
        {/* //@todo add gamburger menu icon instead of Menu word */}
        <Button onClick={showDrawer}>Menu</Button>
        {/* <p className='userEmail'>{email}</p> */}
        <button className="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
      <Drawer
        closable={false}
        placement="left"
        onClose={onCloseDrawer}
        visible={isOpenMenu}
      >
        <Link to={CURRENT_DAY} onClick={onCloseDrawer}>
          Current day page
        </Link>
        <Link to={EDIT} onClick={onCloseDrawer}>
          Edit page
        </Link>
      </Drawer>
    </>
  );
};
