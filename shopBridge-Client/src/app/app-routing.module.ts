import { HeaderComponent } from 'src/app/_shared/_components/header/header.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from 'src/app/_shared/_components/error/error.component'

const routes: Routes = [
  {
    path: 'product',
    component: HeaderComponent,
    loadChildren: () => import(`./modules/product/product.module`).then(m => m.ProductModule)
  },
  {
    path: '',
    component: HeaderComponent,
    loadChildren: () => import(`./modules/homepage/homepage.module`).then(m => m.HomepageModule)
  },
  {path: '404', component: ErrorComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], // Add preloading stragery
  exports: [RouterModule]
})
export class AppRoutingModule { }
