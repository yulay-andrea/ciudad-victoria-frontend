import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from 'src/app/modelos/pedido';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { environment } from './../../../environments/environment';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';

@Component({
  selector: 'app-leer-pedido',
  templateUrl: './leer-pedido.component.html',
  styleUrls: ['./leer-pedido.component.css']
})
export class LeerPedidoComponent implements OnInit {

  pedidoActualizar: Pedido= null as any;
  pedidos: Pedido[]=[];
  qr: any= null as any;
  prefijoUrlImagenes = environment.prefijo_url_imagenes;

  cerrarModal: string="";
  @ViewChild('modalActualizarPedido', { static: false }) private modalActualizarPedido: any;

  constructor(private pedidoService: PedidoService, private sesionService: SesionService,
    private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.consultarPedidos();
  }

  consultarPedidos(){
    this.pedidoService.consultar().subscribe(
      res => {
        this.pedidos = res
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  actualizarPedido(){
    console.log(this.pedidoActualizar);
    this.pedidoService.crear(this.pedidoActualizar).subscribe(
      res => {
          Swal.fire(constantes.exito, constantes.exito_actualizar_producto, constantes.exito_swal);
          if(this.qr!=null){
            this.crearQr(res.id);
          }
          this.modalService.dismissAll();
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  crearQr(id: number){
    this.pedidoService.crearQr(this.qr, id).subscribe(
      res => {
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  editar(i: number){
    this.pedidoActualizar= {... this.pedidos[i]};
    this.open(this.modalActualizarPedido);
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

  cargarQr(event: any){
    let qrs: FileList=event.target.files;
    this.qr=qrs.item(0);
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
