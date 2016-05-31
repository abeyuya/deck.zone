
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { window } from '@angular/platform-browser/src/facade/browser';

import template from './creator.html';
import './creator.less';
import { ProjectComponent } from '../project.component';

import { AceEditorDirective } from 'ng2-ace';

import '../../../../decklang/ace/ace';

import { Auth } from '../../../../services/auth';

import _ from 'lodash';

@Component({
  selector: 'creator',
  inputs: ['projectId', 'project', 'api'],
  directives: [AceEditorDirective, NgClass],
  template
})
export class CreatorComponent extends ProjectComponent {

  static get parameters() {
    return [[Auth]];
  }

  constructor(auth) {
    super();

    this.auth = auth;

    const writeFile = _.debounce((data, index) => {
      this.api.writeFile(data, index);
      window.onbeforeunload = () => null;
    }, 5000);

    this.onChange = (data, index) => {
      writeFile(_.trimEnd(data), index);
      window.onbeforeunload = () => 'Your work is not done syncing yet. Are you sure you want to close the page?';
    };

    this.editorOptions = {
      printMargin: false,
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    };
  }

  ngOnChanges(data) {
    const projectData = data.project.currentValue;
    if(!projectData) return;

    this.activeScriptId = projectData.activeScript;

    // don't refresh view if just text changes
    const numFiles = _.keys(projectData.scripts).length;
    if(numFiles === this.oldFileCount) return;
    this.oldFileCount = numFiles;

    super.ngOnChanges(data);
    this._scriptList = _(this.internalProject.scripts).keys().map(key => ({ key, script: this.internalProject.scripts[key] })).value();
  }

}