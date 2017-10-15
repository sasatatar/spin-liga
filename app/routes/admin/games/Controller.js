import { Controller, History } from 'cx/ui';
import {queryLeagues, queryPlayers, getPlayersMap, queryGames} from 'app/api';
import bergerTable from 'berger-table-generator';

export default class extends Controller {
    onInit() {        
        this.addTrigger('load', [], ::this.load, true);

        this.addComputable('filteredData', ['data', 'filter'], (data=[], q) => {
            if (!q) return data;
            return data.filter(item => item.name.toLowerCase().includes(q.toLowerCase()));
        });

        this.addTrigger('games', ['leagueId'], leagueId => {
            if (!leagueId) return;
            this.store.set('loading', true);
            queryGames(leagueId)
                .catch(() => this.store.set('loading', false))
                .then(data => {
                    this.store.set('loading', false);
                    this.store.set('games', data);
                });
        }, true);

        this.addTrigger('players', ['leagueId'], leagueId => {
            if (!leagueId) return;
            this.store.set('loading', true);
            getPlayersMap(leagueId)
                .catch(() => this.store.set('loading', false))
                .then(data => {
                    this.store.set('loading', false);
                    this.store.set('playersMap', data);
                });
        }, true);
    }

    async load() {
        this.store.set('loading', true);
        let leagues = await queryLeagues();
        this.store.set('leagues', leagues);
        this.store.init('leagueId', leagues[0].id);
        let leagueId = this.store.get('leagueId');
        this.store.set('loading', false);
    }

    onGenerate() {
        History.pushState({}, null, '~/admin/leagues/new')
    }

    onEdit(e, {store}) {
        let id = store.get('$record.id') || store.get('selected');
        History.pushState({}, null, `~/admin/games/${id}`);
    }
}
