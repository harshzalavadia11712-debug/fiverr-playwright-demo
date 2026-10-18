import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Number of parallel workers
  workers: process.env.CI ? 1 : 2,

  // Reporter
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Shared settings
  use: {
    baseURL: 'https://www.saucedemo.com',

    // Capture screenshot only when test fails
    screenshot: 'only-on-failure',

    // Record trace when test fails
    trace: 'retain-on-failure',

    // Record video when test fails
    video: 'retain-on-failure',

    // Browser settings
    headless: true,
  },

  // Configure browser
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});