import { Controller, History } from 'cx/ui';
import { 
    queryCallgroups
} from 'app/api';

export default class extends Controller {
    onInit() {
        this.addTrigger('load', [], ::this.load, true);

        this.store.init('$page.page', 1);
        this.store.init('$page.take', 50);
        this.store.init('$page.filter', { query: null });

        this.addTrigger('page', ['$page.take', '$page.sortField', '$page.sortDirection', '$page.filter'], () => {
            this.store.set('$page.page', 1);
        }, true);

        this.addTrigger('pagination', ['$page.take', '$page.page', '$page.sortField', '$page.sortDirection', '$page.filter'], () => { 
            this.load(); 
        });

    }

    load() {
        let page = this.store.get('$page.page'),
            take = this.store.get('$page.take'),
            sortField = this.store.get('$page.sortField'),
            sortDirection = this.store.get('$page.sortDirection'),
            filter = this.store.get('$page.filter.query');
        
        this.store.set('$page.loading', true);
        queryCallgroups({
            q: filter,
            page: page,
            take: take,
            sortField: sortField,
            sortDirection: sortDirection
        })
        .catch(() => this.store.set('$page.loading', false))
        .then(data => {
            this.store.set('$page.data', data.slice(0, take));
            this.store.set('$page.pageCount', data.length > take ? page + 1 : page);
            this.store.set('$page.loading', false);
        });
    }

    onAdd() {
        History.pushState({}, null, '~/callgroups/new')
    }

    onEdit(e, {store}) {
        let id = store.get('$record.id') || store.get('$page.selected');
        History.pushState({}, null, `~/callgroups/${id}`);
    }
}
