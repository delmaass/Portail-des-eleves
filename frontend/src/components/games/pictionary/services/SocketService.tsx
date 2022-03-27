import React from "react";
import { Observable, Subscriber } from "rxjs";
import * as io from 'socket.io-client';

const PICTIONARY_SERVER_URL = "http://localhost:3001/";

 export class SocketService extends React.Component {
    socket: any;

    constructor(props) {
        super(props);

        this.socket = io.connect(PICTIONARY_SERVER_URL);
    }

    disconnect() {
        this.socket.emit("disconnect");
    }

    toObservable(eventName: string): Observable<any> {
        return new Observable((subscriber: Subscriber<any>) => {
          this.socket.on(eventName, (data) => subscriber.next(data));
        });
    }
}