import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/producto';
import { ProductoService } from '../servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../constantes';
import { environment } from './../../environments/environment';
import { Pedido } from '../modelos/pedido';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LineaPedido } from '../modelos/linea-pedido';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  productos: Producto[]=[];

  productosEnc: any[]=[];

  productoPedido: Producto=null as any; 

  pedido: Pedido=null as any;

  lineaPedido: LineaPedido=new LineaPedido();

  prefijoUrlImagenes=environment.prefijo_url_imagenes;

  cerrarModal: string="";
  
  constructor(private productoService : ProductoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.productoService.consultar().subscribe(
      res => {
        this.productos = res
        let productosRec: Producto[]=[];
        for(let i=0; i<this.productos.length; i++){
          productosRec.push(this.productos[i]);
          if(productosRec.length==3){
            this.productosEnc.push(productosRec);
            productosRec=[];
          }
        }
        if(productosRec.length>0){
          this.productosEnc.push(productosRec);
        }
        console.log(this.productosEnc);
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  agregarLineaPedido(producto: Producto){

  }

  crearLineaPedido(){

  }

  bolsos(event:any){

  }
  trajesDeportivos(event:any){

  }
  zapatos(event:any){

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
}
