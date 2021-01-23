import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './administracion/administracion.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: PrincipalComponent},
  { path: 'iniciosesion', component: InicioSesionComponent},
  { path: 'administracion', component: AdministracionComponent},
  { path: 'crearproducto', component: CrearProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
