import { History, Controller } from 'cx/ui';

export default class extends Controller {
    onInit() {
        this.store.set('leagues', [
            { id: 1, name: 'A', players: 20 },
            { id: 2, name: 'B', players: 21 }
        ])
    }

    onClickLeague(e, {store}) {
        History.pushState({}, '', `~/league/${store.get('$record.id')}`);
    }
}