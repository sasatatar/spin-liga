import { Controller, History } from 'cx/ui';
import {queryLeagues} from 'app/api';

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
        queryLeagues()
        .catch(() => this.store.set('$page.loading', false))
        .then(data => {
            //debugger;
            data = data.val();
            data = Object.keys(data).map(k => data[k]);
            this.store.set('$page.data', data);
            this.store.set('$page.loading', false);
        });
    }

    onAdd() {
        History.pushState({}, null, '~/admin/leagues/new')
    }

    onEdit(e, {store}) {
        let id = store.get('$record.id') || store.get('$page.selected');
        History.pushState({}, null, `~/admin/leagues/${id}`);
    }
}
