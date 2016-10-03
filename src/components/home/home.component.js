
import { Component } from '@angular/core';
import template from './home.html';
import './home.less';
import { HomeBlocksService } from '../../services/homeblocks';
import { TitleChangerService } from '../../services/titlechanger';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  providers: [HomeBlocksService],
  directives: [ROUTER_DIRECTIVES],
  template
})
export class HomeComponent {
  static get parameters() {
    return [[HomeBlocksService], [TitleChangerService]];
  }
  constructor(homeblocks, titleChangerService) {
    titleChangerService.changeTitle(null);
    this.homeblocks = homeblocks.getData();
  }
}