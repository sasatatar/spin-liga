import {database} from './firebase';

const dataRef = database.ref('/games');

export function queryGames(leagueId) {
    return new Promise((resolve, reject) => {
        dataRef.once("value")
        .then(snapshot => {
            let data = snapshot.val() || [];
            resolve(Object.keys(data).map(k => data[k]));
        })
        .catch(e => reject(e));
    });
}

export function getGame(key) {
    return new Promise((resolve, reject) => {
        dataRef.child(key).once("value")
            .then(snapshot => {
                let data = snapshot.val() || {};
                resolve(data);
            })
            .catch((e) => reject(e));
    });
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
