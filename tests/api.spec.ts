import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {

  test('API should return successful response', async ({ request }) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('id', 1);
    expect(responseBody).toHaveProperty('userId');
    expect(responseBody).toHaveProperty('title');
    expect(responseBody).toHaveProperty('body');
  });


  test('API should return correct post data', async ({ request }) => {

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.id).toBe(1);
    expect(typeof responseBody.title).toBe('string');
    expect(typeof responseBody.body).toBe('string');
  });


  test('API should create a new post', async ({ request }) => {

    const response = await request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        data: {
          title: 'Playwright API Test',
          body: 'API testing using Playwright',
          userId: 1,
        },
      }
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('id');
    expect(responseBody.title).toBe('Playwright API Test');
    expect(responseBody.body).toBe('API testing using Playwright');
    expect(responseBody.userId).toBe(1);
  });


  test('API should return 404 for invalid post', async ({ request }) => {

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/posts/99999'
    );

    expect(response.status()).toBe(404);
  });

});