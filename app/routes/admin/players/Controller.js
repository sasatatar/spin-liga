import { Controller, History } from 'cx/ui';
import {queryPlayers, queryLeagues} from 'app/api';

export default class extends Controller {
    onInit() {
        this.addTrigger('load', [], ::this.load, true);

        this.addComputable('$page.filteredData', ['$page.data', '$page.filter'], (data=[], q) => {
            if (!q) return data;
            return data.filter(item => item.name.toLowerCase().includes(q.toLowerCase()));
        });
    }

    load() {
        this.store.set('$page.loading', true);
        Promise.all([queryPlayers(), queryLeagues()])
            .catch(() => this.store.set('$page.loading', false))
            .then(([players, leagues]) => {
                this.store.set('$page.loading', false);
                players = players.val();
                leagues = leagues.val();
                if (!(players && leagues)) return;
                players = Object.keys(players).map(k => {
                    let player = players[k];
                    return {
                        ...player,
                        leagueName: leagues[player.leagueId].name
                    }    
                });
                this.store.set('$page.data', players);
            });
            
    }

    onAdd() {
        History.pushState({}, null, '~/admin/players/new')
    }

    onEdit(e, {store}) {
        let id = store.get('$record.id') || store.get('$page.selected');
        History.pushState({}, null, `~/admin/players/${id}`);
    }
}
