import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { ShopService } from '../shop/shop.service';

@Injectable()
export class ShopPickupAddressResolver implements Resolve<Observable<any>> {
  constructor(private service: ShopService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.me()
      .then(resp => resp.data.pickUpAddress);
  }
}
