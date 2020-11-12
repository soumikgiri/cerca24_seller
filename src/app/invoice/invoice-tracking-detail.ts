import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from '../order/services/order.service';
import { UtilService, SystemService } from './../shared/services';
import * as _ from 'lodash';

@Component({
  selector: 'invoice-detail-tracking',
  templateUrl: './invoice-detail.html',
  styleUrls: ['./invoice.css']
})
export class InvoiceDetailComponent implements OnInit {
  public order: any = {};
  public appConfig: any = {};
  constructor(private route: ActivatedRoute, private toasty: ToastyService, private orderService: OrderService,
     private translate: TranslateService, private utilService: UtilService, private system: SystemService) {
       this.system.configs().then(res => {
        this.appConfig = res;
       });
  }

  ngOnInit() {
    this.utilService.setLoading(true);
    const trackingCode = this.route.snapshot.params.trackingCode;
    this.orderService.getDetailByCode(trackingCode).then(resp => {
      this.order = resp.data;
      this.utilService.setLoading(false);
    })
    .catch(err => {
      this.utilService.setLoading(false);
      this.toasty.error(this.translate.instant(err.data.message || 'Something went wrong, please try again'));
    });
   }
}
