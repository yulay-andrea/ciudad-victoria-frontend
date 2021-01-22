import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  public usuario: Usuario=new Usuario();

  constructor() { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    
  }



}
