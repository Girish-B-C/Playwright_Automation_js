const {test, expect} = require('@playwright/test');
const { title } = require('process');


//This contains practice until section 5

//How to invoke a browser in playwright using browser
test('First Playwright test', async ({browser}) => 
{
    //chrome 
   const context = await browser.newContext(); // mew browser context is getting created
   const page = await context.newPage()    // new page is getting opened 
   await page.goto("https://www.google.com/");  // new page is getting opened with this url passed


});

//How to invoke directly using page
test('Second Playwright test', async ({page}) => 
{
    await page.goto("https://www.cartoonnetwork.co.uk/");  //directly invoking the page with the URL
    await console.log(page.title()) // to print the page title
    await expect(page).toHaveTitle("Cartoon Network | Free Online Games, Downloads, Competitions & Videos for Kids") //assertion on page title
})

//Using Locator in playwright
test('Third test for locators', async({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
    await page.locator("#username").fill("Girish") // typing into input box
    await page.locator("#password").fill("Girish123")
    await page.locator("#signInBtn").click()
    // get the text from element and put assertion 
     expect(await page.locator("[style='display: block;']").textContent()).toEqual("Incorrect username/password.");
    
     

})

//to grab multiple element from webpage and print the grabbed text

test('Fourth test for multiple elements', async({page}) => 
    {
        await page.goto("https://www.myntra.com/tshirts?f=Gender%3Amen%2Cmen%20women&rf=Discount%20Range%3A10.0_100.0_10.0%20TO%20100.0"); 
        //to print perticular brand name
        //wait until all api calls are done
       await page.waitForLoadState("networkidle");
       //alternate for wait for load state is to use locator.waitFor but locator should be unique
        const firstProductName = await page.locator("[class='product-brand']").first()
        await console.log(await firstProductName.textContent())

        const lastProductName = await page.locator("[class='product-brand']").last()
        await console.log(await lastProductName.textContent())

        const fifthProductName = await page.locator("[class='product-brand']").nth(5)
        await console.log(await fifthProductName.textContent())
        
        //To print all the product names using array

        const allProductNames = await page.locator("[class='product-brand']").allTextContents();
        await console.log(allProductNames);
    
        
         
    
    })

//Handling dropdowns and radio buttons
    test('fifth test for dropdowns', async({page}) => 
        {
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
           
            //Handling select dropdown
            const selectdropdown = await page.locator("[data-style='btn-info']")

            await selectdropdown.selectOption("Teacher")
            
            await page.locator("[class='checkmark']").last().click() // clicking a radio button

            await page.locator("#okayBtn").click();
    
            await page.locator("#terms").click()
            await expect(await page.locator("#terms").isChecked()).toBe(true)

            await page.locator("#terms").uncheck()
            await expect(await page.locator("#terms").isChecked()).toBeFalsy()


        })

        //to get the attribute values of elements

        test('attribute value test ', async({page}) => 
        {
                const product ="ZARA COAT 3";
                await page.goto("https://rahulshettyacademy.com/client"); 
                await page.locator("#userEmail").fill("anshika@gmail.com");
                await page.locator("#userPassword").fill("Iamking@000");
                await page.locator("[value='Login']").click();
                await page.waitForLoadState('networkidle');

                const titles = await page.locator(".card-body b").allTextContents();
                console.log(titles)

                const products = await page.locator(".card-body");        // grab a unique locators to fetch all the products on the screen
                const count = await  products.count();   // get the count of products
                await console.log(count);  

                for(let i=0;i<count;i++)   //iterate through all the products items
                {
                    if(await products.nth(i).locator("b").textContent() == product) //compare with the product name that you want to add to cart
                    {
                        await  console.log("inside the loop"); 
                        await products.nth(i).locator("text=' Add To Cart'").click();    //Add to cart
                        break;  //come out of loop once the product is added to cart
                    }
                }
             
                
                await page.locator("app-sidebar button").nth(2).click();
                await page.locator("div li").first().waitFor();
                const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
                expect(bool).toBe(true);

                await page.pause();

        })

        //to handle chil windows in playwright

        //.only is used to run only that test
            test('child window test ', async({browser}) => 
            {   

                    const context = await browser.newContext(); // mew browser context is getting created
                    const page = await context.newPage()
                    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
                    
                    const[newPage] = await Promise.all([

                        
                        context.waitForEvent('page'),
                        page.locator("[class='blinkingText']").first().click(),
                        

                    ])
                    //String operation
                    const documentText = await newPage.locator("h1").textContent()
                    const split = await documentText.split(" ")
                    console.log(split[0])


                    await newPage.locator("[class='theme-btn']").first().click()
                   // await console.log(await newPage.locator("[class='theme-btn']").textContent();

                   
                    
    
            })

