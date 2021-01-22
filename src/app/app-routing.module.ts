import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './administracion/administracion.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: PrincipalComponent},
  { path: 'inicio-sesion', component: InicioSesionComponent},
  { path: 'administracion', component: AdministracionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
