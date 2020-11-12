import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopRoutingModule } from './shop.routing';
import { ShopService } from './shop.service';
import { UserService } from '../user/user.service';
import { ShopUpdateComponent } from './shop-update/shop-update.component';
import { ShopBankInfoComponent } from './shop-update/shop-bank-info/shop-bank-info.component';
import { ShopBasicInfoComponent } from './shop-update/shop-basic-info/shop-basic-info.component';
import { ShopBusinessInfoComponent } from './shop-update/shop-business-info/shop-business-info.component';
import { ShopSocialInfoComponent } from './shop-update/shop-social-info/shop-social-info.component';
import { ShopShippingInfoComponent } from './shop-update/shop-shipping-info/shop-shipping-info.component';
import { ShopNotificationInfoComponent } from './shop-update/shop-notification-info/shop-notification-info.component';
import { LocationService } from '../shared/services/location.service';
import { MediaModule } from '../media/media.module';
import { ReviewModule } from '../review/review.module';
import { UtilsModule } from '../utils/utils.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShopResolver } from './shop.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // our custom module
    ShopRoutingModule,
    NgbModule.forRoot(),
    MediaModule,
    ReviewModule,
    UtilsModule,
    NgSelectModule
  ],
  declarations: [
    ShopUpdateComponent,
    ShopBankInfoComponent,
    ShopBasicInfoComponent,
    ShopBusinessInfoComponent,
    ShopSocialInfoComponent,
    ShopShippingInfoComponent,
    ShopNotificationInfoComponent
  ],
  providers: [ShopService, UserService, LocationService, ShopResolver],
  exports: [
    ShopBankInfoComponent,
    ShopBasicInfoComponent,
    ShopBusinessInfoComponent,
    ShopSocialInfoComponent,
    ShopShippingInfoComponent,
    ShopNotificationInfoComponent
  ]
})
export class ShopModule { }
