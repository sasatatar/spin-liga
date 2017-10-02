import { 
    VDOM,
    KeySelection,
    FirstVisibleChildLayout,
    computable,
    Rescope
 } from 'cx/ui';
import { 
    PureContainer,
    HtmlElement, 
    Button, 
    Grid, 
    TextField, 
    Section,
    FlexRow,
    FlexCol, 
    LookupField
} from 'cx/widgets';
import {LoadingOverlay, ExpandableMenu} from 'app/components';
import Controller from './Controller';
import Edit from './Edit';
import List from './List';

const mw = 768;

export default <cx>
    <Rescope bind="$page" controller={Controller}>
        <FlexRow putInto="header" hspacing>
            <h2>Leagues</h2>
        </FlexRow>
        <FlexCol>
            <Section mod="card">
                <FlexRow spacing>
                    <TextField 
                        value={{bind: "filter"}}
                        placeholder="Search..."
                        style="flex: 1 0 0"
                        inputStyle="border-color: transparent; box-shadow: none; font-size: 16px"
                        icon:expr="{status}=='loading' ? 'loading' : 'search'"
                        showClear
                    />

                    <LookupField
                        style="width: 4rem;"
                        label="League"
                        labelPlacement={null}
                        value:bind="leagueId"
                        options:bind="leagues"
                        optionTextField="name"
                        required
                    />

                    <ExpandableMenu expand={window.innerWidth >= mw}>
                        <Button mod="hollow" onClick="onGenerate" icon="list">Generate schedule</Button>
                        <Button mod="hollow" 
                            disabled:expr="!{selected}" 
                            onClick="onEdit" icon="edit" 
                            visible={computable("selected", (selected) => selected || window.innerWidth >= mw)}
                        >
                            Edit result
                        </Button>
                        <Button mod="hollow" onClick="load" icon="refresh">Refresh</Button>
                    </ExpandableMenu>
                </FlexRow>
            </Section>

            <div style="margin-top: 12px; flex: 1">
                <LoadingOverlay loading:bind="loading" >
                    <Grid
                        emptyText="Nothing to show."
                        records:bind="filteredData"
                        style="flex: 1"
                        class="flex-1 momentum-scroll"
                        scrollable
                        defaultSortField="game"
                        defaultSortDirection="ASC"
                        mod="responsive"
                        selection={{
                            type: KeySelection,
                            keyField: 'id',
                            bind: 'selected'
                        }}
                        columns={[
                            { header: 'Game', field: 'game', sortable: true},
                            { header: 'Player A', field: 'teamA.name', align: 'left', sortable: true},
                            { header: 'Result', field: 'result', align: 'center'},
                            { header: 'Player B', field: 'teamB.name', align: 'right', sortable: true},
                        ]} 
                        grouping={[{
                            key: {
                                name: { bind: '$record.round' }
                            },
                            caption: { expr: '{$group.name} + ". Round"' }
                        }]}/>
                </LoadingOverlay>
            </div>
        </FlexCol>
    </Rescope>
</cx>