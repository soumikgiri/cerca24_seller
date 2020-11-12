import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';
import { AuthService } from '../../shared/services';

@Component({
  selector: 'shop-update',
  templateUrl: './shop-update.html'
})
export class ShopUpdateComponent implements OnInit {
  public isSubmitted = false;
  public shop: any = {};
  public tab: string = 'basic';
  public twitterConnectLink = '';
  public socialConnected: any = {};

  constructor(private route: ActivatedRoute, private shopService: ShopService, private authService: AuthService) {
     this.shop = this.route.snapshot.data.shop || {};
     this.socialConnected = this.shop.socialConnected;
   }

  ngOnInit() {
    const redirectUrl = window.location.href;
    const accessToken = this.authService.getAccessToken();
    this.twitterConnectLink = `${window.appConfig.apiBaseUrl}/connect/twitter?access_token=${accessToken}&redirectUrl=${redirectUrl}`;
  }

  changeTab(tab: string) {
    this.tab = tab;
  }

  onConnected(data) {
    this.socialConnected[data.platform] = data.success;
  }
}
