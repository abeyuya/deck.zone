import { provideRouter } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProjectListComponent } from './projectlist/projectlist.component';
import { ExamplesComponent } from './examples/examples.component';
import { HelpComponent } from './help/help.component';
import { CreateComponent } from './create/create.component';
import { ContactComponent } from './contact/contact.component';
import { EmbedViewContainerComponent } from './embed/embedviewcontainer.component';

import { routes as createRoutes } from './create/create.routes';
import { routes as embedRoutes } from './embed/embed.routes';

export const routes = [

  { path: '',             name: 'Home',      component: HomeComponent, useAsDefault: true },
  { path: 'create',       name: 'Create',    component: CreateComponent, children: createRoutes },
  { path: 'projects',     name: 'Projects',  component: ProjectListComponent },
  { path: 'examples',     name: 'Examples',  component: ExamplesComponent },
  { path: 'help',         name: 'Help',      component: HelpComponent },
  { path: 'contact',      name: 'Contact',   component: ContactComponent },
  { path: 'embed',        name: 'Embed',     component: EmbedViewContainerComponent, children: embedRoutes }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];