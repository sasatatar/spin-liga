import { Controller } from 'cx/ui';
import { Grid } from 'cx/widgets';
import uuid from 'uuid';
import bergerTable from 'berger-table-generator';

import { players } from '../../data/players';

export default class extends Controller {
    onInit() {
        let players = this.store.get('players');

        this.addComputable('$page.schedule', ['schedule', '$page.filter'], (schedule, query) => {
            schedule = (schedule || [])
                .map(game => {
                    game = {...game}
                    game.teamA = players.find(p => p.id === game.teamA);
                    game.teamB = players.find(p => p.id === game.teamB);
                    game.result = `${game.result.teamA} - ${game.result.teamB}`
                    return game;
                })
            query = query ? query.toLowerCase() : null;
            return query 
                ? schedule
                    .filter(game => {
                        return (game.teamA.name || '').toLowerCase().includes(query) ||
                            (game.teamB.name || '').toLowerCase().includes(query)
                    })
                : schedule;
        });

        this.addTrigger('game', ['$page.gameId'], (gameId) => {
            let schedule = this.store.get('$page.schedule');
            let game = schedule.find(g => g.id === gameId);
            this.store.set('$page.game', { ...game });
        })
    }

    onGenerate () {
        var players = this.store.get('players');
        let ids = players.map(p => p.id);
        let schedule = bergerTable(ids)
            .reduce((acc, round) => [...acc, ...round]) // splat data
            .map(game => ({ 
                    ...game, 
                    id: uuid(), 
                    sets: Array.from({length: 5}).map((_, i) => ({ set: i+1, teamA: null, teamB: null })),
                    result: { teamA: '', teamB: '' }
                }));
        this.store.set('schedule', schedule);
        this.store.delete('$page.gameId');
    }




    onSaveResult() {
        let game = this.store.get('$page.game');
        let {sets} = game;
        let result = sets.reduce((acc, set) => {
            if (set.teamA > set.teamB) acc.teamA++;
            else if (set.teamA < set.teamB) acc.teamB++;
            return acc;
        }, {teamA: 0, teamB: 0})

        this.store.update('schedule', games => games.map(g => 
            g.id === game.id 
                ? {...g, sets, result} 
                : g
            ));
    }
}