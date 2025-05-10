import type{ Locator, Page } from "@playwright/test";

import * as dotenv from 'dotenv';
dotenv.config();


export class LoginPage{    
    public page: Page; 
    private memberNumber:string;
    private password:string;
    private myCover:Locator;
    private studentDependant:Locator;

    constructor(page:Page){
        this.page = page;
      //  this.myCover = this.page.locator('#dropdown-nav-0-item-1').click();
       // this.studentDependant = this.page.locator(".has-children .dd-level2-inner a[title='Student dependant registration']").click();
    }

    async signIn(memberNumber:string, password:string){

        await this.page.goto(process.env.BASE_URL + '/member-login');
        //await this.page.goto('https://www.test2.hcf.com.au/member-login');
        await this.page.locator('#okta-signin-username').fill(memberNumber);
        await this.page.locator('#okta-signin-password').pressSequentially(password);
        await this.page.locator('#okta-signin-submit').click();
        await this.page.waitForLoadState('networkidle');        

    }
}