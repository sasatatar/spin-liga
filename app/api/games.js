import {database} from './firebase';

const dataRef = database.ref('/games');

export function queryGames() {
   return dataRef.once('value');
}

export function getGame(key) {
   return dataRef.child(key).once('value');
}

export function postGame(data) {
   let item = dataRef.push();
   return item.set({ ...data, id: item.key });
}

export function putGame(key, data) {
   return dataRef.update({ [key]: data });
}

export function putGames(data) {
   return dataRef.set(data);
}

export function deleteGame(key) {
   return dataRef.child(key).remove();
}
