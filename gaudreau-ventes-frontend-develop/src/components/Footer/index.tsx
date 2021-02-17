import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';
import styles from './index.less';

export default () => (
  <DefaultFooter copyright="Gaudreau Assurances 2021" links={false} className={styles.footer} />
);
