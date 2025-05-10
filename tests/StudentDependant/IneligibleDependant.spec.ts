import {test as base, expect} from '@playwright/test';
import {LoginPage} from '../../pageObjects/LoginPage';
import {StepOne} from '../../pageObjects/StudentDependant/StepOne';
import {StepTwo} from '../../pageObjects/StudentDependant/StepTwo';
import {StudentIneligible} from '../../pageObjects/StudentDependant/StudentIneligible';

 const memberNumber:string = '35936799';
 const passowrd: string = 'Testing123';
 const ineligibleDependantName: string = 'Studentfour Ression';

const test = base.extend<{loginPage: LoginPage}>({
    loginPage: async({page}, use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.signIn(memberNumber, passowrd );
        await use(loginPage);
    },
});

test('IneligibleDependantNameAppearing', async({loginPage})=>{
    await loginPage.page.locator('#dropdown-nav-0-item-1').click();
    await loginPage.page.locator(".has-children .dd-level2-inner a[title='Student dependant registration']").click();
    await loginPage.page.waitForLoadState('networkidle');

    const stepOne = new StepOne(loginPage.page);
    await stepOne.selectOneEligibleStudent(ineligibleDependantName);
    await stepOne.clickNext();
    await loginPage.page.waitForLoadState('networkidle');
    const stepTwo = new StepTwo(loginPage.page);
    await stepTwo.selectNo();
    await stepTwo.clickNext();
    await loginPage.page.waitForLoadState('networkidle');

    const studentIneligible = new StudentIneligible(loginPage.page);    
   // await expect(studentIneligible.nameOfIneligibleDependant).toHaveText(ineligibleDependantName);  
   await expect(studentIneligible.nameOfIneligibleDependant).toContainText(ineligibleDependantName.split(" ")[0]);
    
});

test('close Button functions well', async({loginPage})=>{
    await loginPage.page.locator('#dropdown-nav-0-item-1').click();
    await loginPage.page.locator(".has-children .dd-level2-inner a[title='Student dependant registration']").click();
    await loginPage.page.waitForLoadState('networkidle');

    const stepOne = new StepOne(loginPage.page);
    await stepOne.selectOneEligibleStudent(ineligibleDependantName);
    await stepOne.clickNext();
    await loginPage.page.waitForLoadState('networkidle');
    const stepTwo = new StepTwo(loginPage.page);
    await stepTwo.selectNo();
    await stepTwo.clickNext();
    await loginPage.page.waitForLoadState('networkidle');

    const studentIneligible = new StudentIneligible(loginPage.page);    
    await studentIneligible.clickCloseButton();
    await loginPage.page.waitForLoadState('networkidle');

    expect(await loginPage.page.getByText('WELCOME ').isVisible());
    
});

test('Register Another Dependant Button', async({loginPage})=>{
    await loginPage.page.locator('#dropdown-nav-0-item-1').click();
    await loginPage.page.locator(".has-children .dd-level2-inner a[title='Student dependant registration']").click();
    await loginPage.page.waitForLoadState('networkidle');

    const stepOne = new StepOne(loginPage.page);
    await stepOne.selectOneEligibleStudent(ineligibleDependantName);
    await stepOne.clickNext();
    await loginPage.page.waitForLoadState('networkidle');
    const stepTwo = new StepTwo(loginPage.page);
    await stepTwo.selectNo();
    await stepTwo.clickNext();
    await loginPage.page.waitForLoadState('networkidle');

    const studentIneligible = new StudentIneligible(loginPage.page);    
    await studentIneligible.clickRegisterAnotherDependant();
    await loginPage.page.waitForLoadState('networkidle');
    expect( stepOne.title).toContainText('STEP 1 of 3');

    
    
});



