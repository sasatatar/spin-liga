import { 
    VDOM,
    KeySelection,
    FirstVisibleChildLayout,
    computable
 } from 'cx/ui';
import { 
    PureContainer,
    HtmlElement, 
    Button, 
    Grid, 
    TextField, 
    Section,
    FlexRow,
    FlexCol
} from 'cx/widgets';
import {LoadingOverlay, ExpandableMenu} from 'app/components';
import Controller from './Controller';
import Edit from './Edit';
import List from './List';

const mw = 768;

export default <cx>
    <PureContainer controller={Controller}>
       <h2 putInto="header">Leagues</h2>    
        <FlexCol>
            <Section mod="card">
                <FlexRow spacing>
                    <TextField 
                        value={{bind: "$page.filter"}}
                        placeholder="Search..."
                        style="flex: 1 0 0"
                        inputStyle="border-color: transparent; box-shadow: none; font-size: 16px"
                        icon:expr="{status}=='loading' ? 'loading' : 'search'"
                        showClear
                    />

                    <ExpandableMenu expand={window.innerWidth >= mw}>
                        <Button mod="hollow" onClick="onAdd" icon="add">Add</Button>
                        <Button mod="hollow" 
                            disabled:expr="!{$page.selected}" 
                            onClick="onEdit" icon="edit" 
                            visible={computable("$page.selected", (selected) => selected || window.innerWidth >= mw)}
                        >
                            Edit
                        </Button>
                        <Button mod="hollow" onClick="load" icon="refresh">Refresh</Button>
                    </ExpandableMenu>
                </FlexRow>
            </Section>

            <div style="margin-top: 12px; flex: 1">
                <LoadingOverlay loading:bind="$page.loading" >
                    <Grid
                        emptyText="Nothing to show."
                        records:bind="$page.filteredData"
                        style="flex: 1"
                        class="flex-1 momentum-scroll"
                        scrollable
                        defaultSortField="game"
                        defaultSortDirection="ASC"
                        mod="responsive"
                        selection={{
                            type: KeySelection,
                            keyField: 'id',
                            bind: '$page.selected'
                        }}
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
                </LoadingOverlay>
            </div>
        </FlexCol>
    </PureContainer>
</cx>