import {HtmlElement, Link, Button} from 'cx/widgets';
import {ContentPlaceholder} from 'cx/ui';
import Controller from "./Controller";

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
      </header>
      <aside class="aside">
         <h1>Spin liga</h1>
         <dl>
            <dt>
               App
            </dt>
            <dd>
               <Link href="~/" url:bind="url">
                  Home
               </Link>
               <Link href="~/dashboard" url:bind="url">
                  Dashboard
               </Link>
               <Link href="~/players" url:bind="url">
                  Igrači
               </Link>
               <Link href="~/raspored" url:bind="url">
                  Raspored
               </Link>
            </dd>
         </dl>
         <dl>
            <dt>
               Admin
            </dt>
            <dd>
               <Link href="~/users" url:bind="url" match="prefix">
                  Users
               </Link>
            </dd>
         </dl>
      </aside>
   </div>
</cx>
