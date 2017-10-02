import { database } from "./firebase";

const dataRef = database.ref("/leagues");

export function queryLeagues() {
    return new Promise((resolve, reject) => {
        dataRef.once("value")
        .then(snapshot => {
            let data = snapshot.val() || [];
            resolve(Object.keys(data).map(k => data[k]));
        })
        .catch(e => reject(e));
    });
}

export function getLeague(key) {
    return new Promise((resolve, reject) => {
        dataRef.child(key).once("value")
            .then(snapshot => {
                let data = snapshot.val() || {};
                resolve(data);
            })
            .catch((e) => reject(e));
    });
}

export function postLeague(data) {
    let league = dataRef.push();
    return league.set({ ...data, id: league.key });
}

export function putLeague(key, data) {
    return dataRef.update({ [key]: data });
}

export function putLeagues(data) {
    return dataRef.set(data);
}

export function deleteLeague(key) {
    return dataRef.child(key).remove();
}
