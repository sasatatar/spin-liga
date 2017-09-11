import {HtmlElement, Link, Button, Repeater} from 'cx/widgets';
import {ContentPlaceholder, bind, expr} from 'cx/ui';
import Controller from "./Controller";
import UserAccount from './UserAccount';

const items = [, {
    text: 'Home',
    url: '~/leagues',
    items: [{ 
        text: 'Igrači',
        url: '+/players',
    },{
        text: 'Rezultati',
        url: '+/games'
    }, {
        text: 'Rang lista',
        url: '+/ranking'
    }]
},{
    text: 'About',
    url: '~/about'
}, {
    text: 'Admin',
    url: '~/sign-in'
}]

export default <cx>
   <div
      controller={Controller}
      class={{
         "layout": true,
         "nav": {bind: "layout.aside.open"}
      }}
   >
      <main class="main" onMouseDownCapture="onMainClick">
         <ContentPlaceholder />
      </main>
      <header class="header">
         <i
            class={{
               hamburger: true,
               open: {bind: 'layout.aside.open'}
            }}
            onClick={(e, {store}) => {
               store.toggle('layout.aside.open');
            }}
         />
         <ContentPlaceholder name="header"/>
         <div style="flex: 1;" />
         <UserAccount />
      </header>
      <aside class="aside">
         <h1>Spin liga</h1>
         <dl>
            <Repeater records={items}>
                <dt>
                    <Text if={expr("!{$record.url}")} bind="$record.text" />                        
                    <Link if={expr("!!{$record.url}")} href={bind("$record.url")} text={bind("$record.text")} url={bind("url")} match="prefix" />
                </dt>
                <Repeater records={bind("$record.items")} if={expr('!!{league.id}')}>
                    <dd>
                        <Link href={bind("$record.url")} match="prefix" text={bind("$record.text")} url={bind("url")} />
                    </dd>
                </Repeater>                        
            </Repeater>
        </dl>
      </aside>
   </div>
</cx>
