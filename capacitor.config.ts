import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.connorsapps.snapcastui',
  appName: 'snapcast-ui',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
