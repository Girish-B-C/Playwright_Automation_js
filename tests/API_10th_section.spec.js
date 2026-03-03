const {test, expect, request} = require('@playwright/test');
const { title } = require('process');
const loginPayLoad = {email:"eve.holt@reqres.in",password:"cityslicka"};
let token;
// API testing in playwright

test.beforeAll( async() => {

 const apiContext = await request.newContext();   //to create new request context
 const loginResponse = await apiContext.post("https://srnhj2.csb.app/",  // request a post method
 {
    
     data:loginPayLoad   // passing the request payload
 })
 
 expect(loginResponse.ok()).toBeTruthy();   // checking the api response
 page.pause()
 const loginJsonResponse = await loginResponse.json();
 token = loginJsonResponse.token;

 console.log(token);

})

test.beforeEach(async()=>{

})
test('First Playwright test', async ({page}) => 
{

   
    page.addInitScript(value => {

      window.localStorage.setItem('toekn',value)

    }, token);
   
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");




     await page.goto("https://rahulshettyacademy.com/client");
   //  await page.getByPlaceholder("email@example.com").fill(email);
   //  await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   //  await page.getByRole('button',{name:"Login"}).click();
   //  await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button",{name:"Add to Cart"}).click();
  
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
  
    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  
    await page.getByRole("button",{name :"Checkout"}).click();
  
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
  
    await page.getByRole("button",{name :"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
  
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

});