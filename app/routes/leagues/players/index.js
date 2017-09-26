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
    <RedirectRoute route="~/callgroups" url:bind="url" redirect="~/callgroups/list" />
    <Route route="~/callgroups/list" url:bind="url">
        <List />
    </Route>
    <Route route="~/callgroups/:id" url:bind="url">
        <Edit />
    </Route>
</cx>
