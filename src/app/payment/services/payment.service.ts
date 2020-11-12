import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PaymentService {

  constructor(private restangular: Restangular) { }

  request(params: any): Promise<any> {
    return this.restangular.one('payment/transactions/request').customPOST(Object.assign(params, {
      redirectSuccessUrl: window.appConfig.paymentRedirectSuccessUrl,
      redirectCancelUrl: window.appConfig.paymentRedirectCancelUrl
    })).toPromise();
  }
  
  addInput(frm, name, value) {
    const elem = document.createElement('input');
    elem.type = 'hidden';
    elem.name = name;
    elem.value = value;
    frm.appendChild(elem);
  }

  doSubmitMyGateGlobal(params: any) {
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'POST';
    form.action = 'https://virtual.mygateglobal.com/PaymentPage.cfm';
    this.addInput(form, 'Mode', params.mode);
    this.addInput(form, 'MerchantID', params.merchantId);
    this.addInput(form, 'ApplicationID', params.applicationId);
    this.addInput(form, 'Price', params.price);
    this.addInput(form, 'Amount', params.price);
    this.addInput(form, 'CurrencyCode', params.currency);
    this.addInput(form, 'RedirectSuccessfulURL', params.redirectSuccess);
    this.addInput(form, 'RedirectFailedURL', params.redirectFailed);
    this.addInput(form, 'ITEMAMOUNT1', params.price);
    this.addInput(form, 'ITEMDESCR1', params.merchantReference);
    this.addInput(form, 'ITEMREF1', params.merchantReference);
    this.addInput(form, 'txtMerchantReference', params.merchantReference);
    form.submit();
  }

  doSubmitCybersource(params: any) {
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'POST';
    form.action = params.url;
    for (let key in params.data) {
      this.addInput(form, key, params.data[key]);
    }
    form.submit();
  }
}
