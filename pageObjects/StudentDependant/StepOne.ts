import type{ Locator, Page } from "@playwright/test";

export class StepOne{

    private page: Page;
    public title:Locator;
    private noDependantFoundWarning:Locator;
    private totalDependants:Locator;
    private eligibleDependants:Locator;
    private nextButton:Locator;

    constructor(page:Page){
        this.page = page;

        this.title = page.getByText('STEP 1 of 3');
        this.noDependantFoundWarning = page.locator('.no-dependant-found');
        this.totalDependants = page.locator('.dependent-info');
        this.eligibleDependants = page.locator('.dependent-info + .checkbox');        
        this.nextButton = page.locator('#select-member-section-id button');

    }

    async countAllDependants(){
        return await this.page.locator('.dependent-info').count();
        
    }

     async countAllEligibleDependants(){
        return await this.page.locator('.dependent-info + .checkbox').count();
        
    }

    async countAllRegisteredDependants(){
        const a = await this.page.locator('.dependent-info').count();
        const b = await this.page.locator('.dependent-info + .checkbox').count();
        return (a-b);
        
    }

    async selectOneEligibleStudent(studentName){
        const studentToRegister = await this.page.locator(`.dependent-info:has-text('${studentName}') + .checkbox`);            
        await studentToRegister.click();
    }

    async clickNext(){
        await this.nextButton.click();
    }





}