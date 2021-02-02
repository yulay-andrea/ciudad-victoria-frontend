import { Component, OnInit } from '@angular/core';
import { Producto } from '../../modelos/producto';
import { ProductoService } from '../../servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leer-producto',
  templateUrl: './leer-producto.component.html',
  styleUrls: ['./leer-producto.component.css']
})
export class LeerProductoComponent implements OnInit {

  constructor(private sesionService: SesionService, private productoService : ProductoService,
    private router: Router ) { }

  productos: Producto[]=[];
  productoBuscar: Producto=new Producto();

  ngOnInit(): void {
    this.validarSesion();
    this.productoService.consultar().subscribe(
      res => {
        this.productos = res
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  seleccion(producto: Producto){

  }

  buscar(){
    
  }

  validarSesion(){
    let usuarioActivo=this.sesionService.clienteLogueado();
    if(!usuarioActivo){
      this.navegarIndex();
    }
  }

  navegarIndex() {
    this.router.navigate(['/index']);
  }

  cerrarSesion(event:any){
    if (event!=null)
      event.preventDefault();
    this.sesionService.cerrarSesion();
  }

}
