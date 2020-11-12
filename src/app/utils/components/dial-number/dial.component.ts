import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { AuthService } from '../../../shared/services';
import * as _ from 'lodash';

@Component({
  selector: 'dial-code',
  templateUrl: './dial.html'
})
export class DialCodeComponent implements OnInit, OnChanges {
  @Output() selectCode = new EventEmitter();
  @Input() dial: any = null;

  public dialCodes: any = [];
  public dialCode: any = '+260';
  // public flag: any = '/assets/images/flags/us.svg';

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.inputDial(this.dial);
    this.dialCodes = this.authService.getDialCodes();
  }
  ngOnChanges() {
    this.inputDial(this.dial);
  }

  inputDial(dial: any) {
    if (dial) {
      this.dialCode = dial;
    }
  }
  selectDial(dial: any) {
    this.dialCode = dial.dialCode;
    this.selectCode.emit(this.dialCode);
    // this.flag = `/assets/images/flags/${dial.code.toLowerCase()}.svg`;
  }
}
