import type{ Locator, Page } from "@playwright/test"; 
import {expect} from '@playwright/test';
import Mailosaur from 'mailosaur';

import * as dotenv from 'dotenv';
dotenv.config();

//using Mailosaur for OTP





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

    async signInWithOTP(memberNumber:string, password:string){

        const mailosaur = new Mailosaur('VAdePEwD209l95XJnouZe0eSeZi20Wyp');
        const testEmail = 'anything@cwn0tbi6.mailosaur.net';

        await this.page.goto(process.env.BASE_URL + '/member-login');        
        await this.page.locator('#okta-signin-username').fill(memberNumber);
        await this.page.locator('#okta-signin-password').pressSequentially(password);
        await this.page.locator('#okta-signin-submit').click();
        await this.page.waitForLoadState('networkidle');

        await  mailosaur.messages.deleteAll('cwn0tbi6');
        await this.page.locator('.button[value="Send code"]').click();
        await this.page.waitForTimeout(5000);
        const email = await mailosaur.messages.get('cwn0tbi6',{sentTo:testEmail},{timeout:30000});

        
        // to extract code from email
        let otp;
        // Pattern 1: Look for numeric code        
        const otpMatch = email.text.body.match(/Your HCF security code is (\d{6})/);
            if (otpMatch && otpMatch[1]) {
            otp = otpMatch[1];
        }              

        expect(otp).toBeDefined();
        console.log(`Found OTP: ${otp}`);
        

        await this.page.waitForLoadState('networkidle');        
        await this.page.locator('span.okta-form-input-field input').fill(otp);
        await this.page.locator('.o-form-button-bar input[type="submit"]').click();
        await this.page.waitForLoadState('networkidle');
       // return this.page;        

    }
     async signInWithoutOTP(memberNumber:string, password:string){

        

        await this.page.goto(process.env.BASE_URL + '/member-login');        
        await this.page.locator('#okta-signin-username').fill(memberNumber);
        await this.page.locator('#okta-signin-password').pressSequentially(password);
        await this.page.locator('#okta-signin-submit').click();
        await this.page.waitForLoadState('networkidle');       


    }
}