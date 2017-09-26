import {database} from './firebase';

const dataRef = database.ref('/leagues');

export function queryLeagues() {
   return dataRef.once('value');
}

export function getLeague(key) {
   return dataRef.child(key).once('value');
}

export function postLeague(data) {
   let league = dataRef.push();
   return league.set({ ...data, id: league.key });
}

export function putLeague(key, data) {
   return dataRef.update({ [key]: data });
}

export function deleteLeague(key) {
   return dataRef.child(key).remove();
}
