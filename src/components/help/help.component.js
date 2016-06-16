
import _ from 'lodash';

import { Component } from '@angular/core';
import template from './help.html';
import './help.less';
import { TitleChangerService } from '../../services/titlechanger';

import help from './help.json';
import { PLUGINS } from '../../decklang/decklangstate';

@Component({
  template
})
export class HelpComponent {

  static get parameters() {
    return [[TitleChangerService]];
  }

  directiveText(directive) {
    return PLUGINS[directive].docs;
  }

  ngOnInit() {
    this.help = help;
    this.directives = _.keys(help.directives);
  }

  constructor(titleChangerService) {
    titleChangerService.changeTitle('Documentation');
  }
}