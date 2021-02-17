import { message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import Footer from '@/components/Footer';
import type { LoginParamsType } from '@/services/login';
import { accountLogin } from '@/services/login';

import styles from './index.less';

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const token = await accountLogin({ ...values });

      if (token) {
        message.success('Connected Successfully');
        localStorage.setItem('token', token);
        await fetchUserInfo();
        goto();
      }
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
            </Link>
          </div>
          <div className={styles.desc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna aliquam gravida eu nulla
            amet dictum.
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: 'Connexion',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                disabled: submitting,
                loading: undefined,
                className: styles.submitButton,
                size: 'large',
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values as LoginParamsType);
            }}
          >
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  className: styles.input,
                }}
                placeholder="Email"
                rules={[
                  {
                    required: true,
                    message: 'username is required',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  className: styles.input,
                }}
                placeholder="Mot de passe"
                rules={[
                  {
                    required: true,
                    message: 'password is required',
                  },
                ]}
              />
            </>
          </ProForm>

          <Link to="/user/login" className={styles.forgetPassword}>
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
