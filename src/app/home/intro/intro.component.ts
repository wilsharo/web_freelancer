import { Component, OnInit } from "@angular/core";
import { PaymentServiceService } from "../../payments/payment-service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-intro",
  templateUrl: "./intro.component.html",
  styleUrls: ["./intro.component.scss"],
})
export class IntroComponent implements OnInit {
  handler: any;

  constructor(public pmt: PaymentServiceService) {}

  ngOnInit() {
    this.configHandler();
  }

  private configHandler() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image:
        "https://firebasestorage.googleapis.com/v0/b/urltv-mcbattlearena.appspot.com/o/urltv_web_images%2Furltv_orig_log_transparent.PNG?alt=media&token=9498df7f-569a-4753-9b26-98e7f0ee843d",
      locale: "auto",
      token: token => {
        this.pmt.processPayment(token);
      },
    });
  }

  openHandler() {
    this.handler.open({
      name: "FireStarter",
      excerpt: "PRO Subscription",
      amount: 1500,
    });
  }
}
