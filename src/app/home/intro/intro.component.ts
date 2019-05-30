import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { PaymentServiceService } from "../../payments/payment-service.service";
import { environment } from "../../../environments/environment";
import { tap, catchError, switchMap } from "rxjs/operators";

@Component({
  selector: "app-intro",
  templateUrl: "./intro.component.html",
  styleUrls: ["./intro.component.scss"],
})
export class IntroComponent implements OnInit {
  handler: any;
  authorized: any;
  email: any;

  constructor(
    public pmt: PaymentServiceService,
    public user: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    // listens for login events
    this.user.auth.onAuthStateChanged(user => {
      // on successful login, set email for template
      this.email = user.email;
      // lookup subscription status
      const collectionRef = this.firestore.collection("stripe-users");
      collectionRef
        .doc(user.uid)
        .ref.get()
        .then(doc => {
          console.log(doc.data());
        });
    });
  }

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
        this.authorized = true;
      },
    });
  }

  openHandler() {
    this.handler.open({
      name: "FireStarter",
      excerpt: "PRO Subscription",
      amount: 1500,
      shippingAddress: true,
      billingAddress: true,
    });
  }
}
