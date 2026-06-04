import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to local app
  await page.goto('http://localhost:5174/');
  
  // Wait for load
  await page.waitForTimeout(1000);
  
  // Dismiss intro modal if present
  try {
    await page.click('button:has-text("See how to play")');
    await page.waitForTimeout(500);
  } catch (e) {}

  // Click Quiz tab
  await page.click('button:has-text("Verification")');
  await page.waitForTimeout(500);
  
  // Enter wrong passcode
  await page.fill('input[placeholder="****"]', '9999');
  
  // Click Unlock Quiz button
  await page.click('button:has-text("Unlock Quiz")');
  await page.waitForTimeout(500);
  
  // Check if error message is visible
  const errorText = await page.locator('text=Incorrect passcode!').isVisible();
  console.log("Is error message visible?", errorText);
  
  if (!errorText) {
     const html = await page.content();
     console.log("HTML around input:", await page.locator('input[placeholder="****"]').evaluate(el => el.parentElement.innerHTML));
  }
  
  await browser.close();
})();
