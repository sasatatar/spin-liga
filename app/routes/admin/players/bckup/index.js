import { HtmlElement, Link, Section, Grid, TextField, Window, Button, NumberField, FlexCol, FlexRow, ValidationGroup, DateField, Radio, LabeledContainer } from 'cx/widgets';
import { bind, expr, KeySelection, LabelsLeftLayout } from 'cx/ui';
import { enableMaterialLabelPlacement } from 'cx-theme-material';

enableMaterialLabelPlacement();

import Controller from './Controller';
export default <cx>
    <h2 putInto="header">
        Igrači
    </h2>
    <FlexCol controller={Controller} spacing="large">
        <Section mod="card" >
            <FlexRow >
                <TextField placeholder="Ime igrača" 
                    icon="search" 
                    value={bind('$page.filter')} 
                    showClear
                    inputStyle="border-color: transparent; box-shadow: none; font-size: 16px" />
                <Button mod="hollow" icon="edit" disabled={expr('!{$page.id}')} onClick="onEdit">Izmijeni</Button>
                <Button mod="hollow" icon="add" onClick="onAdd">Dodaj</Button>
            </FlexRow>
        </Section>
        <Section mod="well" title="Igrači" hLevel={4}>
            <Grid records={bind("$page.players")}
                border
                selection={{ type: KeySelection, bind: "$page.id" }}
                columns={[
                    { header: 'Ime i prezime', field: 'name', sortable: true },
                    { header: 'Datum rođenja', field: 'born', sortable: true, format: 'datetime;ddMMYYYY' },
                    { header: 'Visina', field: 'height', sortable: true, format: 'suffix; cm|N/A' },
                    { header: 'Tjelesna masa', field: 'weight', sortable: true, format: 'suffix; kg|N/A' },
                    { header: 'Ljevak ili dešnjak', field: 'hand', sortable: true }
                ]} />
        </Section>
        <Window visible={bind('$page.showForm', false)} title={expr("{$page.id} ? 'Izmijeni igrača' : 'Novi igrač'")} center >
            <div style="padding: 20px; margin-top: -30px;" >
                <TextField label="Ime i prezime" value={bind("$page.form.name")} />
                <br/>
                <DateField label="Datum rođenja" value={bind("$page.form.born")} showClear={false} />
                <br/>
                <NumberField label="Visina" value={bind("$page.form.height")} format="suffix; cm"/>
                <br/>
                <NumberField label="Tjelesna masa" value={bind("$page.form.weight")} format="suffix; kg" />               
                <br/>
                <div ws>
                <br/>
                Igra 
                <Radio value={bind("$page.form.hand")} option="left" text="lijevom" />
                <Radio value={bind("$page.form.hand")} option="right" text="desnom rukom"/>
                </div>
            </div>            
            <div putInto="footer" style="float: right;">
                <Button onClick="onSave">Save</Button>
            </div>
        </Window>
    </FlexCol>

    
</cx>
