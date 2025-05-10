import type{Locator, Page} from "@playwright/test";

export class StudentIneligible{

    private page:Page;
    private title:Locator;
    private contactUsLink:Locator;
    private contactUsTitle:Locator;
    private closeButton:Locator;
    public nameOfIneligibleDependant: Locator;
    private registerAnotherDependant: Locator;



    constructor(page:Page){

        this.page = page;

        this.title = this.page.locator('.impSection h2 span');
        this.contactUsLink = this.page.locator('a[title ="Contact Us"]');
        this.contactUsTitle = this.page.locator('.content h1');
        this.closeButton = this.page.locator('#studentAddMember');
        this.nameOfIneligibleDependant = this.page.locator('h2 + p  .ineligibleMember');
        this.registerAnotherDependant = this.page.getByTitle('Register another dependant');


    }

    async clickCloseButton(){
       await this.closeButton.click();
    }

    async clickRegisterAnotherDependant(){
        await this.registerAnotherDependant.click();        
    }

    async clickContactUsLink(){
        await this.contactUsLink.click();        
    }
}