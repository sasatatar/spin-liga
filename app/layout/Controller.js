import {Controller} from 'cx/ui';
//import { loadPlayers } from '../api';
import { navFactory } from '../util/navFactory';

export default class extends Controller {
   onInit() {
      this.store.init("layout.aside.open", window.innerWidth >= 800);
      //loadPlayers()
      //  .then(players => this.store.init('players', players));

      this.addTrigger('navigation', ['url'], () => {
         if (window.innerWidth < 800)
            this.store.set('layout.aside.open', false);
      });

      this.addComputable('navItems', ['user.isAdmin'], navFactory);
   }

   onMainClick(e, {store}) {
      if (window.innerWidth < 800)
         store.set('layout.aside.open', false);
   }
}
