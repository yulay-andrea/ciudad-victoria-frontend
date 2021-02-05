import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../modelos/producto';
import { ProductoService } from '../../servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Color } from 'src/app/modelos/color';
import { Talla } from 'src/app/modelos/talla';

@Component({
  selector: 'app-leer-producto',
  templateUrl: './leer-producto.component.html',
  styleUrls: ['./leer-producto.component.css']
})
export class LeerProductoComponent implements OnInit {

  productoActualizar: Producto=new Producto();
  tallaForm: string="";
  colorForm: string="";
  imagen: any= null as any;

  cerrarModal: string="";

  @ViewChild('modalProductoActualizar', { static: false }) private modalProductoActualizar: any;

  constructor(private sesionService: SesionService, private productoService : ProductoService,
    private modalService: NgbModal, private router: Router ) { }

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

  buscar(){
    console.log(this.productoBuscar);
    this.productoService.buscar(this.productoBuscar).subscribe(
      res => {
        this.productos=res;
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  validarSesion(){
    let usuarioActivo=this.sesionService.adminLogueado();
    if(!usuarioActivo){
      this.navegarIndex();
    }
  }

  noDisponible(i: number){
    
  }

  editar(i: number){
    this.productoActualizar= {... this.productos[i]};
    this.open(this.modalProductoActualizar);
  }

  crearTalla(){
    let talla: Talla=new Talla();
    talla.descripcion=this.tallaForm;
    this.productoActualizar.tallas.push(talla);
  }

  eliminarTalla(i: number){
    this.productoActualizar.tallas.splice(i, 1);
  }

  crearColor(){
    let color: Color=new Color();
    color.descripcion=this.colorForm;
    this.productoActualizar.colores.push(color);
  }

  eliminarColor(i: number){
    this.productoActualizar.colores.splice(i, 1);
  }

  eliminarImagen(i: number){
    this.productoActualizar.imagenes.splice(i, 1);
  }

  actualizar(){
    console.log(this.productoActualizar);
    this.productoService.crear(this.productoActualizar).subscribe(
      res => {
          Swal.fire(constantes.exito, constantes.exito_actualizar_producto, constantes.exito_swal);
          if(this.imagen!=null){
            this.crearImagen(res.id);
          }
          this.modalService.dismissAll();
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
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

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.cerrarModal = `Closed with: ${result}`;
    }, (reason) => {
      this.cerrarModal = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
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
