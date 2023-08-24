import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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
    value: (row) => "45",
  },
  {
    text: 'מדד סוציואקונומי',
    icon: 'madad',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: '',
    value: (row) => "8",
  },
  {
    text: 'ציון הצללה משוקלל',
    icon: 'shadowing-score',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: '',
    value: (row) => "2",
  },
  {
    text: 'התערבות: שינוי שיעור כיסוי הצומח',
    icon: 'socioeconomic-index',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: 'מעלות',
    value: (row) => "45",
  },
  {
    text: 'כיסוי נוכחי',
    icon: 'current-cover',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: '',
    value: (row) => "2%",
  },
  {
    text: 'כיסוי לאחר התערבות',
    icon: 'expected-cover',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: '',
    value: (row) => '?',
  },
  {
    text: 'סליידר',
    icon: 'socioeconomic-index',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: '',
    value: (row) => '2',
  },
  {
    text: 'שינוי בטמפרטורה',
    icon: 'temperature-change',
    tooltip: 'הזז את הסקרול לתוצאות',
    units: 'הזז את הסקרול לתוצאות',
    value: (row) => '2',
  },
  {
    text: 'חיסכון',
    icon: 'savings',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: 'שקלים',
    value: (row) => '2',
  },
  {
    text: 'מניעת תחלואה',
    icon: 'prevent-sickness',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: 'ימי אישפוז בשנה',
    value: (row) => '2',
  },
  {
    text: 'מניעת תמותה מוקדמת',
    icon: 'prevent-death',
    tooltip: 'לפי נתוני למ״ס 2020',
    units: 'בשנה',
    value: (row) => '2',
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
  focusParams: any = {};

  ngOnChanges(): void {
    if (this.record) {
        console.log('REGION RECORD', this.record);
      this.iconInfos = [];
      ICON_INFOS.forEach((iconInfo) => {
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
          this.iconInfos.push({
            text: iconInfo.text,
            icon: iconInfo.icon,
            tooltip: iconInfo.tooltip,
            value, units,
          });
        }
      });
      console.log('REGION ICON_INFOS', this.iconInfos);
      this.focusParams = {
        focus: this.focus,
      };
    }
      
  }
}
