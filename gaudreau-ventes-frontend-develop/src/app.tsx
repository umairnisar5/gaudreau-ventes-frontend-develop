import React from 'react';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { queryCurrentUser } from '@/services/user';
import { ReactComponent as Icon } from '@/assets/icons/logout.svg';

import styles from './app.less';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const { data } = await queryCurrentUser();

      return data.currentUser;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };

  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  const handleLogout = () => {
    message.warn('Disconnected');
    localStorage.removeItem('token');
    history.push(`/user/login`);
  };
  return {
    className: styles.gaudrea,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    headerHeight: 64,
    siderWidth: 304,
    collapsedWidth: 190,
    menuFooterRender: () => (
      <div onClick={handleLogout} className={styles.logout}>
        <Icon /> <span>Déconnexion</span>
      </div>
    ),
    menuExtraRender: () => (
      <div className={styles.extraContent}>
        <p className={styles.menuExtraItemTitle}>Autres</p>
        <p className={styles.menuExtraItem}>Label</p>
        <p className={styles.menuExtraItem}>Exportateur de données</p>
      </div>
    ),
    logo: null,
    headerContentRender: () => (
      <Link className={styles.logoContainer} to="/">
        <img className={styles.logo} width="150px" alt="logo" src="/logo.svg" />
      </Link>
    ),
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    navTheme: 'light',
    headerTheme: 'light',
    ...initialState?.settings,
  };
};

export const request: RequestConfig = {};
