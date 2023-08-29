import { Component } from '@angular/core';
import { State } from '../states/base-state';
import { QP_REGION_COLORING, QP_REGION_COLORING_CAR, QP_REGION_COLORING_CPC } from '../states/consts-regions';

@Component({
  selector: 'app-stat-area',
  templateUrl: './stat-area.component.html',
  styleUrls: ['./stat-area.component.less']
})
export class StatAreaComponent {

  stat_area: any = null;
  sources: any[] = [];
  name = '';

  set state(state: State | null) {
    console.log('GOET STATE', state);
    if (state === null) {
      this.stat_area = null;
      this.sources = [];
      this.name = '';
      return;
    }
    //this.stat_area = Object.assign({}, state.data[0][0] || {}, state.data[2][0] || {});
    this.stat_area = Object.assign({}, {}, {});
    this.sources = [];
    this.name = `אזור סטטיסטי ${this.stat_area['city_code']}/${this.stat_area['area_code'] || '0'}`
    // for (const row of state.data[1]) {
    //   if (row['name'] && row['count']) {
    //     this.sources.push({
    //       name: row['name'],
    //       count: row['count'],
    //     });
    //   }
    // }
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
    return paint_definition;
  }

}
