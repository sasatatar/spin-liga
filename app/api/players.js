// import casual from 'casual-browserify';
// export const players = Array.from({length: 16}).map((e, i) => {
//     return {
//         id: i+1,
//         name: casual.full_name,
//         born: new Date(1970 + Math.round(30*Math.random()), Math.round(12*Math.random()), Math.round(Math.random()*31)).toISOString(),
//         weight: 75 + Math.round(15*Math.random()),
//         height: 175 + Math.round(15*Math.random()),
//         hand: Math.random() >= 0.35 ? 'right': 'left',
//     }
// });

// export function loadPlayers(q) {
//     return new Promise(resolve => {
//        let result = players;
//        //simulate server response delay
//        setTimeout(() => resolve(result), 100);
//     });
//  }

//  let playerMap = {};

//  players.forEach(p => playerMap[p.id] = p);

//  export function getPlayer(id) {
//      return playerMap[id] ? playerMap[id] : null;
//  }

import {database} from './firebase';

const dataRef = database.ref('/players');

export function queryPlayers() {
    return new Promise((resolve, reject) => {
        dataRef.once("value")
        .then(snapshot => {
            let data = snapshot.val() || [];
            resolve(Object.keys(data).map(k => data[k]));
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