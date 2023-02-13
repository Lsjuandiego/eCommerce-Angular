import { AdminGuard } from './guards/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink/public-api';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m =>m.WebsiteModule),
      data: {
        preload:true
      }
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(m =>m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules
    preloadingStrategy: CustomPreloadService
    //preloadingStrategy:QuicklinkStrategy INVESTIGAR COMO SOLUCIONAR PARA QUE FUNCIONE
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
