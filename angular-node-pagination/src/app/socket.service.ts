import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from './message';
import {Observable, Subject } from 'rxjs';
import {environment} from '../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  public nodeDetails = new Subject<Object>();
  public nodeDetails$ = this.nodeDetails.asObservable();
  dataNode: any;

  socket;
  constructor() {}

  setupSocketConnection() {
    console.log('socket service calling');
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.emit('my message', 'Hello there from Angular.');

    this.socket.on('my broadcast', (data: object) => {
      console.log('client broadcast')
      this.dataNode = data;
      this.nodeDetails.next(this.dataNode);
    });
  }
}
