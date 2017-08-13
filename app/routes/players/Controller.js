import { Controller } from 'cx/ui';
import uuid from 'uuid';

import { players } from '../../data/players';

export default class extends Controller {
    onInit() {
        this.store.init('$page.players', players);

        this.addTrigger('$page.form', ['$page.id', '$page.players'], (id, records) => {
            this.store.set('$page.form', records.find(a => a.id == id));
        });

    }

    onEdit(e) {
        this.store.set('$page.showForm', true);
    }

    onAdd () {
        this.store.set('$page.showForm', true);
        this.store.set('$page.id', null);
        var players = this.store.get('$page.players');
        this.store.set('$page.form', {});
    }

    onSave() {
        this.store.set('$page.showForm', false);
        let player = this.store.get('$page.form');
        this.store.update('$page.players', players => players.find(e => e.id === player.id) 
                                                ? players.map(p => p.id === player.id ? player : p) 
                                                : [...players, {...player, id: uuid()}]);
    }
}