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
    <RedirectRoute route="~/games" url:bind="url" redirect="~/games/list" />
    <Route route="~/games/list" url:bind="url">
        <List />
    </Route>
    <Route route="~/games/:id" url:bind="url">
        <Edit />
    </Route>
</cx>
