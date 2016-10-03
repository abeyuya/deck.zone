
import { CreateContainerComponent } from './container/createcontainer.component';
import { InvalidProjectComponent } from './invalid/invalid.component';
import { SettingsComponent } from './settings/settings.component';

export const routes = [
  { path: '',                     name: 'Root',     component: CreateContainerComponent, useAsDefault: true },
  { path: ':projectId',           name: 'Create',   component: CreateContainerComponent },
  { path: ':projectId/404',       name: 'Invalid',  component: InvalidProjectComponent },
  { path: ':projectId/settings',  name: 'Settings', component: SettingsComponent }
];