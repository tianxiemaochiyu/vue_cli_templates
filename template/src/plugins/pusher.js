/**
 * Created by catscorpio on 2019/3/18.
 */
import io from 'socket.io-client';
class Pusher {
    constructor(io) {
        this.socket = io.connect();
    }
    on(channel, callback){
        if(this.socket.connected){
            this.socket.on(channel, callback)
        }else {
            this.socket.on('connect', () => this.socket.on(channel, callback))
        }
    }
}
export default new Pusher(io)