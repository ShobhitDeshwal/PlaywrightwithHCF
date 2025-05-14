import type{Page} from '@playwright/test';

export class Dashboard{

    public  page: Page;

    constructor(page:Page){
        this.page = page;



    }

    async navigateToPayments() {
        await this.page.locator('#dropdown-nav-0-item-3').click();
        await this.page.locator(".has-children .dd-level2-inner a[title='Make a payment']").click();
        //await this.page.waitForLoadState('networkidle');
        return this.page;
    }

    

}
