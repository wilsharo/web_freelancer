import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { BlogComponent } from './blog/blog.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'pages/faq',
    pathMatch: 'full'
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
    //redirectTo: 'pages/coming-soon'
  },
 {
    path: 'blog',
    component: BlogComponent,
    loadChildren: './blog/blog.module#BlogModule'
  },
  {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule'
  },
  {
    path: '**',
    redirectTo: 'pages/faq'
  }
];

