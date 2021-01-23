import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { UsuarioService } from '../servicios/usuario.service';
import * as constantes from '../constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  public usuario: Usuario=new Usuario();

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    this.usuarioService.inciarSesion(this.usuario).subscribe(
      res => {
        console.log(res);
        if(res!=null){
          this.navegarExitoso();
        } else{
          Swal.fire(constantes.error, constantes.error_iniciosesion, constantes.error_swal);
        }
      },
      error => Swal.fire(constantes.error, error.error.mensaje, constantes.error_swal),
    );
  }

  navegarExitoso() {
    this.router.navigate(['/administracion']);
  }
}
