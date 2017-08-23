import { HtmlElement, Link, Section, Grid, TextField, Button, FlexCol, FlexRow } from 'cx/widgets';
import { bind, expr, KeySelection, LabelsLeftLayout } from 'cx/ui';
import Controller from './Controller';
export default <cx>
    <h2 putInto="header">
        Raspored
    </h2>
    <FlexCol controller={Controller} spacing="large">
        <Section mod="card">
            <FlexRow spacing='large'>
                <Button onClick="onGenerate">Generiši raspored</Button>
                <TextField placeholder="Ime igrača" icon="search" value={bind('$page.filter')} showClear />
            </FlexRow>
        </Section>
        <Section mod="well" title="Raspored" hLevel={4} style="max-width: 600px; flex: 1;">
            <Grid style="height: 600px;"
                records={bind("$page.schedule")}
                border
                scrollable
                columns={[
                    { header: 'Meč', field: 'game', sortable: true},
                    { header: 'Igrač A', field: 'teamA.name', align: 'left', sortable: true},
                    { header: 'Rezultat', align: 'center'},
                    { header: 'Igrač B', field: 'teamB.name', align: 'right', sortable: true},
                ]} 
                grouping={[{
                   key: {
                      name: { bind: '$record.round' }
                   },
                   caption: { expr: '{$group.name} + ". Kolo"' }
                }]}/>
        </Section>
    </FlexCol>

    
</cx>
