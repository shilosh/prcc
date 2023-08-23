import * as Plot from '@observablehq/plot';
import { State, LayerConfig, Chart } from './base-state';
import { QP_REGION_COLORING, QP_REGION_COLORING_CAR, REGION_COLORING_LEGEND, REGION_COLORING_INTERPOLATE, STAT_AREA_FILTER_ITEMS, QP_REGION_COLORING_CPC } from './consts-regions';


export class StatAreasState extends State {
    constructor(filters: any) {
        // the filters arg contains the URL part that represents the drop-down selection!
        super('stat-areas', undefined, filters);
        this.sql = [
            `SELECT round(canopy_area_ratio*20) * 5 as ratio, count(1) as count FROM stat_areas WHERE canopy_area_ratio > 0 GROUP BY 1 ORDER BY 1 `,
        ];
        for (const id of ['stat-areas-label', 'stat-areas-border', 'stat-areas-fill']) {
            this.layerConfig[id] = new LayerConfig([
                '>', ['get', 'canopy_area_ratio'], 0
            ], null, null);
        }
        this.layerConfig['munis-label'] = new LayerConfig(null, null, null);
        let coloring = this.filters[QP_REGION_COLORING] || QP_REGION_COLORING_CAR;
        if (coloring === QP_REGION_COLORING_CPC) {
            coloring = QP_REGION_COLORING_CAR;
        }
        this.legend = REGION_COLORING_LEGEND[coloring];
        this.layerConfig['stat-areas-fill'].paint = {
            'fill-color': REGION_COLORING_INTERPOLATE[coloring],
            'fill-opacity': 0.8
        };
        this.layerConfig['stat-areas-border'].paint = {
            'line-color': '#155b2e',
            'line-opacity': 0.4
        };
        this.layerConfig['trees'] = new LayerConfig(null, null, null);
        this.filterItems = STAT_AREA_FILTER_ITEMS;

        this.popupLayers = {
            'stat-areas-fill': [
                {label: 'מזהה האזור', content: (p: any) => p.code},
                {label: 'יישוב', content: (p: any) => p.city_name || 'לא ידוע'},
                {label: 'אחוז כיסוי צומח', content: (p: any) => (100 * p.canopy_area_ratio).toFixed(1) + '%'},
            ]
        }

        const color_interpolation_for_vegetation = [
            'interpolate', ['exponential', 0.01], ['get', 'VegFrac'],
            0, ['to-color', '#ccc'],
            0.5, ['to-color', '#acecc2'],
            0.6, ['to-color', '#155b2e'],
        ];

        const color_interpolation_for_temperature = [
            'interpolate', ['exponential', 0.01], ['get', 'median_tem'],
            30, ['to-color', '#FFFF00'],
            35, ['to-color', '#FFA500'],
            40, ['to-color', '#FF0000'],
        ];

        const color_interpolation_for_cluster = [
                    'match', ['coalesce', ['get', 'cluster'], 0],
                    0, ['to-color', '#9BD7F5'],
                    1, ['to-color', '#9BD7F5'],
                    2, ['to-color', '#89C8EE'],
                    3, ['to-color', '#78BBE7'],
                    4, ['to-color', '#66AFE1'],
                    5, ['to-color', '#54A4DB'],
                    6, ['to-color', '#497DB0'],
                    7, ['to-color', '#3C5E91'],
                    8, ['to-color', '#314177'],
                    9, ['to-color', '#272361'],
                    ['to-color', '#1E1E4D'],
                ];

        const paint_definitions_for_temperature = {
            'fill-color': color_interpolation_for_temperature,
            'fill-opacity': 0.3
        };
        const paint_definitions_for_vegetation = {
            'fill-color': color_interpolation_for_vegetation,
            'fill-opacity': 0.3
        };
        const paint_definitions_for_cluster = {
            'fill-color': color_interpolation_for_cluster,
            'fill-opacity': 0.3
        };
        let paint_definition = null;
        if (coloring==='vegetation') { 
            paint_definition = paint_definitions_for_vegetation;
        }
        else if (coloring==='temperature') {
            paint_definition = paint_definitions_for_temperature;
        }
        else if (coloring==='cluster') {
            paint_definition = paint_definitions_for_cluster;
        }
        /**
         * This is the layer of the Settlements Data
         * Its paint_definition defines the colors of the different polygons based on the
         * value of a property from the json data. The property names in the json are:
         * "Temperatur", "VegFrac", "cluster17"
         * for each of them we created a suitable formula/expression: 
         * paint_definitions_for_temperature, paint_definitions_for_vegetation, etc
         */
        // adding a LayerConfig to the layerConfig[] array, with key 'prcc-statistical-areas',
        // assumes there is a layer with that exact name in the map, and will cause that layer
        // to become visible when the current state (stat-areas-state) is initilized - which is
        // when the display to which it is attached is selected in UI.
        // current state object is created in StateService.initFromUrl(), which is called from the
        // event handler of any router event (this is defined in AppComponent)
        this.layerConfig['prcc-statistical-areas'] = new LayerConfig(null, paint_definition, null);

    }

    override handleData(data: any[][]) {
        this.charts = [];
        if (data[0].length) {
            console.log("STAT-AREA DATA", data[0])
            this.charts.push(new Chart(
                'התפלגות כיסוי חופות העצים בין האזורים הסטטיסטיים:',
                Plot.plot({
                    height: 250,
                    width: 340,
                    marginLeft: 50,
                    y: {
                        grid: true,
                        label: 'מספר האזורים',
                        tickPadding: 20,
                        labelAnchor: 'center',
                        labelOffset: 40,
                    },
                    x: {
                        label: 'אחוז כיסוי חופות העצים',
                        tickFormat: d => d + '%',
                        labelAnchor: 'center',
                    },
                    marks: [
                        Plot.barY(data[0], {y: 'count', x: 'ratio', fill: '#204E37'}),
                        Plot.ruleY([0]),
                    ]
                })
            ));
        }
    }
}