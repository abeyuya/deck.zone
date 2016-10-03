
import { Component } from '@angular/core';
import template from './create.html';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  template,
  directives: [ROUTER_DIRECTIVES]
})
export class CreateComponent {
  constructor() {}
}