import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/modelos/color';
import { Producto } from 'src/app/modelos/producto';
import { Talla } from 'src/app/modelos/talla';
import { ProductoService } from 'src/app/servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  producto: Producto=new Producto();
  tallaForm: string="";
  tallasForm: String="";
  colorForm: string="";
  coloresForm: string="";
  color: string="";

  imagen: any;

  constructor(private productoService : ProductoService ) { }

  ngOnInit(): void {
  }

  crear(){
    console.log(this.producto);
    this.productoService.crear(this.producto).subscribe(
      res => {
        if (res!=null){
          Swal.fire(constantes.exito, constantes.exito_crear_producto, constantes.exito_swal);
          this.crearImagen();
        }
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  crearTalla(){
    let talla: Talla=new Talla();
    talla.descripcion=this.tallaForm;
    this.producto.tallas.push(talla);
    this.tallasForm=this.tallasForm+this.tallaForm+"|";
  }

  crearColor(){
    let color: Color=new Color();
    color.descripcion=this.colorForm;
    this.producto.colores.push(color);
    this.coloresForm=this.coloresForm+this.colorForm+"|";
  }

  cargarImagen(event: any){
    let imagenes: FileList=event.target.files;
    this.imagen = imagenes.item(0);
  }

  crearImagen(){
    this.productoService.crearImagen(this.imagen).subscribe(
      res => {
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

}
