import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { ListingComponent } from './components/listing/listing.component';
import { ShopPickupAddressResolver } from './shopPickupAddress.resolver';

const routes: Routes = [
  {
    path: 'list',
    component: ListingComponent,
    data: {
      title: 'Order manager',
      urls: [{ title: 'Orders', url: '/orders/list' }]
    }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    data: {
      title: 'Order manager',
      urls: [{ title: 'Orders', url: '/orders/list' }, { title: 'Detail', url: ' / orders / view /: id' }]
    },
    resolve: {
      shopPickupAddress: ShopPickupAddressResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
