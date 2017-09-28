import { Controller, History } from 'cx/ui';

import { getCallgroup, 
    postCallgroup, 
    putCallgroup, 
    deleteCallgroup,
    getCallgroupMembers
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
            Promise.all([
                getCallgroup(id),
                getCallgroupMembers(id)
            ])
            .catch(() => this.store.set('loading', false))
            .then(([data, members]) => {
                this.store.set('record', data);
                this.store.set('members', members);
                this.store.set('loading', false);
                this.store.set('init', true);
            });
        }
    }

    onSave(e, {store}) {
        let id = this.store.get('$root.$route.id');
        let data = this.store.get('record');

        this.store.set('error.show', false);

        let postData = {
            ...data
        };

        let promise;

        if (id == 'new') {
            promise = postCallgroup(postData);
        } else {
            promise = putCallgroup(id, postData);
        }

        return promise
            .then(()=>{
                this.onCancel();
            });
    }

    onDelete() {
        let id = this.store.get('$root.$route.id');
        if (id) {
            return deleteCallgroup(id)
                .then(() => {
                    this.onCancel();
                });
        }
    }

    onCancel() {
        History.pushState({}, null, "~/callgroups/list");
    }
}
