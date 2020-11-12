import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, LocationService } from '../../shared/services';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  templateUrl: 'register.html'
})
export class RegisterComponent implements OnInit {
  public dialCode: any = '+260';
  public shop: any = {
    email: '',
    password: '',
    city: 'Chadiza',
    country: 'Zambia'
  };
  public confirmPassword: any = '';
  public submitted: any = false;
  public issueDocumentOptions: any;
  public issueDocument: any;
  public logoUrl: any;
  public currentUser: any = {};
  public countries: any = [];
  public phone: any = {
    number: ''
  };
  public cities: any = [];
  public citySelected: any = {
    areas: []
  };

  constructor(private auth: AuthService, public router: Router, private route: ActivatedRoute,
    private toasty: ToastyService, private locationService: LocationService) {
    this.logoUrl = route.snapshot.data['appConfig'] ? route.snapshot.data['appConfig'].siteLogo : '/assets/images/logo.jpg';
  }

  ngOnInit() {
    if (this.auth.isLoggedin()) {
      this.auth.getCurrentUser().then(user => {
        this.currentUser = user;
      });
    }
    // this.locationService.countries().then(res => this.countries = res.data);
    this.cities = this.locationService.getCitiesZambia();
    this.cityChange(this.cities[0].name);
    // TODO - check if user login here or the link have access token
    // then we can query user and hide password field and show user info
    this.issueDocumentOptions = {
      url: window.appConfig.apiBaseUrl + '/shops/register/document',
      fileFieldName: 'file',
      hintText: 'Click or drag verification document here',
      onFinish: (resp) => {
        this.issueDocument = resp.data;
      }
    };
  }

  public submit(form: any) {
    this.submitted = true;
    if (form.invalid) {
      return this.toasty.error('Invalid form, please check then try again');
    }

    if (this.shop.password !== this.confirmPassword) {
      return this.toasty.error('Password does not match.');
    }

    if (!this.issueDocument) {
      return this.toasty.error('Please upload document for verification.');
    }

    this.shop.verificationIssueId = this.issueDocument._id;
    this.auth.register(this.shop)
      .then(resp => {
        this.toasty.success('Your account has been created. Wait admin to verify.');
        this.router.navigate(['/auth/login']);
      })
      .catch(e => this.toasty.error(e.data.data.message || 'Something went wrong, please try again')); // TODO - implement me
  }

  public selectDial(event) {
    this.dialCode = event;
  }

  public cityChange(city: any) {
    this.citySelected = _.find(this.cities, { 'name': city });
    if (this.citySelected.areas && this.citySelected.areas.length) {
      this.shop.area = this.citySelected.areas[0];
    } else {
      this.shop.area = '';
    }
  }

  inputPhone() {
    this.shop.phoneNumber = `${this.dialCode}${this.phone.number}`;
  }

  swipe(url: string) {
    if (url) {
      let h = window.screen.availHeight;
      let w = window.screen.availWidth
      window.open(url, 'Image', 'width=' + w + ',height=' + h + ',resizable=1');
    } else {
      return this.toasty.error('Image is not available');
    }
  }
}
