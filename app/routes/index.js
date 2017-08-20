import { Route, PureContainer, Section, Sandbox } from 'cx/widgets';
import { FirstVisibleChildLayout } from 'cx/ui'

import AppLayout from '../layout';

import Default from './default';
import Players from './players';
import Dashboard from './dashboard';
import UserRoutes from './users';
import Schedule from './schedule';



export default <cx>
    <Sandbox
       key:bind="url"
       storage:bind="pages"
       outerLayout={AppLayout}
       layout={FirstVisibleChildLayout}
    >
        <Route route="~/" url:bind="url">
            <Default/>
        </Route>
        <Route route="~/players" url:bind="url">
            <Players/>
        </Route>
        <Route route="~/raspored" url:bind="url">
            <Schedule/>
        </Route>
       <Route route="~/dashboard" url:bind="url">
          <Dashboard/>
       </Route>
       <UserRoutes/>
       <Section title="Page Not Found" mod="card">
          This page doesn't exists. Please check your URL.
       </Section>
    </Sandbox>
</cx>

