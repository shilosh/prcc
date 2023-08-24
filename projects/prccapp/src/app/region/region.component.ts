import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { StateService } from '../state.service';

type IconInfo = {
  field?: string;
  text: string;
  icon: string;
  tooltip?: string;
  value?: string | ((record: any) => string | null);
  units?: string | ((record: any) => string);
};

const ICON_INFOS: IconInfo[] = [
  {
    text: 'טמפרטורת פני השטח',
    icon: 'temperature',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: 'מעלות',
    field: 'Temperatur',
    //value: (row) => "45",
  },
  {
    text: 'מדד סוציואקונומי',
    icon: 'madad',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: '',
    field: 'cluster17',
    //value: (row) => "8",
  },
  {
    text: 'ציון הצללה משוקלל',
    icon: 'shadowing-score',
    tooltip: 'כיצד מחשבים ציון הצללה משוקלל???',
    units: '',
    value: (row) => "??",
  },
];

const ICON_INFOS2: IconInfo[] = [
  {
    text: 'כיסוי נוכחי',
    icon: 'current-cover',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: '',
    field: 'VegFrac',
    //value: "2%",
  },
  {
    text: 'כיסוי לאחר התערבות',
    icon: 'expected-cover',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: '',
    value: (row) => '?',
  },
];

const ICON_INFOS3: IconInfo[] = [
  {
    text: 'שינוי בטמפרטורה',
    icon: 'temperature-change',
    tooltip: 'הזז את הסקרול לתוצאות',
    units: 'הזז את הסקרול לתוצאות',
    value: '2',
  },
  {
    text: 'חיסכון',
    icon: 'savings',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: 'שקלים',
    value: '2',
  },
  {
    text: 'מניעת תחלואה',
    icon: 'prevent-sickness',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: 'ימי אישפוז בשנה',
    value: '2',
  },
  {
    text: 'מניעת תמותה מוקדמת',
    icon: 'prevent-death',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: 'בשנה',
    value: '2',
  },
];

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.less']
})
export class RegionComponent implements OnChanges {
  @Input() record: any = null;
  @Input() sources: any[] = [];
  @Input() name: string = '';
  @Input() focus: string = '';
  @Input() focusLink: string = '';

  iconInfos: IconInfo[] = [];
  iconInfos2: IconInfo[] = [];
  iconInfos3: IconInfo[] = ICON_INFOS3;
  focusParams: any = {};
  nameOfMuni: String = 'unknown';

  constructor(public state: StateService) {}

  ngOnChanges(): void {
    if (this.record) {
      console.log('REGION RECORD', this.record);
      const lastFeature = this.state.getLastFeature();
      console.log('LAST FEATURE', lastFeature);
      if (lastFeature) {
        this.nameOfMuni = lastFeature.properties['Muni_Heb'];
        // Hack here: I use data from lastFeature instead of record!!
        this.record = lastFeature.properties;
      }
      this.iconInfos = [];
      ICON_INFOS.forEach((iconInfo) => {
        this.populateIconInfo(iconInfo, this.iconInfos);
      });
      ICON_INFOS2.forEach((iconInfo) => {
        this.populateIconInfo(iconInfo, this.iconInfos2);
      });
      console.log('REGION ICON_INFOS', this.iconInfos);
      console.log('REGION ICON_INFOS2', this.iconInfos2);
      this.focusParams = {
        focus: this.focus,
      };
    }
      
  }

  populateIconInfo(iconInfo: any, theArray: any[]) {
    let value: any | null = null;
    if (iconInfo.field) {
      value = this.record[iconInfo.field];
    } else if (typeof iconInfo.value === 'function') {
      value = iconInfo.value(this.record);
    }
    let units = iconInfo.units;
    if (typeof units === 'function') {
      units = units(this.record);
    }
    if (value !== null && value !== undefined && units !== null && units !== undefined) {
      if (typeof value === 'number') {
        value = value.toLocaleString();
      }
      //this.iconInfos.push({
      theArray.push({
        text: iconInfo.text,
        icon: iconInfo.icon,
        tooltip: iconInfo.tooltip,
        value, units,
      });
    }
  }
}
