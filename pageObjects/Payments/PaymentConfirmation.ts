import type{Page, Locator} from '@playwright/test';

export class PaymentConfirmation{

    private page: Page;
    private title:Locator;
    private successMessage: Locator;
    private closeButton: Locator;
   

    constructor(page:Page){
        this.page = page;
        this.successMessage = this.page.locator('.success #successMsg .col');
        this.closeButton = this.page.locator('button.editPayBtn');  
    }

    async clickClose(){
        await this.closeButton.click();
    }

      

}


