import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeerProductoComponent } from './producto/leer-producto/leer-producto.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: PrincipalComponent},
  { path: 'iniciar-sesion', component: InicioSesionComponent},
  { path: 'leer-producto', component: LeerProductoComponent},
  { path: 'crear-producto', component: CrearProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
