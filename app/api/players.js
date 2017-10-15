import {database} from './firebase';

const dataRef = database.ref('/players');

export function queryPlayers(leagueId) {
    return new Promise((resolve, reject) => {
        getPlayersMap(leagueId)
            .then((data={}) => {
                resolve(Object.keys(data).map(k => data[k]));
            })
            .catch(e => reject(e));
    });
}

export function getPlayersMap(leagueId) {
    let dataReference = leagueId 
        ? dataRef.orderByChild('leagueId').equalTo(leagueId)
        : dataRef;
    return new Promise((resolve, reject) => {
        dataReference.once("value")
            .then(snapshot => {
                let data = snapshot.val();
                resolve(data);
            })
            .catch(e => reject(e));
    });
}

export function getPlayer(key) {
    return new Promise((resolve, reject) => {
        dataRef.child(key).once("value")
            .then(snapshot => {
                let data = snapshot.val() || {};
                resolve(data);
            })
            .catch((e) => reject(e));
    });
}

export function postPlayer(data) {
   let item = dataRef.push();
   return item.set({ ...data, id: item.key });
}

export function putPlayer(key, data) {
   return dataRef.update({ [key]: data });
}

export function deletePlayer(key) {
   return dataRef.child(key).remove();
}