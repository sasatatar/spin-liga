import { Controller } from 'cx/ui';
import {getPlayer} from '../../api';

export default class extends Controller {
    onInit() {
        let players = this.store.get('players');

        this.addTrigger('ranking', ['schedule'], schedule => {
            let ranking = schedule.reduce((acc, game) => {
                let teamA = getPlayer(game.teamA);
                let teamB = getPlayer(game.teamB);
                if (!acc[teamA.id])
                    acc[teamA.id] = {
                        name: teamA.name
                    }
            }, {})
        })
    }
}