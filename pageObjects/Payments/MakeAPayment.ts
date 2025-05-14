import type{Page, Locator, Frame} from '@playwright/test';

export class MakeAPayment{

    private page: Page;
    private title:Locator;
    private policy: Locator;
    private policyDetails: Locator;
    private makePaymentButton: Locator;
    private paymentAmountField: Locator;
    private nextButton: Locator;
    private CardName: Locator;
    private cardNumber: Locator;
    private cardExpiryMonth: Locator;
    private cardExpiryYear: Locator;
    private cvv: Locator;
    private payTotalButton: Locator;
    private iframep: any
    



    constructor(page:Page){
        this.page = page;
        this.title = this.page.locator('.col-lg-12 .m-0');
        this.policy = this.page.locator('.col-sm-3 .payment-card-heading');
        this.policyDetails = this.page.locator('.col-sm-3 .payment-amount');
        this.makePaymentButton = this.page.locator('div.add-payment');
        this.paymentAmountField = this.page.locator('.input-group input');
        this.nextButton = this.page.locator('div.button-section button.nextBtn');      
        
        
        this.iframep =  this.page.frameLocator('iframe[id="make-payment-oneoff"]');
        this.CardName = this.iframep.locator('input[name="cardHolderName"]');
        this.cardNumber = this.iframep.locator('#paymentForm .grouped-cardno input');
        this.cardExpiryMonth = this.iframep.locator('#paymentForm .grouped-2 .month input[name="cardMonth"]');
        this.cardExpiryYear = this.iframep.locator('#paymentForm .grouped-2 .year input[name="cardYear"]');
        this.cvv = this.iframep.locator('#paymentForm .grouped-cvv  input');

        this.payTotalButton = this.page.locator('button').filter({hasText:'Pay total'});       

    }

    async navigateToPayments() {
        await this.page.locator('#dropdown-nav-0-item-3').click();
        await this.page.locator(".has-children .dd-level2-inner a[title='Make a payment']").click();
        await this.page.waitForLoadState('networkidle');
        //return(this.page);
    }

    async selectAPolicy(){       
        await this.makePaymentButton.click();        
    }

    async enterAmount(amount:string){
        await this.paymentAmountField.clear();
        await this.paymentAmountField.pressSequentially(amount);
    }

    async clickNext(){
        await this.nextButton.click();
        await this.page.waitForTimeout(2000);
        if(this.page.frameLocator('#make-payment-oneoff')){
            console.log('Got it');
            //console.log(this.page.frameLocator('#make-payment-oneoff'))
        }else{console.log('Not got it')}
    }

    async fillCardDetails(vname:string, vcardNumber: string, vcardExpiryMonth:string, vcardExpiryYear:string, vcvv:string){
        
        await this.page.waitForSelector('iframe[id="make-payment-oneoff"]');        
        await this.CardName.fill(vname);   
        await this.cardNumber.fill(vcardNumber);       
        await this.cardExpiryMonth.fill(vcardExpiryMonth);        
        await this.cardExpiryYear.fill(vcardExpiryYear);        
        await this.cvv.fill(vcvv);
        
    }

    async payTotal(): Promise<Page>{
        await this.payTotalButton.click();          
        return this.page;
    }    

    async  listAllIframes() {
        const iframeCount = await this.page.evaluate(() => {
        const iframes =  document.querySelectorAll('iframe');
        console.log(`Found ${iframes.length} iframes on page`);
    
    // Log details about each iframe
        Array.from(iframes).forEach((iframe, index) => {
        console.log(`Frame #${index}:`, {
        id: iframe.id,
        name: iframe.name,
        src: iframe.src,
        class: iframe.className
      });
    });
    
    return iframes.length;
  });
  
  console.log(`Total iframes found: ${iframeCount}`);
}



}


