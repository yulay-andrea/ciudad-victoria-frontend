import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../modelos/producto';
import { ProductoService } from '../servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../constantes';
import { environment } from './../../environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LineaPedido } from '../modelos/linea-pedido';
import { PedidoService } from '../servicios/pedido.service';
import { SesionService } from '../servicios/sesion.service';
import { ClienteService } from '../servicios/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  productos: Producto[] = [];
  
  productosEnc: any[] = [];

  productoPedido: Producto = null as any;
  tallaPedido: number = -1;
  colorPedido: number = -1;

  lineasPedido: LineaPedido[] = [];

  lineaPedido: LineaPedido = new LineaPedido();

  prefijoUrlImagenes = environment.prefijo_url_imagenes;

  @ViewChild('modalAgregarLineaPedido', { static: false }) private modalAgregarLineaPedido: any;

  cerrarModal: string = "";

  constructor(private productoService: ProductoService, private pedidoService: PedidoService,
    private clienteService: ClienteService, private sesionService: SesionService,
    private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.productoService.consultar().subscribe(
      res => {
        this.productos = res
        let productosRec: Producto[] = [];
        for (let i = 0; i < this.productos.length; i++) {
          productosRec.push(this.productos[i]);
          if (productosRec.length == 3) {
            this.productosEnc.push(productosRec);
            productosRec = [];
          }
        }
        if (productosRec.length > 0) {
          this.productosEnc.push(productosRec);
        }
        console.log(this.productosEnc);
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  /*leerPedido(event: any) {
    if (event!=null)
      event.preventDefault();
    Swal.fire({
      title: constantes.titulo_generar_pedido,
      text: constantes.ingresar_numero_celular,
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        let cliente: Cliente=new Cliente();
        cliente.celular=result.value;
        this.crearCliente(cliente);
      }
    });
  }*/

  agregarLineaPedido(producto: Producto) {
    this.productoPedido = producto;
    this.open(this.modalAgregarLineaPedido);
  }

  crearLineaPedido() {
    this.modalService.dismissAll();
    this.lineaPedido.producto = this.productoPedido;
    this.lineaPedido.talla = this.productoPedido.tallas[this.tallaPedido];
    this.lineaPedido.color = this.productoPedido.colores[this.colorPedido];
    this.lineasPedido.push(this.lineaPedido);
    this.lineaPedido = new LineaPedido();
    console.log(this.lineasPedido);
    this.sesionService.setLineasPedido(this.lineasPedido)
  }

  bolsos(event: any) {

  }
  trajesDeportivos(event: any) {

  }
  zapatos(event: any) {

  }

  navegarPedido() {
    this.router.navigate(['/resumen-pedido']);
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
