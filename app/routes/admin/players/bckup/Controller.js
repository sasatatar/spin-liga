import { Controller } from 'cx/ui';
import uuid from 'uuid';
export default class extends Controller {
    onInit() {
        this.addTrigger('$page.form', ['$page.id', 'players'], (id, records) => {
            this.store.set('$page.form', records.find(a => a.id == id));
        });

        this.addComputable('$page.players', ['players', '$page.filter'], (players, query) => {
            return query 
                ? players
                    .filter(player => {
                        query = query.toLowerCase();
                        return (player.name || '').toLowerCase().includes(query)
                    })
                : players;
        })
    }

    onEdit(e) {
        this.store.set('$page.showForm', true);
    }

    onAdd () {
        this.store.set('$page.showForm', true);
        this.store.set('$page.id', null);
        var players = this.store.get('players');
        this.store.set('$page.form', {});
    }

    onSave() {
        this.store.set('$page.showForm', false);
        let player = this.store.get('$page.form');
        this.store.update('players', players => players.find(e => e.id === player.id) 
                                                ? players.map(p => p.id === player.id ? player : p) 
                                                : [...players, {...player, id: uuid()}]);
    }
}