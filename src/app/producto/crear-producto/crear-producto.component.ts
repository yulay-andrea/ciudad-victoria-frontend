import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/modelos/color';
import { Producto } from 'src/app/modelos/producto';
import { Talla } from 'src/app/modelos/talla';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SesionService } from 'src/app/servicios/sesion.service';
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
  imagen: any= null as any;

  constructor(private productoService : ProductoService, private sesionService: SesionService,
    private router: Router ) { }

  ngOnInit(): void {
    this.validarSesion();
  }

  validarSesion(){
    let usuarioActivo=this.sesionService.adminLogueado();
    if(!usuarioActivo){
      this.navegarIndex();
    }
  }

  crear(){
    console.log(this.producto);
    this.productoService.crear(this.producto).subscribe(
      res => {
          Swal.fire(constantes.exito, constantes.exito_crear_producto, constantes.exito_swal);
          if(this.imagen!=null){
            this.crearImagen(res.id);
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

  eliminarTalla(i: number){
    this.producto.tallas.splice(i, 1);
  }

  crearColor(){
    let color: Color=new Color();
    color.descripcion=this.colorForm;
    this.producto.colores.push(color);
    this.coloresForm=this.coloresForm+this.colorForm+"|";
  }

  eliminarColor(i: number){
    this.producto.colores.splice(i, 1);
  }

  cargarImagen(event: any){
    let imagenes: FileList=event.target.files;
    this.imagen=imagenes.item(0);
  }

  crearImagen(id: number){
    this.productoService.crearImagen(this.imagen, id).subscribe(
      res => {
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  navegarIndex() {
    this.router.navigate(['/index']);
  }

  cerrarSesion(event:any){
    if (event!=null)
      event.preventDefault();
    this.sesionService.cerrarSesion();
    this.navegarIndex();
  }

}
