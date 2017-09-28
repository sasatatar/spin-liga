import { Controller, History } from 'cx/ui';

import { getPlayer, 
    postPlayer, 
    putPlayer, 
    deletePlayer,
    queryLeagues,
    putLeagues
} from 'app/api';

export default class extends Controller {
    onInit() {
        
        this.addTrigger('load', [], ::this.load, true);
        this.store.set('handOptions', [
            {
                id: 0,
                text: "Left-handed"
            },{
                id: 1,
                text: "Right-handed"
            }
        ]);
        
        var id = this.store.get('$root.$route.id');
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
                    data = data.val();
                    this.store.set('loading', false);
                    this.store.set('record', data);
                    this.store.set('oldLeagueId', data.leagueId);
                });
        }
        
        queryLeagues()
            .then(data => {
                data = data.val();
                if (!data) return;
                this.store.set('leaguesMap', { ...data });
                data = Object.keys(data).map(k => data[k]);
                this.store.set('leagues', data);
            })
            .catch(() => this.store.set('$page.loading', false));
    }

    onSave(e, {store}) {
        let id = this.store.get('$root.$route.id');
        let data = this.store.get('record');
        let oldLeagueId = this.store.get('oldLeagueId');
        let newLeagueId = data.leagueId;
        
        // update leagues playersCount if needed
        if (oldLeagueId && oldLeagueId !== data.leagueId) {
            let leagues = this.store.get('leaguesMap');
            let oldLeague = leagues[oldLeagueId];
            let newLeague = leagues[newLeagueId];
            leagues = {
                ...leagues,
                [oldLeagueId]: {
                    ...oldLeague,
                    playersCount: oldLeague.playersCount - 1
                },
                [newLeagueId]: {
                    ...newLeague,
                    playersCount: newLeague.playersCount + 1
                }
            };
            putLeagues(leagues);
        }

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
        // debugger;
        // // update leagues playersCount
        // let data = this.store.get('record');
        // let leagues = this.store.get('leaguesMap');
        // let { leagueId } = data;
        // let league = leagues[leagueId];
        // leagues = {
        //     ...leagues,
        //     [leagueId]: {
        //         ...league,
        //         playersCount: league.playersCount - 1
        //     }
        // };
        // putLeagues(leagues);
        
        // let id = this.store.get('record.id');
        // if (id) {
        //     return deletePlayer(id)
        //         .then(() => {
        //             this.onCancel();
        //         });
        // }
        console.log('---------------+++++++++++++++++ test')
    }

    onCancel() {
        History.pushState({}, null, "~/admin/players/list");
    }
}
