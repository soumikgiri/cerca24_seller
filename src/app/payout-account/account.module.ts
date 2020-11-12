import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'angular-sortablejs';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AccountRoutingModule } from './account.routing';

import { AccountCreateComponent } from './components/form/create.component';
import { AccountUpdateComponent } from './components/form/update.component';
import { AccountsComponent } from './components/listing/listing.component';

import { AccountService } from './services/account.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortablejsModule,
    //our custom module
    AccountRoutingModule,
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [
    AccountCreateComponent,
    AccountUpdateComponent,
    AccountsComponent
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
