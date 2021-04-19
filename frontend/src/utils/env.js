const configText = '';

const defaultConfig = {
  serverUrl: 'https://cdmdataplatform-harlequin.southeastasia.cloudapp.azure.com/', // 產品化
  AAD_TENANT_ID: '47cd140f-79c2-4a12-8719-dc3952880628',
  AAD_CLIENT_ID: '893270fb-c38e-418e-8bbc-b897b5fbaac9',
  LOCOAL_REDIRECT_URI: 'http://localhost:8080/#/azure/callback',
  ENV: 'DEV',
};

// export default defaultConfig;
export default configText ? JSON.parse(configText) : defaultConfig;
