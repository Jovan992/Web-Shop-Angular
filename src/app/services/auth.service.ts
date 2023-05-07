import * as auth from 'firebase/auth';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
// import { UserMetadata } from 'firebase/auth/dist';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    public angularFireStore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  
  SignUp(email: string, password: string) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);

      });
  }

  SendVerificationMail() {
    debugger;
    return this.angularFireAuth.currentUser
      .then((u: any) => u.sendEmailVerification());
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,


      phoneNumber: null,
      providerId: '',
      delete: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      getIdToken: function (forceRefresh?: boolean | undefined): Promise<string> {
        throw new Error('Function not implemented.');
      },
      getIdTokenResult: function (forceRefresh?: boolean | undefined): Promise<auth.IdTokenResult> {
        throw new Error('Function not implemented.');
      },
      reload: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      toJSON: function (): object {
        throw new Error('Function not implemented.');
      }
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignIn(email: string, password: string) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['shop']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  GetToken() {
    const user = JSON.parse(localStorage.getItem('user')!);
    const token = user !== null ? user.stsTokenManager.accessToken : null;
    return token;
  }

  SignOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

}
