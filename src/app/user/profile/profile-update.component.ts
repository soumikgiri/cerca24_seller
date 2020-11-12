import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComplainComponent } from '../profile-complain/profile-complain.component';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';
import { AuthService } from './../../shared/services';

@Component({
  selector: 'profile-update',
  templateUrl: './form.html'
})
export class ProfileUpdateComponent implements OnInit {
  public info: any = {};
  public avatarUrl = '';
  public isSubmitted = false;
  public avatarOptions: any = {};
  public user: any = {};
  public mobile: any = {
    dial: '+260',
    number: ''
  };
  public dialCodes: any = [];

  constructor(private userService: UserService, private toasty: ToastyService,
    private modalService: NgbModal, private auth: AuthService) { }

  ngOnInit() {
    this.dialCodes = this.auth.getDialCodes();
    this.avatarOptions = {
      url: window.appConfig.apiBaseUrl + '/users/avatar',
      fileFieldName: 'avatar',
      onFinish: (resp) => {
        this.avatarUrl = resp.data.url;
        this.user.avatarUrl = resp.data.url;
      }
    };

    this.userService.me().then(resp => {
      this.user = resp.data;
      this.info = _.pick(resp.data, [
        'name', 'email', 'address', 'phoneNumber'
      ]);
      if (resp.data.phoneNumber) {
        this.trackDial(resp.data.phoneNumber);
      }
      this.avatarUrl = resp.data.avatarUrl;
    });
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Invalid form, please check and try again!');
    }
    this.info.phoneNumber = `${this.mobile.dial}${this.mobile.number}`;
    this.userService.updateMe(this.info).then(resp => {
      this.toasty.success('Updated successfuly!');
    }).catch((err) => this.toasty.error(err.data.data.message || err.data.data.email));
  }

  complain() {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(ProfileComplainComponent, ngbModalOptions);
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
