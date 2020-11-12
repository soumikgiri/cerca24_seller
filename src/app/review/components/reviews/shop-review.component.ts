import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../review.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'shop-review',
  templateUrl: './review.html'
})
export class ShopReviewComponent implements OnInit {

  @Input() shopId: string = "";
  public reviews = [];
  public page: number = 1;
  public take: number = 5;
  public total: any;
  public isLoading: any = true;

  constructor(private router: Router, private reviewService: ReviewService, private toasty: ToastyService) {

  }

  ngOnInit() {
    this.query();
  }

  query() {
    let params = {
      shopId: this.shopId,
      page: this.page,
      take: this.take,
      type: 'shop'
    };
    this.reviewService.find(params).then((res) => {
      this.isLoading = false;
      this.reviews = res.data.items;
      this.total = res.data.count;
    })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
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
