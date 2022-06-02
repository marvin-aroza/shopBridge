import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add/add.component';
import { ViewComponent } from './view/view/view.component';

const routes: Routes = [
  {
    path: 'add',
    loadChildren: () => import(`./add/add.module`).then(m => m.AddModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import(`./add/add.module`).then(m => m.AddModule)
  },
  {
    path: ':id',
    loadChildren: () => import(`./view/view.module`).then(m => m.ViewModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
