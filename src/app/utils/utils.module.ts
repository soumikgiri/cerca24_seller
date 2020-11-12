import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { DialCodeComponent } from './components/dial-number/dial.component';
import { StatusDisplayComponent } from './components/status-display/status-display.component';


import { AuthService as SocialLoginService } from 'angularx-social-login';
// social login, check document here https://github.com/abacritt/angularx-social-login#readme
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LoginOpt } from 'angularx-social-login';
import { GoogleLoginButtonComponent } from './components/socials-login/google-login-button.component';
import { FacebookLoginButtonComponent } from './components/socials-login/facebook-login-button.component';
export function provideConfig() {
  const googleLoginOptions: LoginOpt = {
    scope: 'profile email'
  }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

  const fbLoginOptions: LoginOpt = {
    scope: 'email',
    return_scopes: true,
    enable_profile_selector: true
  }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

  return new AuthServiceConfig([{
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(window.appConfig.googleClientId, googleLoginOptions)
  }, {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(window.appConfig.facebookAppId, fbLoginOptions)
  }]);
}

@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    NgbModule.forRoot(),
    TranslateModule.forChild()
  ],
  declarations: [
    DialCodeComponent,
    GoogleLoginButtonComponent,
    FacebookLoginButtonComponent,
    StatusDisplayComponent
  ],
  exports: [
    TranslateModule,
    DialCodeComponent,
    StatusDisplayComponent,
    GoogleLoginButtonComponent,
    FacebookLoginButtonComponent
  ],
  providers: [
    SocialLoginService, {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class UtilsModule { }
