import{LoginPage} from '../../pageObjects/LoginPage';
import{Dashboard} from '../../pageObjects/Dashboard';
import{MakeAPayment} from '../../pageObjects/Payments/MakeAPayment';
import{PaymentConfirmation} from '../../pageObjects/Payments/PaymentConfirmation';
import {test, Page, expect} from '@playwright/test';

let paymentMNumber: string = '29667356' //'35936991';
let paymentPassword: string = 'Testing12345';
let pagec: Page;


test.beforeEach('Login and Navigate to payments page', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.signInWithoutOTP(paymentMNumber, paymentPassword);    
    const dashboard = new Dashboard(page);
    pagec = await dashboard.navigateToPayments();
    

})

test('Make a payment with credit card', async({})=>{
    const makeAPayment = new MakeAPayment(pagec);
    await makeAPayment.selectAPolicy();
    await makeAPayment.enterAmount('11');
    await makeAPayment.clickNext();    
    await makeAPayment.fillCardDetails('test','4111111111111111','12','27','333');
    await makeAPayment.payTotal();
    await pagec.waitForLoadState('networkidle');
    expect(await pagec).toHaveURL('https://www.test2.hcf.com.au/memberservices/payments/make-a-payment/confirmation');
})


//to prep a test cases for payment with bank account
