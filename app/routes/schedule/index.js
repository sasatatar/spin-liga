import { HtmlElement, Link, Section, Grid, TextField, NumberField, Button, FlexCol, FlexRow, LabeledContainer, Text, Repeater} from 'cx/widgets';
import { bind, expr, tpl, KeySelection, LabelsLeftLayout } from 'cx/ui';
import Controller from './Controller';
export default <cx>
    <h2 putInto="header">
        Raspored
    </h2>
    <FlexCol controller={Controller} spacing="large">
        <Section mod="card">
            <FlexRow>
                <TextField placeholder="Ime igrača" icon="search" value={bind('$page.filter')} showClear />
                <Button mod="hollow" 
                    onClick="onEnterResult" 
                    icon="add"
                    disabled={expr("!{$page.game}")}
                    text="Unesi rezultat" />
                <Button mod="hollow" onClick="onGenerate" icon="assignment">Generiši raspored</Button>
            </FlexRow>
        </Section>
        <FlexRow spacing="large">
            <Section mod="card" title="Raspored" hLevel={4} style="max-width: 600px; flex: 1;">
                <Grid style="height: 600px;"
                    records={bind("$page.schedule")}
                    border
                    scrollable
                    selection={{ type: KeySelection, bind: "$page.gameId" }}
                    columns={[
                        { header: 'Meč', field: 'game', sortable: true},
                        { header: 'Igrač A', field: 'teamA.name', align: 'left', sortable: true},
                        { header: 'Rezultat', field: 'result', align: 'center'},
                        { header: 'Igrač B', field: 'teamB.name', align: 'right', sortable: true},
                    ]} 
                    grouping={[{
                    key: {
                        name: { bind: '$record.round' }
                    },
                    caption: { expr: '{$group.name} + ". Kolo"' }
                    }]}/>
            </Section>
            <Section mod="card" title="Unos rezultata" if={expr("{$page.gameId}")} hLevel={4} style="width: 300px;">
                <h5 text={tpl("{$page.game.round}. Kolo, meč broj {$page.game.game}")} />
                <h6 text={tpl("{$page.game.teamA.name} - {$page.game.teamB.name}")} />
                <br/>
                <FlexCol align="center" >
                    <Repeater records={bind('$page.game.sets')} >
                        <div layout={LabelsLeftLayout} ws>
                            <LabeledContainer label={tpl("{$record.set}. set")}>
                                <NumberField value={bind("$record.teamA")} style="width: 60px;"/> - 
                                <NumberField inputStyle="text-align: right;" value={bind("$record.teamB")} style="width: 60px" />
                            </LabeledContainer>
                        </div>
                    </Repeater>
                </FlexCol>
                <Button mod="primary" putInto="footer" text="Snimi" onClick="onSaveResult" />
            </Section>
        </FlexRow>
    </FlexCol>

    
</cx>
