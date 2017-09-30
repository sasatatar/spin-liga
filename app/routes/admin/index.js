import { VDOM, FirstVisibleChildLayout } from 'cx/ui';
import {Route, RedirectRoute, PureContainer} from 'cx/widgets';

import Leagues from './leagues';
import Players from './players';
import Games from './games';

export default <cx>
	<PureContainer layout={FirstVisibleChildLayout} >
		<Route route="~/admin" prefix url:bind="url" if:expr="{user.isAdmin}" >
			<RedirectRoute route="~/admin" url:bind="url" redirect="+/leagues" />
			<Leagues />
			<Players />
			<Games />
		</Route>
	</PureContainer>
</cx>;