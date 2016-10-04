
import { Component } from '@angular/core';
import template from './contact.html';
import './contact.less';
import { TitleChangerService } from '../../services/titlechanger';

@Component({
  template
})
export class ContactComponent {

  static get parameters() {
    return [[TitleChangerService]];
  }

  constructor(titleChangerService) {
    titleChangerService.changeTitle('Contact');
  }
}