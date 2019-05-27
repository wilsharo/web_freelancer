//import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, Params } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { PaymentServiceService } from '../../payments/payment-service.service';
import { environment } from '../../../environments/environment';



//5/24
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

import { HttpModule } from '@angular/http';

//5/24 end

//5/25
import { StripeDemoComponent } from '../../stripe-demo/stripe-demo.component';
import { StripeComponent } from '../../stripe/stripe.component';


@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})

export class PriceComponent implements OnInit {

  handler: any;

  // DomSanitizer for safe html content.
  constructor(private auth: AuthService, private _sanitizer: DomSanitizer, private router: Router, public pmt: PaymentServiceService) { }

  ngOnInit() {
    this.configHandler();
  }

  private configHandler() {
    this.handler = 
    
    StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://firebasestorage.googleapis.com/v0/b/urltv-mcbattlearena.appspot.com/o/urltv_web_images%2Fimage1.jpeg?alt=media&token=9ba5e3b1-c9c3-49c1-9ecb-b20186b5e4b4',
      locale: 'auto',
      token: token => {
        this.pmt.processPayment(token);
      }
    });
  }

  openHandler() {
    this.handler.open({
      name: 'Premium: Monthly',
      excerpt: 'Premium Subscription',
      amount: 799
    });
  }

  // Pricing Carousel
  public price = [{
    type: 'Premium: Monthly',
    price: '7.99',
    duration: 'month',
    feature: this._sanitizer.bypassSecurityTrustHtml('<li>Automatically entered into drawings for prizes.</li><li>Prizes include merchandise, tickets to exclusive events, and more. Subscribe below.</li>'),
  }];


  // Pricing Carousel Options
  public pricingCarousel: any = {
    loop: false,
    items: 1,
    margin: 15,
    navClass: ['owl-prev', 'owl-next'],
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: true
      },
      600: {
        items: 1,
        nav: false,
        dots: true
      },
      767: {
        items: 1,
        nav: false,
        dots: true
      },
      992: {
        items: 1,
        nav: false,
        dots: true
      },
      1000: {
        items: 1,
        nav: true,
        dots: false
      }
    }
  };

}
