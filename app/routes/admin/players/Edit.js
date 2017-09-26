import {VDOM} from 'cx/ui';
import {
    KeySelection,
    LabelsLeftLayout,
    LabelsTopLayout,
    Rescope
} from 'cx/ui';
import {
    PureContainer,
    HtmlElement,
    Button,
    LookupField,
    Pagination,
    TextField,
    NumberField,
    Toast,
    Switch,
    Text,
    FlexCol,
    FlexRow,
    ValidationGroup,
    Section,
    List,
    Grid,
    Link
} from 'cx/widgets';

import { AsyncButton, LoadingOverlay } from 'app/components';

import Controller from './EditController';

export default <cx>
   <Rescope bind="$page" controller={Controller}>
        <h2 putInto="header" if:expr="{$root.$route.id} === 'new'">Add a callgroup</h2>
        <h2 putInto="header" if:expr="{$root.$route.id} !== 'new'">Edit callgroup</h2>
       
        <FlexRow target="desktop" hspacing>
            <Section
                class="flex-1"
                mod="card"
                title:expr="{record.name} || 'New call group'"
            >
                <LoadingOverlay loading:bind="loading" mod="inset">
                    <ValidationGroup invalid:bind="invalid">
                        <FlexCol class="form">
                            <FlexRow target="tablet" hspacing="medium">
                                <TextField
                                    value:bind="record.name"
                                    label="Name"
                                    class="flex-1 autogrow"
                                    required
                                />
        
                                <TextField
                                    value:bind="record.config.number"
                                    label="Number"
                                    class="flex-1 autogrow"
                                    required
                                />
                            </FlexRow>
        
                            <FlexRow target="tablet" hspacing="medium">
                                <NumberField 
                                    value:bind="record.maxMembers"
                                    label="Max. Members"
                                    class="flex-1 autogrow"
                                    placeholder="Unbounded"                                
                                />

                                <Switch
                                    value:bind="record.config.recording"
                                    label="Recording"
                                    //class="flex-1 autogrow"
                                />
                            </FlexRow>
            
                            <FlexRow class="form-buttons" spacing>
                                <AsyncButton 
                                    onClick="onSave" 
                                    disabled:bind="invalid"
                                    busyText="Saving..."
                                    icon="save"
                                >
                                    Save
                                </AsyncButton>
                                <Button onClick="onCancel">Cancel</Button>
                                <AsyncButton
                                    onClick="onDelete"
                                    busyText="Deleting..."
                                    visible:expr="{$root.$route.id} != 'new'"
                                    style="margin-left:auto"
                                    mod="danger"
                                    icon="delete"
                                    confirm="Are you sure that you want to delete this item?"
                                >
                                    Delete
                                </AsyncButton>
                            </FlexRow>
        
                        </FlexCol>
                    </ValidationGroup>
                </LoadingOverlay>
            </Section>

            <Section class="flex-1" title="Member devices">
                <Grid records:bind="members" mod="bordered" emptyText="None."
                    class="flex-1 momentum-scroll"
                    style="max-height: 240px"
                    scrollable
                    mod="responsive"
                    sorters:bind="sorters"
                    columns={
                        [{
                            header: "Serial no.",
                            sortable: true,
                            field: "serialNumber",
                            items: <cx><Link href:tpl="/devices/{$record.id}" text:bind="$record.serialNumber" /></cx>
                        }, {
                            header: "Name",
                            field: 'name',
                            sortable: true,
                            style: 'width: 100%',
                            items: <cx><Link href:tpl="/devices/{$record.id}" text:bind="$record.name" /></cx>
                        }]
                    } 
                />   
            </Section>
        </FlexRow>
        <Toast
            visible={{
                bind: "$page.error.show",
                defaultValue: false
            }}
            timeout={5000}
            mod="warning"
            pad={false}
        >
            <Text bind="$page.error.msg"/>
        </Toast>
   </Rescope>
</cx>;
