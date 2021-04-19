import baseConfig from './app.base.config';

const config = {
  ...baseConfig,
  version: process.env.VERSION || '(1.0.0-default)',
  gaTrackingId: 'UA-174558213-2',
  serverUrl: 'https://wisdom-dataplatform-atlas.southeastasia.cloudapp.azure.com',
  MATOMO_URL_BASE: 'https://matomoapp.wistron.com/',
  MATOMO_SITE_ID: 17,
};

export default config;
