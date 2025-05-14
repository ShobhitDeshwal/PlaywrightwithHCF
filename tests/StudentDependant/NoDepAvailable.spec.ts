import{test, expect, Page} from '@playwright/test';
import{LoginPage} from '../../pageObjects/LoginPage';

import * as dotenv from 'dotenv';
dotenv.config();

let loggedInPage: Page;

test.beforeEach(async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.signInWithoutOTP(process.env.studentDependantMNumber as string,process.env.studentDependantPassword as string);
    await page.waitForLoadState('networkidle');
    loggedInPage = page;

})

test('WarningMessage', async({})=>{       
    await loggedInPage.locator('#dropdown-nav-0-item-1').click();
    await loggedInPage.locator(".has-children .dd-level2-inner a[title='Student dependant registration']").click();
    await loggedInPage.waitForLoadState('networkidle');
    expect(await loggedInPage.getByText("You don't have any eligible dependants to register.").isVisible());    
})

test('CloseButton', async({})=>{       
    await loggedInPage.locator('#dropdown-nav-0-item-1').click();
    await loggedInPage.locator(".has-children .dd-level2-inner a[title='Student dependant registration']").click();
    await loggedInPage.waitForLoadState('networkidle');
    expect(await loggedInPage.getByText("Close").isVisible());
        
})

test('CloseButtonWorking', async({})=>{      
    await loggedInPage.locator('#dropdown-nav-0-item-1').click();
    await loggedInPage.locator(".has-children .dd-level2-inner a[title='Student dependant registration']").click();
    await loggedInPage.waitForLoadState('networkidle');
    await loggedInPage.locator(".float-md-right .action-buttons-padding").click();    
    expect(await loggedInPage.getByText('WELCOME ').isVisible());
})