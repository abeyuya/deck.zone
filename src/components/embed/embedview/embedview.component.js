
import _ from 'lodash';

import { Component } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { window } from '@angular/platform-browser/src/facade/browser';
import { ResultsComponent } from '../../create/container/results/results.component';

import { AceEditorDirective } from 'ng2-ace';

import { CurrentProjectService } from '../../../services/currentproject';

import './embedview.less';
import template from './embedview.html';

@Component({
  template,
  providers: [CurrentProjectService],
  directives: [AceEditorDirective, ResultsComponent, ROUTER_DIRECTIVES]
})
export class EmbedViewComponent {

  static get parameters() {
    return [[ActivatedRoute], [CurrentProjectService]];
  }

  constructor(activatedRoute, currentProjectService) {
    this.activatedRoute = activatedRoute;

    this.activatedRoute.params.subscribe(params => {
      const { projectId, scriptId, tabs, print } = params;

      if (!projectId || !scriptId || !tabs) {
        this.markBad('isMisconfigured');
        return;
      }

      this.inIframe = window.self !== window.top;

      this.projectId = projectId;
      this.scriptId = scriptId;
      this.tabs = tabs.split(',');

      this.projectData = currentProjectService.getContent(this.projectId);
      this.projectData._ref.on('value', snap => {
        const value = snap.val();

        if(!value) {
          this.markBad('is404');
          return;
        }

        if(value.visibility === 'Private') {
          this.markBad('isPrivate');
        }

        this.scriptName = value.scripts[this.scriptId].name;
      });

      this.printStyles = print;
      this.activeTab = this.tabs[0];
      this.showPrint = _.includes(this.tabs, 'result') && !this.inIframe;
    });
  }

  markBad(reason) {
    this.isBad = true;
    this[reason] = true;
  }
}