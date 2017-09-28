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
    TextField,
    NumberField,
    FlexCol,
    FlexRow,
    ValidationGroup,
    Section
} from 'cx/widgets';

import { AsyncButton, LoadingOverlay } from 'app/components';

import Controller from './EditController';

export default <cx>
   <Rescope bind="$page" controller={Controller}>
        <h2 putInto="header" if:expr="{$root.$route.id} === 'new'">Dodaj igraca</h2>
        <h2 putInto="header" if:expr="{$root.$route.id} !== 'new'">Izmijeni igraca</h2>
       
        <FlexRow target="desktop" hspacing>
            <Section
                class="flex-1"
                mod="card"
                style="max-width: 800px"
                title:expr="{record.name} || 'Novi igrac'"
            >
                <LoadingOverlay loading:bind="loading" mod="inset">
                    <ValidationGroup invalid:bind="invalid">
                        <FlexCol class="form">
                            <FlexRow target="tablet" hspacing="medium">
                                <TextField
                                    value:bind="record.name"
                                    label="Ime i prezime"
                                    class="flex-1 autogrow"
                                    required
                                />

                                <TextField
                                    value:bind="record.yearOfBirth"
                                    label="Godina rođenja"
                                    class="flex-1 autogrow"
                                />
                            </FlexRow>

                            <FlexRow target="tablet" hspacing="medium">
                                <LookupField
                                    value:bind="record.leftOrRighthanded"
                                    label="Ljevak ili dešnjak"
                                    options:bind="handOptions"
                                    class="flex-1 autogrow"
                                />

                                <LookupField
                                    value:bind="record.leagueId"
                                    label="Liga"
                                    options:bind="leagues"
                                    optionTextField="name"
                                    class="flex-1 autogrow"
                                    required
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
   </Rescope>
</cx>;
