import { expect, test } from '@playwright/test';

test('homepage has expected airport diagram', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('#atl-diagram')).toBeVisible();
});
