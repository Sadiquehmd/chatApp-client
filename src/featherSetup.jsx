import feathers from '@feathersjs/client';
import io from 'socket.io-client';


export const socket = io("http://localhost:3000");
export const client = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.authentication());