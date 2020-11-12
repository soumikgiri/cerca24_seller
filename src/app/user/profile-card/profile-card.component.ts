import { Component, OnInit, Input } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.html'
})
export class ProfileCardComponent implements OnInit {
  @Input() user: any;

  // TODO - add option to query user from server by user id
  constructor(private toasty: ToastyService) { }

  ngOnInit() {
    // TODO - add event emitter listen the change
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
