import { Controller } from 'cx/ui';
import { Grid } from 'cx/widgets';
import uuid from 'uuid';
import bergerTable from 'berger-table-generator';

import { players } from '../../data/players';

export default class extends Controller {
    onInit() {
        this.store.init('players', players);

        this.addComputable('$page.schedule', ['schedule', '$page.filter'], (schedule, query) => {
            return (schedule || []).filter(game => {
                if (!query)
                    return true;
                query = query.toLowerCase();
                return (game.teamA.name || '').toLowerCase().includes(query) ||
                    (game.teamB.name || '').toLowerCase().includes(query)
            });
        });

    }

    onGenerate () {
        var players = this.store.get('players');
        let schedule = bergerTable(players).reduce((acc, round) => [...acc, ...round]);
        this.store.set('schedule', schedule);
    }




    onSave() {
        this.store.set('$page.showForm', false);
        let player = this.store.get('$page.form');
        this.store.update('players', players => players.find(e => e.id === player.id) 
                                                ? players.map(p => p.id === player.id ? player : p) 
                                                : [...players, {...player, id: uuid()}]);
    }
}