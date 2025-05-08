import{test, expect} from '@playwright/test';
import { LoginPage } from '../../pageObjects/LoginPage';

test('Invalid credentials', async({page})=>{

    const loginPage = new LoginPage(page);
    await loginPage.signIn('35254455','Test123ing');
   // page.waitForLoadState('networkidle')
    expect(await page.getByText('The membership number or password you have entered is not correct. Please try again.').isVisible());


})