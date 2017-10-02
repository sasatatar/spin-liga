import {HtmlElement, Link, Button, Repeater} from 'cx/widgets';
import {ContentPlaceholder, bind, expr} from 'cx/ui';
import Controller from "./Controller";
import UserAccount from './UserAccount';

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
            <Repeater records={bind('navItems')}>
                <dt>
                    <Text if={expr("!{$record.url}")} bind="$record.text" />                        
                    <Link if={expr("!!{$record.url}")} href={bind("$record.url")} text={bind("$record.text")} url={bind("url")} match="prefix" />
                </dt>
                <Repeater records={bind("$record.items")} if={bind('$record.showSubmenu')} recordName="$sublink">
                    <dd>
                        <Link href={bind("$sublink.url")} match="prefix" text={bind("$sublink.text")} url={bind("url")} />
                        <Repeater records={bind("$sublink.items")} if={bind('$record.showSubmenu')} recordName="$league">
                            <dd>
                                <Link href={bind("$league.url")} match="prefix" text={bind("$league.text")} url={bind("url")} />
                            </dd>
                        </Repeater> 
                    </dd>
                       
                </Repeater>                        
            </Repeater>
        </dl>
      </aside>
   </div>
</cx>
