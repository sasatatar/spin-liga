import { 
    VDOM,
    FirstVisibleChildLayout
 } from 'cx/ui';
import { 
    PureContainer,
    HtmlElement, 
    Route, RedirectRoute,
    FlexCol
} from 'cx/widgets';

import Controller from './Controller';
import Edit from './Edit';
import List from './List';

export default <cx>
    <PureContainer layout={FirstVisibleChildLayout} >
        <RedirectRoute route="+/players" url:bind="url" redirect="+/players/list" />
        <Route route="+/players/list" url:bind="url">
            <List />
        </Route>
        <Route route="+/players/:id" url:bind="url">
            <Edit />
        </Route>
    </PureContainer>
</cx>
