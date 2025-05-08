import{test, expect} from '@playwright/test';
import{LoginPage} from '../../pageObjects/LoginPage';

let loggedInPage;

test.beforeEach(async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.signIn('29667356','Testing12345');
    await page.waitForLoadState('networkidle');
    loggedInPage = page;

})

test('NoStudentAvailable', async({})=>{   
    
    await loggedInPage.locator('#dropdown-nav-0-item-1').click();
    await loggedInPage.locator(".has-children .dd-level2-inner a[title='Student dependant registration']");
    await loggedInPage.waitForLoadState('networkIdle');
    expect(await loggedInPage.getByText("You don't have any eligible dependants to register.").isVisible());
    
})