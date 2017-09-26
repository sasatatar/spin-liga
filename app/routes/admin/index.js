import { VDOM } from 'cx/ui';
import {Route, RedirectRoute} from 'cx/widgets';

import Leagues from './leagues';
// import Players from './players';
// import Games from './games';

export default <cx>
	<Route route="~/admin" prefix url:bind="url" >
		<RedirectRoute route="~/admin" url:bind="url" redirect="+/leagues" />
		<Leagues />
	</Route>
</cx>;