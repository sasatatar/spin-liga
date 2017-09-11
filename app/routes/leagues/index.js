import { HtmlElement, Link, Section, Route, RedirectRoute, FlexRow, Button, Repeater } from "cx/widgets";
import { bind, expr, tpl } from "cx/ui";
import {ExpandableMenu} from '../../components';
import Controller from './Controller';
let mw = 768;

export default (
    <cx>
        <RedirectRoute url={bind("url")} route="~/" redirect="~/leagues" />
        <Route route="~/leagues" url={bind("url")}>
            <div controller={Controller} >
                <h2 putInto="header">Home</h2>
                <Section mod="card" if={bind('user.isAdmin')}>
                    <FlexRow spacing justify="end">
                        <ExpandableMenu expand={window.innerWidth >= mw}>
                            <Button mod="hollow" onClick="onAdd" icon="add">Add</Button>

                            <Button mod="hollow" disabled={expr("!{$page.selected}")} onClick="onEdit" icon="edit">Edit</Button>
                        </ExpandableMenu>
                    </FlexRow>
                </Section>
                <Section>
                    <FlexRow spacing="large">
                        <Repeater records={bind('leagues')} >
                            
                                <div class="cxb-league-tile" onClick="onClickLeague">
                                    <span style="font-size: 1.5rem;">Liga</span>
                                    <h4 text={bind('$record.name')} />
                                    <span text={expr("{$record.players} + ({$record.players} % 10 === 1 ? ' igrač' : ' igrača')")} />
                                </div>

                        </Repeater>
                    </FlexRow>
                </Section>
            </div>
        </Route>
    </cx>
);
