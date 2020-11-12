import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class OrderService {

  constructor(private restangular: Restangular) { }

  find(params: any): Promise<any> {
    return this.restangular.one('orders', 'shops').get(params).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('orders/details', id).get().toPromise();
  }

  updateStatus(id, data): Promise<any> {
    return this.restangular.one('orders').one('details', id).one('status').customPUT(data).toPromise();
  }

  updateShipping(id, data): Promise<any> {
    return this.restangular.one('orders').one('details', id).one('shipping').customPUT(data).toPromise();
  }

  export(params: any): Promise<any> {
    return this.restangular.one('orders/shops/export/csv').get(params).toPromise();
  }

  getTrackingByCode(trackingCode): Promise<any> {
    return this.restangular.one('orders/tracking', trackingCode).get().toPromise();
  }

  getDetailByCode(trackingCode): Promise<any> {
    return this.restangular.one('orders/detail/tracking', trackingCode).get().toPromise();
  }

  location(orderDetailId: string): Promise<any> {
    return this.restangular.one('drivers/delivery/orders', orderDetailId).one('driver/location').get().toPromise();
  }
}
