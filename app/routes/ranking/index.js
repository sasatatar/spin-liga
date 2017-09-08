import { HtmlElement, Section, FlexRow, Repeater, Rescope, Grid } from 'cx/widgets';
import {
    CategoryAxis,
    Chart,
    Column,
    Gridlines,
    LineGraph,
    Marker,
    NumericAxis,
    PieChart,
    PieSlice
} from "cx/charts";
import {bind, expr, KeySelection } from 'cx/ui';
import { Svg, Text } from "cx/svg";

import Controller from './Controller';

export default <cx>
    <h2 putInto="header">Dashboard</h2>
    <div controller={Controller}>
        <FlexRow wrap spacing>
            <Section mod="card" title="Poredak" hLevel={4} style="max-width: 600px; flex: 1;">
                <Grid style="height: 500px;"
                    records={bind("rankings")}
                    border
                    scrollable
                    selection={{ type: KeySelection, bind: "$page.playerId" }}
                    columns={[
                        { header: 'Ime i prezime', field: 'name', sortable: true },
                        { header: 'Pobjede', field: 'wins', sortable: true },
                        { header: 'Porazi', field: 'losses', sortable: true },
                        { header: 'Odnos setova', field: 'setRatio', sortable: true },
                        { header: 'Bodovi', field: 'points', sortable: true },
                    ]} />
            </Section>

            
        
      </FlexRow>
   </div >
</cx >
