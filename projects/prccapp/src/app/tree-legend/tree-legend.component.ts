import { Component, Input } from '@angular/core';
import { Legend } from '../states/base-state';
import { TREE_COLOR_LEGEND } from '../states/consts-trees';

@Component({
  selector: 'app-tree-legend',
  templateUrl: './tree-legend.component.html',
  styleUrls: ['./tree-legend.component.less']
})
export class TreeLegendComponent {
  @Input() legend: Legend;

}
