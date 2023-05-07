# WebShop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

***
- Potrebno da se prazni niz na backend-u (api.orderedItems)
- Proveriti metod za refresovanje broja u korpi

Za peti deo:

- ne prepoznaje aktivaciju linkom dek se ne uradi reload stranice

- Na novi sign up

Function DocumentReference.set() called with invalid data. Unsupported field value: a function (found in field delete in document users/3MDRW3hGghQ4A6gzHQzaFesf4543)![image](https://user-images.githubusercontent.com/125912399/236688484-7d5d5a89-7b93-4e6a-aea3-08ecc8f5c2f0.png)

greska se javlja jer kod importovanog interfejsa User, pri njegovoj implementaciji, prijavljuje gresku za funkcije koje su potrebne a nisu navedene na slajdu:

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
      
      // odavde na dole, ubaceno sa quick fix
      
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,


      phoneNumber: null,
      providerId: '',
      delete: function (): Promise<void> { // ovde javlja gresku
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
