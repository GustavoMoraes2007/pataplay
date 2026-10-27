import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
 testDir: './e2e', fullyParallel: false, workers: 1, timeout: 45000,
 reporter: [['list'], ['html', {open:'never'}]],
 use: {baseURL:'http://127.0.0.1:5173', channel:process.env.PLAYWRIGHT_CHANNEL || undefined, reducedMotion:'reduce', trace:'retain-on-failure', screenshot:'only-on-failure'},
 projects: [
  {name:'desktop',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:1000}}},
  {name:'mobile',use:{...devices['iPhone 13'],defaultBrowserType:'chromium'}}
 ],
 webServer: process.env.PATAPLAY_EXTERNAL_SERVER ? undefined : {command:'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173 --strictPort',url:'http://127.0.0.1:5173',reuseExistingServer:!process.env.CI}
});

