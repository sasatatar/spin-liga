import { Controller, History } from 'cx/ui';

import { getLeague, 
    postLeague, 
    putLeague, 
    deleteLeague,
    getLeagueMembers
} from 'app/api';

export default class extends Controller {
    onInit() {
        this.store.set('init', false);
        this.addTrigger('load', [], ::this.load, true);
    }

    load() {
        var id = this.store.get('$root.$route.id');
        if (id == 'new') {
            this.store.set('record', {});
        }
        else {
            this.store.set('loading', true);
            getLeague(id)
                .then((data) => {
                    this.store.set('record', data);
                    this.store.set('loading', false);
                    this.store.set('init', true);
                });
        }
    }

    onSave(e, {store}) {
        let id = this.store.get('$root.$route.id');
        let data = this.store.get('record');

        let postData = {
            ...data
        };

        let promise;

        if (id == 'new') {
            promise = postLeague(postData);
        } else {
            promise = putLeague(postData.id, postData);
        }

        return promise
            .then(()=>{
                this.onCancel();
            });
    }

    onDelete() {
        let id = this.store.get('record.id');
        if (id) {
            return deleteLeague(id)
                .then(() => {
                    this.onCancel();
                });
        }
    }

    onCancel() {
        History.pushState({}, null, "~/admin/leagues/list");
    }
}
