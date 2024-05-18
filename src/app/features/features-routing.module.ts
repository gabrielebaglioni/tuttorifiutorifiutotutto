import { NgModule } from '@angular/core';
import {ActivatedRouteSnapshot, mapToCanActivate, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {IFeatureRoute} from "./features-route.interface";

export const featureRoutes = {
  home: {path: 'home'} as IFeatureRoute,
}
const routes: Routes = [
  {
    path: featureRoutes.home.path,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  { path: '**', redirectTo: featureRoutes.home.path, pathMatch: 'full' },
  { path: '', redirectTo: featureRoutes.home.path, pathMatch: 'full' },
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
