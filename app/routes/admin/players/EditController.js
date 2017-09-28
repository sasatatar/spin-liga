import { Controller, History } from 'cx/ui';

import { getPlayer, 
    postPlayer, 
    putPlayer, 
    deletePlayer,
    queryLeagues
} from 'app/api';

export default class extends Controller {
    onInit() {
        
        this.addTrigger('load', [], ::this.load, true);
        this.store.set('handOptions', [
            {
                id: 0,
                text: "Ljevoruk"
            },{
                id: 1,
                text: "Desnoruk"
            }
        ])
    }

    load() {
        var id = this.store.get('$root.$route.id');
        if (id == 'new') {
            this.store.set('record', {});
        }
        else {
            this.store.set('loading', true);
            getPlayer(id)
                .then((data) => {
                    this.store.set('loading', false);
                    this.store.set('record', data.val());
                    this.store.set('init', true);
                });
        }
        
        queryLeagues()
            .then(data => {
                data = data.val();
                if (!data) return;
                data = Object.keys(data).map(k => data[k]);
                this.store.set('leagues', data);
            })
            .catch(() => this.store.set('$page.loading', false));
    }

    onSave(e, {store}) {
        let id = this.store.get('$root.$route.id');
        console.log('-----------------------', id)
        let data = this.store.get('record');

        let postData = {
            ...data
        };

        let promise;

        if (id == 'new') {
            promise = postPlayer(postData);
        } else {
            promise = putPlayer(postData.id, postData);
        }

        return promise
            .then(()=>{
                this.onCancel();
            });
    }

    onDelete() {
        let id = this.store.get('record.id');
        console.log('-----------------------', id)
        if (id) {
            return deletePlayer(id)
                .then(() => {
                    this.onCancel();
                });
        }
    }

    onCancel() {
        History.pushState({}, null, "~/admin/players/list");
    }
}
