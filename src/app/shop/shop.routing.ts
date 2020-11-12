import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopUpdateComponent } from './shop-update/shop-update.component';
import { ShopResolver } from './shop.resolver';

const routes: Routes = [
  {
    path: 'update', component: ShopUpdateComponent,
    data: {
      title: 'Shop Update',
      urls: [{ title: 'Profile Update' }]
    },
    resolve: {
      shop: ShopResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
