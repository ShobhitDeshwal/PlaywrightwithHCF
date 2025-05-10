import type{ Locator, Page } from "@playwright/test";

export class StepTwo{

    private page: Page;
    private title:Locator;
    private noButton:Locator;
    private yesButton:Locator;    
    private nextButton:Locator;

    constructor(page:Page){
        this.page = page;

        this.title =  page.locator('.proofOfStudySection .hcf-font-teal');
        this.noButton =  page.locator('button[title="No"]');
        this.yesButton =  page.getByText('Yes');
        this.nextButton =  page.locator('#proofSection button.nextBtn');
    }

    async selectYes(){
        this.yesButton.click();
    }

    async selectNo(){
        this.noButton.click();
    }

    async clickNext(){
        this.nextButton.click();
    }
}