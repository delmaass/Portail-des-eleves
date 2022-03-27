import { SocketService } from "./SocketService";

export class GameService extends SocketService {
    constructor(socketService) {
        super(socketService)

        this.socket = socketService.socket;
    }

    changeList(list: string) {
        this.socket.emit('game:useList', list);
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

    isPlaying() {
        this.socket.emit('game:isPlaying');
        return super.toObservable('game:isPlaying');
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