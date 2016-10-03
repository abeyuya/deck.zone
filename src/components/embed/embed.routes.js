
import { EmbedViewComponent } from './embedview/embedview.component';

export const routes = [
  { path: '',                     name: 'Root',     component: EmbedViewComponent, useAsDefault: true },
  { path: ':projectId',           name: 'Embed',    component: EmbedViewComponent }
];