import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase} from '@angular/fire/database';

import { Router, Params } from '@angular/router';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  userId: string;
  membership: any;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {

      this.membership = this.afAuth.authState
      .pipe(
        tap(user => {
          this.userId = user.uid;
        
          console.log('payservice.ts user: ' + this.userId);
        }),
        switchMap(user => {

          console.log('switchMap user: ' + this.userId);

        return this.firestore.collection('users').doc(user.uid).get();
      })
      );
  }

    processPayment(token: any) {
      console.log('Executing process payment');

      console.log('firebase user id: ' + this.userId);

      console.log('stripe token id: ' + token.id);
      console.log('stripe user id: ' + token.userId);

      const collectionRef = this.firestore.collection("stripe-users");

      return collectionRef.doc(this.userId).update({
          token: token.id

      }).then(result => {
          console.log('Successfully added payment token: ' + token.id);

          //this.router.navigate(['pages/thank-you']);
      }).catch(error => {
          //handle error
          console.error('Failed to add payment token', error);
      });
    }
}
