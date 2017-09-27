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
        <h2 putInto="header" if:expr="{$root.$route.id} === 'new'">Add a league</h2>
        <h2 putInto="header" if:expr="{$root.$route.id} !== 'new'">Edit league</h2>
       
        <FlexRow target="desktop" hspacing>
            <Section
                class="flex-1"
                style="max-width: 800px"
                mod="card"
                title:expr="{record.name} || 'New league'"
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

                                <NumberField
                                    value={{ bind: "record.playersCount", defaultValue: 0 }}
                                    label="Number of players"
                                    class="flex-1 autogrow"
                                    disabled
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
