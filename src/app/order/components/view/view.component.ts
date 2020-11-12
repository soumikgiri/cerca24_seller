import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { DeliveryHistoryComponent } from '../delivery-history/delivery-history.component';
import * as _ from 'lodash';

@Component({
  selector: 'view',
  templateUrl: './view.html'
})
export class ViewComponent implements OnInit {

  public isSubmitted: boolean = false;
  public order: any = {
    // pickUpAddressObj: {},
    reStatus: ''
    // shopPickupAddress: []
  };
  public avatarUrl: any;
  public isOption: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private modalService: NgbModal,
    private toasty: ToastyService
  ) {
    const id = this.route.snapshot.params.id;
    this.orderService.findOne(id).then((res) => {
      this.order = res.data;
      this.order.reStatus = res.data.status;
      // if (this.route.snapshot.data.shopPickupAddress) {
      //   this.order.shopPickupAddress = this.route.snapshot.data.shopPickupAddress;
      // }
      // if (this.order.pickUpAddressObj) {
      //   this.isOption = false;
      // }
      // *! Change pickup address object to string
      if (this.order.pickUpAddress) {
        this.order.pickUpAddressToString =
          this.order.pickUpAddress.street + ', ' +
          this.order.pickUpAddress.area + ', ' +
          this.order.pickUpAddress.city;
      }
      if (this.order.pickUpAddressObj) {
        this.order.pickUpAddressToString =
          this.order.pickUpAddressObj.street + ', ' +
          this.order.pickUpAddressObj.area + ', ' +
          this.order.pickUpAddressObj.city;
      }
      // *!
      this.avatarUrl = res.data.productDetails.mainImage ? res.data.productDetails.mainImage.mediumUrl : '/assets/images/background/user-info.jpg';
    })

  }

  ngOnInit() { }

  // query(pickUpAddressObj: any) {
  query() {
    let data: any = { status: this.order.status };
    // if (this.order.status === 'progressing' && !pickUpAddressObj) {
    //   return this.toasty.error('Please select pickup address for delivery company!');
    // }

    // if (this.order.status === 'progressing' && pickUpAddressObj) {
    //   data.pickUpAddressObj = pickUpAddressObj;
    //   this.isOption = false;
    // }

    // if (this.order.status !== 'progressing' && this.order.pickUpAddressObj) {
    //   data.pickUpAddressObj = {};
    //   this.order.pickUpAddressObj = null;
    //   this.isOption = true;
    // }

    this.orderService.updateStatus(this.order._id, data).then(resp => {
      this.toasty.success('Updated status successfuly!');
    }).catch((err) => {
      this.order.status = this.order.reStatus;
      this.toasty.error(err.data.message || 'Something went wrong, please try again!')
    });
  }

  // updatePickupAddress() {
  //   this.isOption = true;
  // }

  openMap(item) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(MapModalComponent, ngbModalOptions);
    modalRef.componentInstance.orderDetailId = item._id;
  }

  openHistoryStatus(item: any) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(DeliveryHistoryComponent, ngbModalOptions);
    modalRef.componentInstance.options = {
      historyStatus: item.deliveryHistory,
      trackingCode: item.trackingCode,
      productName: item.productDetails.name
    }
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
