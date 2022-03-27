import * as io from 'socket.io-client';
import { Observable, Subscriber } from "rxjs";
import { Player } from '../../../models/games/pictionary';
import React from 'react';

const PICTIONARY_SERVER_URL = "http://localhost:3001/";

class SocketService extends React.Component {
    socket: any;

    constructor(props) {
        super(props);

        this.socket = io.connect(PICTIONARY_SERVER_URL);
    }

    toObservable(eventName: string): Observable<any> {
        return new Observable((subscriber: Subscriber<any>) => {
          this.socket.on(eventName, (data) => subscriber.next(data));
        });
    }
}

export class GameService extends SocketService {
    changeList(list: string) {
        this.socket.emit('game:useList', list);
    }

    getPlayer() {
        this.socket.emit('game:user');
        return super.toObservable('game:user');
    }

    getPlayerList() {
        this.socket.emit('game:userList');
        return super.toObservable('game:userList');
    }

    onGameEnd() {
        return super.toObservable('game:end');
    }

    onGameStart() {
        return super.toObservable('game:start');
    }

    onReceiveAnswer() {
        return super.toObservable('game:answer');
    }

    onReceiveStatusMessage() {
        return super.toObservable('game:status');
    }

    ready() {
        this.socket.emit('game:ready');
    }

    setUsername(name: string): string {
        this.socket.emit('game:setUsername', name);
        return name;
    }

    timeLeft() {
        return super.toObservable('game:timeLeft');
    }
}