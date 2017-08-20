import { HtmlElement, Link, Section, Grid, TextField, Window, Button, NumberField, FlexCol, FlexRow, ValidationGroup, DateField, Radio, LabeledContainer } from 'cx/widgets';
import { bind, expr, KeySelection, LabelsLeftLayout } from 'cx/ui';
import Controller from './Controller';
export default <cx>
    <h2 putInto="header">
        Raspored
    </h2>
    <FlexCol controller={Controller} spacing="large">
        <Section mod="card" >
            <FlexRow spacing='large'>
                <Button onClick="onGenerate">Generiši raspored</Button>
            </FlexRow>
        </Section>
        <Section mod="well" title="Raspored" hLevel={4}>
            <Grid records={bind("schedule")}
                border
                columns={[
                    { header: 'Igrač A', field: 'teamA.name', sortable: false},
                    { header: 'Igrač B', field: 'teamB.name', sortable: false},
                    { header: 'Rezultat', field: 'game', sortable: false},
                ]} 
                grouping={[{
                   key: {
                      name: { bind: '$record.round' }
                   },
                   caption: { expr: '"Kolo " + {$group.name}' }
                }]}/>
        </Section>
    </FlexCol>

    
</cx>
