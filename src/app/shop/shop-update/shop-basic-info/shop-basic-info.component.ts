import { Component, OnInit, Input } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ShopService } from '../../shop.service';
import { LocationService, AuthService } from './../../../shared/services';
import * as _ from 'lodash';

@Component({
  selector: 'shop-basic-info',
  templateUrl: './shop-basic-info.html'
})
export class ShopBasicInfoComponent implements OnInit {
  @Input() shop: any = {};
  public isSubmitted = false;
  public cities: any = [];
  public citySelected: any = {
    areas: []
  };
  public mobile: any = {
    dial: '+260',
    number: ''
  };
  public dialCodes: any = [];
  public newPickUpAddress: any = {
    street: '',
    city: '',
    area: ''
  };
  public pickUpCitySelected: any = {
    areas: []
  };

  constructor(private toasty: ToastyService, private shopService: ShopService,
    private location: LocationService, private auth: AuthService) { }

  ngOnInit() {
    this.dialCodes = this.auth.getDialCodes();
    this.cities = this.location.getCitiesZambia();
    if (this.shop) {
      if (this.shop.phoneNumber) {
        this.mobile.number = this.shop.phoneNumber;
        this.trackDial(this.shop.phoneNumber);
      }
      if (this.shop.city) {
        this.cityChange(this.shop.city, 'address');
      }
    }
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Invalid form, please check and try again!');
    }
    // force shop must have pick up address now.
    if (!this.shop.pickUpAddress.length) {
      return this.toasty.error('Please enter pick up address!');
    }
    this.shop.phoneNumber = `${this.mobile.dial}${this.mobile.number}`;
    const data = _.pick(this.shop, ['name', 'alias', 'address', 'city', 'state', 'country', 'zipcode', 'email',
      'doCOD', 'pickUpAtStore', 'pickUpAddress', 'phoneNumber', 'logoId', 'verificationIssueId', 'bannerId',
      'headerText', 'gaCode', 'announcement', 'tpinNumber', 'vatRegistrationNumber', 'area', 'returnAddress']);
    this.shopService.update(this.shop.id, data).then(resp => {
      this.toasty.success('Updated successfuly!');
    }).catch((err) =>
      this.toasty.error(err.data.data.message || err.data.data.details[0].message)
    );
  }
  selectLogo(data: any) {
    this.shop.logoId = data._id;
    this.shop.logo = data;
  }
  selectVerificationIssue(data: any) {
    this.shop.verificationIssueId = data._id;
    this.shop.verificationIssue = data;
  }
  selectBanner(data: any) {
    this.shop.bannerId = data._id;
    this.shop.banner = data;
  }

  switchCod() {
    this.shop.doCOD = !this.shop.pickUpAtStore;
  }

  addNewPickUpAddress() {
    this.shop.pickUpAddress.unshift(this.newPickUpAddress);
    this.newPickUpAddress = {
      street: '',
      city: '',
      area: ''
    };
  }

  removePickUpAddress(index: number) {
    if (confirm('Are you sure?')) {
      this.shop.pickUpAddress.splice(index, 1);
    }
  }

  addTag(label) {
    return { label: label, tag: true };
  }

  cityChange(city: any, type: string) {
    if (type === 'address') {
      this.citySelected = _.find(this.cities, { 'name': city });
      if (this.citySelected.areas && this.citySelected.areas.length && !this.shop.area) {
        this.shop.area = this.citySelected.areas[0];
      }
    }

    if (type === 'pickup') {
      this.pickUpCitySelected = _.find(this.cities, { 'name': city });
      if (this.pickUpCitySelected.areas && this.pickUpCitySelected.areas.length && !this.shop.area) {
        this.newPickUpAddress.area = this.pickUpCitySelected.areas[0];
      }
    }
  }

  trackDial(string: any) {
    const validDials = this.dialCodes.filter(d => d.dialCode);
    validDials.forEach(d => {
      const i = string.indexOf(d.dialCode);
      if (i > -1) {
        const p = string.split(d.dialCode);
        this.mobile = {
          dial: d.dialCode,
          number: p[1]
        };
      }
    });
  }

  onlyNumberKey(event) {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  selectDial(event) {
    this.mobile.dial = event;
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
