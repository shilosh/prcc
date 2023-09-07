import { State, LayerConfig } from "./base-state";
import { QP_REGION_COLORING, QP_REGION_COLORING_CAR, QP_REGION_COLORING_CPC, REGION_COLORING_INTERPOLATE, REGION_COLORING_LEGEND, STAT_AREA_FILTER_ITEMS } from "./consts-regions";

export class StatAreaState extends State {
    constructor(id: string, filters: any) {
        super('stat-area', id, filters);
        console.log('StatAreaState constructor STARTED');
        this.sql = [
            `SELECT * FROM stat_areas WHERE code = '${this.id}'`,
            `SELECT "meta-source" as name, count(1) as count FROM trees_processed WHERE "stat_area_code" = '${this.id}' GROUP BY 1 order by 2 desc`,
            `SELECT count(1) as total_count FROM trees_compact WHERE "stat_area_code" = '${this.id}'`,
        ];
        for (const id of ['stat-areas-label', 'stat-areas-border', 'stat-areas-fill']) {
            this.layerConfig[id] = new LayerConfig([
                '==', ['get', 'code'], ['literal', this.id]
            ], null, null);
        }
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
            'line-color': '#ff871f',
            'line-opacity': 0.4
        };
        this.layerConfig['trees'] = new LayerConfig([
            '==', ['get', 'stat_area_code'], ['literal', this.id]
        ], null, null);
        this.filterItems = STAT_AREA_FILTER_ITEMS;

        const paint_definition = this.calculate_paint_definition(coloring); // <== this defines the colors of the polygons according to the display selected in the drop-down
        const statarea_filter_def = this.calc_filter(); // <== this filter causes map to display only the polygon of the stat-area (whose id is in the URL)
        this.layerConfig['prcc-statistical-areas'] = new LayerConfig(statarea_filter_def, paint_definition, null);

    }

    calc_filter() {
        const filter = [
            '==', ['get', 'semel_new'], Number(this.id)
        ];
        // semel_new or YISHUV_STA ?
        return filter;
    }

    calculate_paint_definition(coloring: string) {
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

        const color_interpolation_for_rgb = [
            'rgb', 
            [ "-", 255, ["*", 21.25, ["-", 42, ['coalesce', ['get', 'median_tem'], 32.0] ]]],   
            ["*", 255, ['coalesce', ['get', 'VegFrac'], 0.001] ],
            ["*", 25, ['coalesce', ['get', 'cluster'], 0] ]
        ];

        const paint_definitions_for_rgb = {
            'fill-color': color_interpolation_for_rgb,
            'fill-opacity': 0.6
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
        else if (coloring=== 'all') {
            // rgb display that uses 3 values
            paint_definition = paint_definitions_for_rgb;
        }
        return paint_definition;
    }

    override handleData(data: any[][]) {
        console.log("STAT AREA DATA", this.sql, data)
        if (data[0].length && data[0][0]) {
            this.geo = {
                zoom: 14,
                center: data[0][0]['center']
            };    
        }
    }

}
