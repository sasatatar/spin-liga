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
        <RedirectRoute route="+/leagues" url:bind="url" redirect="+/leagues/list" />
        <Route route="+/leagues/list" url:bind="url">
            <List />
        </Route>
        <Route route="+/leagues/:id" url:bind="url">
            <Edit />
        </Route>
    </PureContainer>
</cx>
