import { Route, PureContainer, Section, Sandbox } from 'cx/widgets';
import { FirstVisibleChildLayout, bind } from 'cx/ui'

import AppLayout from '../layout';

import Default from './default';
import Players from './players';
import Schedule from './schedule';
import SignIn from './sign-in';
import About from './about';



export default <cx>
    <PureContainer layout={FirstVisibleChildLayout} >
        <Sandbox
            key={bind("url")}
            storage={bind("pages")}
            outerLayout={AppLayout}
            layout={FirstVisibleChildLayout}
        >
                <Route route="~/" url={bind("url")}>
                    <Default/>
                </Route>
                {/*
                <Route route="+/players" url={bind("url")} prefix>
                    <Players/>
                </Route>
                <Route route="+/games" url={bind("url")} prefix>
                    <Schedule/>
                </Route>
                */}
                <Route route="~/about" url={bind("url")}>
                    <About />
                </Route>
                <Route route="~/sign-in" url={bind("url")}>
                    <SignIn />
                </Route>
            <Section title="Page Not Found" mod="card">
                This page doesn't exists. Please check your URL.
            </Section>
        </Sandbox>
    </PureContainer>
</cx>

