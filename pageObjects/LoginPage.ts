import type{ Page } from "@playwright/test";


export class LoginPage{    
    private page: Page; 
    private memberNumber:String;
    private password:String;

    constructor(page:Page){
        this.page = page;
    }

    async signIn(memberNumber, password){

        await this.page.goto('https://www.test2.hcf.com.au/member-login');
        await this.page.locator('#okta-signin-username').fill(memberNumber);
        await this.page.locator('#okta-signin-password').pressSequentially(password);
        await this.page.locator('#okta-signin-submit').click();
        await this.page.waitForLoadState('networkidle');

    }
}