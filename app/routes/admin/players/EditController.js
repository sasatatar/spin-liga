import { Controller, History } from 'cx/ui';

import { getPlayer, 
    postPlayer, 
    putPlayer, 
    deletePlayer,
    queryLeagues,
    putLeague
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
                    this.store.set('loading', false);
                    this.store.set('record', data);
                    this.store.set('oldLeagueId', data.leagueId);
                })
                .catch(() => this.store.set('$page.loading', false));
        }
        
        queryLeagues()
            .then(data => {
                this.store.set('leagues', data);
            })
            .catch(() => this.store.set('$page.loading', false));
    }

    onSave(e, {store}) {
        let id = this.store.get('$root.$route.id');
        let data = this.store.get('record');
        let oldLeagueId = this.store.get('oldLeagueId');
        let newLeagueId = data.leagueId;
        
        // update leagues' playersCount if needed
        let leagues = this.store.get('leagues');
        if (id === 'new') {
            let newLeagueId = data.leagueId;
            let league = leagues.find(league => league.id == newLeagueId);
            league.playersCount += 1;
            putLeague(league.id, league);
        } else if (oldLeagueId && oldLeagueId !== data.leagueId) {
            let oldLeague = leagues.find(league => league.id == oldLeagueId);
            let newLeague = leagues.find(league => league.id == newLeagueId);
            oldLeague.playersCount -= 1;
            newLeague.playersCount += 1;
            putLeague(oldLeague.id, oldLeague);
            putLeague(newLeague.id, newLeague);
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
        //update leagues' playersCount
        let data = this.store.get('record');
        let leagues = this.store.get('leagues');
        let { leagueId } = data;
        let league = leagues.find(league => league.id == leagueId);
        league.playersCount -= 1;
        putLeague(league.id, league);
        
        let id = this.store.get('record.id');
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
