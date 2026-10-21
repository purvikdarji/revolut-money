import { test, expect } from '@playwright/test';

test.describe('WhyChooseUs Section', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for the hydration and animations to complete
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('feature cards have exactly the same height on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Scroll into view to trigger Framer Motion reveals
    const section = page.locator('.why-section');
    await section.scrollIntoViewIfNeeded();
    // Wait a moment for layout to settle
    await page.waitForTimeout(500);

    const cards = page.locator('.why-card');
    const count = await cards.count();
    expect(count).toBe(6);

    const heights: number[] = [];
    for (let i = 0; i < count; i++) {
      const box = await cards.nth(i).boundingBox();
      expect(box).not.toBeNull();
      heights.push(box!.height);
    }

    // Check all heights match the first one (within 1px for subpixel rendering)
    const firstHeight = heights[0];
    for (const h of heights) {
      expect(Math.abs(h - firstHeight)).toBeLessThan(1.5);
    }
  });


  test('comparison table has exact semantic structure', async ({ page }) => {
    const table = page.locator('.why-cmp-table');
    await expect(table).toBeVisible();

    // Check header rows
    const headerRow = table.locator('thead tr');
    await expect(headerRow).toHaveCount(1);
    
    // Check it has 3 columns (label, alone, with-us)
    const ths = headerRow.locator('th');
    await expect(ths).toHaveCount(3);

    // Check body rows
    const bodyRows = table.locator('tbody tr');
    await expect(bodyRows).toHaveCount(4);
  });

  test('photo points to advisor-consultation.png', async ({ page }) => {
    const img = page.locator('.why-photo-img');
    await expect(img).toBeVisible();
    const src = await img.getAttribute('src');
    expect(src).toContain('advisor-consultation.png');
  });
});
