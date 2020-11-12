// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  version: '0.0.1',
  build: 1,
  apiBaseUrl: 'https://api.gencart.iospot.top/v1',
  apiProxy: '',
  platform: 'seller',
  googleClientId: '946463315327-0l0svqeglss2jrulg19t9hs5slem6247.apps.googleusercontent.com',
  facebookAppId: '268992427128066',
  stripeKey: 'pk_test_Z3rf3HSfsokHl4lLFTBxhZrZ',
  paymentRedirectSuccessUrl: 'http://localhost:4200/payments/success',
  paymentRedirectCancelUrl: 'http://localhost:4200',
  pusher: {
    appId: 679353,
    key: '71de9c6918d0bc4209a8',
    cluster: 'ap2',
    encrypted: true
  },
  GoogleMapApiKey: 'AIzaSyDJRikHL4KyX0VXe9jIS2mA0oAGXZfcITc'
};
