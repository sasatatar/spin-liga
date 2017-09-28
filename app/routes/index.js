import { Route, PureContainer, Section, Sandbox, RedirectRoute } from 'cx/widgets';
import { FirstVisibleChildLayout, bind } from 'cx/ui'

import AppLayout from '../layout';

import SignIn from './sign-in';
import Admin from './admin';



export default <cx>
    <PureContainer layout={FirstVisibleChildLayout} >
        

        
        <Sandbox
            key={bind("url")}
            storage={bind("pages")}
            outerLayout={AppLayout}
            layout={FirstVisibleChildLayout}
        >

            {/*public routes*/}
            <Route route="~/sign-in" url={bind("url")}>
                <SignIn />
            </Route>
            
            {/*
            <Route route="+/players" url={bind("url")} prefix>
                <Players/>
            </Route>
            <Route route="+/games" url={bind("url")} prefix>
                <Schedule/>
            </Route>
            */}
            {/*restricted access to admins only*/}
            <Admin />
            
            <Section title="Page Not Found" mod="card">
                This page doesn't exists. Please check your URL.
            </Section>
        </Sandbox>
    </PureContainer>
</cx>

