import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'account-create',
  templateUrl: './form.html'
})
export class AccountCreateComponent {

  public isSubmitted: any = false;
  public account: any = {
    type: 'bank-account',
    paypalAccount: '',
    accountHolderName: '',
    accountNumber: '',
    iban: '',
    bankName: '',
    bankAddress: '',
    sortCode: '',
    routingNumber: '',
    swiftCode: '',
    ifscCode: '',
    routingCode: ''
  };

  constructor(private router: Router, private accountService: AccountService, private toasty: ToastyService) {
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (frm.invalid) {
      return this.toasty.error('Form is invalid, please try again.');
    }

    if (this.account.type === 'paypal' && !this.account.paypalAccount) {
      return this.toasty.error('If you select type payout is paypal, please enter Paypal Account');
    }

    this.accountService.create(this.account)
      .then(() => {
        this.toasty.success('Account has been created');
        this.router.navigate(['/accounts/list']);
      }, err => this.toasty.error(err.data.data.message || 'Something went wrong, please check and try again!'));
  }
}
