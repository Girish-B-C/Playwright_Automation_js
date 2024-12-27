const {test, expect} = require('@playwright/test');

test('First Playwright test', async ({browser}) => 
{
    //chrome 
   const context = await browser.newContext();
   const page = await context.newPage()
   await page.goto("https://www.google.com/"); 


});

test('Second Playwright test', async ({page}) => 
{
    await page.goto("https://www.cartoonnetwork.co.uk/");
    await console.log(page.title())
    await expect(page).toHaveTitle("Cartoon Network | Free Online Games, Downloads, Competitions & Videos for Kids")
})