import { VDOM } from 'cx/ui';
import {Route, RedirectRoute} from 'cx/widgets';

import Leagues from './leagues';
import Players from './players';
// import Games from './games';

export default <cx>
	<Route route="~/admin" prefix url:bind="url" if:expr="{user.isAdmin}" >
		<RedirectRoute route="~/admin" url:bind="url" redirect="+/leagues" />
		<Leagues />
		<Players />
	</Route>
	<RedirectRoute route="~/admin/(*splat)" prefix url:bind="url" redirect="~/sign-in" />
</cx>;