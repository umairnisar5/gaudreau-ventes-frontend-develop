// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    siderWidth: 304,
    ...defaultSettings,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'success-color': '#49DC31',
    'error-color': '#E31313',
    'warning-color': '#F3C520',
    'font-family': 'Roboto, sans-serif',
    'code-family': "'Source Sans Pro', sans-serif",
    'text-color': 'rgba(23, 23, 23, 1)',
    'text-color-secondary': 'rgba(125, 125, 125, 1)',
    'link-color': 'rgba(23, 23, 23, 1)',
    'link-hover-color': defaultSettings.primaryColor,
    'link-active-color': defaultSettings.primaryColor,
    'link-decoration': 'underline',
    'link-hover-decoration': 'underline',
    'link-focus-decoration': 'underline',
    'link-focus-outline': '1px solid',
    'item-active-bg': '#F3F3F3',
    'item-hover-bg': '#F7F7F7',
    'btn-font-weight': '500',
    'layout-body-background': '##fff',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  define: {
    API_URL: process.env.API_URL || 'https://gaudreau-ventes.herokuapp.com/graphql/',
  },
  devServer: {
    port: 3000,
  },
});
