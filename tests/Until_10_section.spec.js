const {test, expect} = require('@playwright/test');


//This contains practice section 6 to 10

//How to debug in playwright using playwright inspector
//to run playwright in debug mode npx playwright test --debug --> inspector will get  --> we can see log for each steps  -- you can inspect  and generate locators also using this.
test('Sixth Playwright test', async ({page}) => 
{
    //chrome 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
    await page.locator("#username").fill("Girish") // typing into input box
    await page.locator("#password").fill("Girish123")
    await page.locator("#signInBtn").click()
    // get the text from element and put assertion 
     expect(await page.locator("[style='display: block;']").textContent()).toEqual("Incorrect username/password.");


});

//To record and playback feature using codegen
//type npx playwright codegen "your site URL"  -> record and palyback


//E2E automation using e-comm application

test('Seventh Playwright test', async ({page}) => 
    {
        //chrome 
        const product ="ZARA COAT 3";
        const email = "anshika@gmail.com";
        await page.goto("https://rahulshettyacademy.com/client"); 
        await page.locator("#userEmail").fill(email);
        await page.locator("#userPassword").fill("Iamking@000");
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');

        //const titles = await page.locator(".card-body b").allTextContents();
        //console.log(titles)

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
     
        
        await page.locator("app-sidebar button").nth(2).click();   //click on cart button
        await page.locator("div li").first().waitFor();   //wait for some element to load
        const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();    // check the product is visible in the cart
        expect(bool).toBe(true);    //assertion

        await page.locator("text='Checkout'").click();  // click on checkout button

        await page.locator("[placeholder='Select Country']").pressSequentially("Ind");

        const dropdown = await page.locator("[class*='ta-results']");
        await dropdown.waitFor();
        const optionCount = await dropdown.locator("button").count();
        

        for(let i=0;i<optionCount;i++)
        {
            const text = await dropdown.locator("button").nth(i).textContent();
            if( text === " India")
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        expect(page.locator("[class*='user__name '] label")).toHaveText(email);
        await page.locator("a[class*='action__submit ']").click();

        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderID = await page.locator("td label").last().textContent();
        console.log(orderID)

        await page.locator("[class='btn btn-custom']").nth(1).click();
        
        const orders = await page.locator("tbody tr th");
        await orders.first().waitFor();
        const ncount = await orders.count();
        console.log(ncount)
        
        for(let i=0;i<ncount;i++)
        {
            let text = await orders.nth(i).textContent();
            if(await orderID.includes(text))
            {
                console.log("order is placed successfully and available in orderrs section")
            }
        }
        await page.pause();

})

//special locators in playwright

//.only is used to run only that test
    test('Eighth playwright test ', async({page}) => 
    {   

        await page.goto("https://rahulshettyacademy.com/angularpractice/");
        await page.getByLabel("Check me out if you Love IceCreams!").click();  // work for element with label tag
        await page.getByLabel("Employed").check();

        //to run the test on playwright UI mode npx playwright test --ui(just like cypress)

        await page.getByLabel("Gender").selectOption("Female"); // works on select dropdown
        await page.getByPlaceholder("Password").fill("abc123"); // works for field with placeholder
        await page.getByRole("button", {name: 'Submit'}).click(); 
        await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
        await page.getByRole("link",{name : "Shop"}).click();
        await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    
});

//same e-comm use case with using only getByrole and getBy text methods

test('Ninth playwright test', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button',{name:"Login"}).click();
    await page.waitForLoadState('networkidle');
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
 })

 //Strategy to handle calender

 test("Calendar validations",async({page})=>
    {
     
        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber,date,year];
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        await page.locator(".react-date-picker__inputGroup").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.getByText(year).click();
        await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
        await page.locator("//abbr[text()='"+date+"']").click();
        const inputs = await page.locator(".react-date-picker__inputGroup input");
        for (let index = 0; index <inputs.length; index++)
        {
            const value =inputs[index].getAttribute("value");
            expect(value).toEqual(expectedList[index]);
        }

    })

    //to handle hidden elements in playwright

    test("browser navigation and hidden elements",async({page})=>
        {
         
            await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
            // await page.goto("https://www.google.com");
            // await page.goBack();  // to click on back button
            // await page.goForward(); // to navigate to forward page

            //await expect(page.locator("")).isVisible()   -- to check whether element is visible or not
            //await expect(page.locator("")).toBeHidden()  -- to check whether element is hidden or 
            
            //to handle java alerts pop up

            page.on('dialog',dialog=> dialog.accept());  //waits for pop up to occur and clicks on ok - .dismiss() to cancel
            await page.locator("#confirmbtn").click();
            
            //to hover over the element
            await page.locator("#mousehover").hover();

            
    
        })

        //To handle frames using iframe tags

        test("to handle frames",async({page})=>
            {
             
                await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
          
                const framesPage = page.frameLocator("#courses-iframe");
                await framesPage.locator("li a[href*='lifetime-access']:visible").first().click();
                const textcheck = await framesPage.locator(".text h2").textContent();

                console.log(textcheck.split(" ")[1]);  // fetched no of subscibers
                
        
            })
    