import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { ConversationService } from '../../services/conversation.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../shared/services/auth.service';
import { PusherService } from '../../services/pusher.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'messages',
  templateUrl: './messages.html'
})
export class MessagesComponent implements OnInit {
  @Input() conversation: any;
  public items: any = [];
  public page: any = 1;
  public pageSize: any = 10;
  public total = 0;
  public currentUser: any = {};
  public newText: any = '';

  private conversationSubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private service: MessageService,
    private conversationService: ConversationService,
    private pusher: PusherService,
    private toasty: ToastyService
  ) {
    this.conversationSubscription = conversationService.conversationLoaded$.subscribe((data) => {
      if (this.conversation && this.conversation._id === data._id) {
        return;
      }

      this.conversation = data;
      this.items = [];
      this.query();
    });
    authService.getCurrentUser().then(resp => this.currentUser = resp);
    pusher.messages.subscribe(data => {
      if (data.conversationId === this.conversation._id) {
        this.items.push(data);
      }
    });
  }

  ngOnInit() {
    if (this.conversation) {
      this.query();
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.conversationSubscription.unsubscribe();
  }

  query() {
    this.service.listByConversation(this.conversation._id, {
      page: this.page,
      take: this.pageSize
    }).then((resp) => {
      this.total = resp.data.count;
      this.items = resp.data.items.reverse().concat(this.items);
    });
  }

  send() {
    if (!this.newText) {
      return;
    }

    this.service.send({
      text: this.newText,
      type: 'text',
      conversationId: this.conversation._id
    }).then((resp) => {
      this.items.push(resp.data);
      this.newText = '';
    });
  }

  public enterToSend(event) {
    if (event.charCode === 13) {
      this.send();
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
