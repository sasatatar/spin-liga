import { History, Controller } from 'cx/ui';

export default class extends Controller {
    onInit() {
        this.store.set('leagues', [
            { id: 'A', name: 'A', players: 20 },
            { id: 'B', name: 'B', players: 21 }
        ])
    }

    onClickLeague(e, {store}) {
        History.pushState({}, '', `~/leagues/${store.get('$record.id')}`);
    }
}