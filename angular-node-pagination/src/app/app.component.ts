import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newMessage: string;
  messageList:  string[] = [];
  nodeData: any;
  nodedataArray: any[]=[];
  collection = { count: 20, data: this.nodedataArray };
  config:any;

  constructor(private socket: Socket, private socketService: SocketService){
    this.socketService.nodeDetails$.subscribe((e: any) => {
    this.nodeData = e['obj'];
    if(this.nodedataArray.length <= 20) {
      this.nodedataArray.push(this.nodeData)
    }
    console.log('data came to nodedataArray',this.nodedataArray);
    });

    this.config = {
      itemsPerPage: 2,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }
  title = 'angular-node-pagination';

  sendMessage() {
    this.socketService.setupSocketConnection();
  }

  ngOnInit() {
    console.log('collection', this.collection)
  }

  pageChanged(event){
    console.log('event',event);
    this.config.currentPage = event;
  }
}
