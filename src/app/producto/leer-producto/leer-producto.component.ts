import { Component, OnInit } from '@angular/core';
import { Producto } from '../../modelos/producto';
import { ProductoService } from '../../servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';

@Component({
  selector: 'app-leer-producto',
  templateUrl: './leer-producto.component.html',
  styleUrls: ['./leer-producto.component.css']
})
export class LeerProductoComponent implements OnInit {

  constructor(private productoService : ProductoService) { }

  productos: Producto[]=[];
  producto_buscar: Producto=new Producto();

  ngOnInit(): void {

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

  nombre_buscar(){
    
  }

}
