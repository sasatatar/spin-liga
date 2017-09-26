import { 
    VDOM,
    KeySelection,
    FirstVisibleChildLayout,
    computable
 } from 'cx/ui';
import { 
    PureContainer,
    HtmlElement, 
    Route, 
    Select, 
    DateField,
    Slider, 
    Button, 
    Tab, 
    Icon,
    Grid, 
    Pagination, 
    TextField, 
    Menu, 
    Submenu, 
    Checkbox,
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
       <h2 putInto="header">Call Groups</h2>    
        <FlexCol>
            <Section mod="card">
                <FlexRow spacing>
                    <TextField 
                        value={{bind: "$page.filter.query", debounce: 300 }}
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
                        records:bind="$page.data"
                        style="flex: 1"
                        class="flex-1 momentum-scroll"
                        scrollable
                        mod="responsive"
                        remoteSort
                        sortField:bind="$page.sortField"
                        sortDirection:bind="$page.sortDirection"
                        selection={{
                            type: KeySelection,
                            keyField: 'id',
                            bind: '$page.selected'
                        }}
                        columns={
                            [{
                                field: "name",
                                sortable: true,
                                header: "Name"
                            },
                            {
                                header: "Max. Members",
                                sortable: true,
                                field: "maxMembers"                          
                            },
                            {
                                header: "Current Members",
                                field: "currentMembers"
                            },
                            {
                                header: "Recording",
                                field: "config.recording",
                                items: <cx><Checkbox value:expr="{$record.config.recording}" disabled /></cx>
                            }
                          ]
                        }
                    />

                    <Pagination 
                        if:expr="{$page.pageCount} > 1"
                        page:bind="$page.page"
                        pageCount:bind="$page.pageCount"
                        length={5} 
                        style="margin: 5px"
                    />
                </LoadingOverlay>
            </div>
        </FlexCol>
    </PureContainer>
</cx>