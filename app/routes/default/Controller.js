import { Controller } from 'cx/ui';
import {getPlayer} from '../../api';


function getRanking(map, key) {
    if (!map[key])
        map[key] = {
            // this does not return the updated player info, consider creating a player hash map as a computable
            // or rely on the firebase to propagate the change
            name: getPlayer(key).name, 
            wins: 0,
            losses: 0,
            points: 0,
            sets: {
                won: 0,
                lost: 0
            }
        };

    return map[key];
}

export default class extends Controller {
    onInit() {
        let players = this.store.get('players');

        this.addTrigger('rankings', ['schedule'], schedule => {
            let rankings = (schedule || []).reduce((acc, game) => {
                let {result} = game;
                if (result.teamA === '' || result.teamB === '')
                    return acc;
                
                let playerA = getRanking(acc, game.teamA);
                let playerB = getRanking(acc, game.teamB);
                
                if (result.teamA > result.teamB) {
                    playerA.wins++;
                    playerB.losses++;
                    playerA.points += 2;
                } else {
                    playerB.wins++;
                    playerA.losses++;
                    playerB.points += 2;
                }

                playerA.sets.won += result.teamA;
                playerA.sets.lost += result.teamB;
                playerB.sets.won += result.teamB;
                playerB.sets.lost += result.teamA;

                return acc;    
            }, {});

            rankings = Object.keys(rankings).map(key => { 
                let {sets} = rankings[key];
                return {   
                    id: key, 
                    ...rankings[key], 
                    setRatio: `${sets.won}:${sets.lost}` 
                }
            });
            rankings.sort((a,b) => {
                let d = a.wins - b.wins;
                if (d !== 0) return d;
                
                if (a.sets.won - a.sets.lost > b.sets.won - b.sets.lost) return 1;
                
                return -1;
            }).reverse();
            this.store.set('rankings', rankings);
        }, true);
    }
}