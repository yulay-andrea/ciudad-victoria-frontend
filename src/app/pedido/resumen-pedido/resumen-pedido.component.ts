import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../modelos/pedido';
import { PedidoService } from '../../servicios/pedido.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { SesionService } from '../../servicios/sesion.service';
import { Cliente } from '../../modelos/cliente';
import { LineaPedido } from '../../modelos/linea-pedido';

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.component.html',
  styleUrls: ['./resumen-pedido.component.css']
})
export class ResumenPedidoComponent implements OnInit {

  pedido: Pedido = new Pedido();
  codigo: string = null as any;
  lineasPedido: LineaPedido[] = [];
  habilitarConfirmarPedido: boolean=false;
  constructor(private pedidoService: PedidoService, private sesionService: SesionService) { }

  ngOnInit(): void {
    this.construirPedido();
  }


  construirPedido() {
    this.codigo = this.sesionService.getCodigo();
    this.lineasPedido = this.sesionService.getLineasPedido();
    if (this.lineasPedido == null) {
      this.lineasPedido = [];
    }
    if (this.codigo != null) {
      this.pedidoService.obtenerPorCodigo(this.codigo).subscribe(
        res => {
          this.pedido = res;
          for (let i = 0; i < this.lineasPedido.length; i++) {
            this.pedido.lineasPedido.push(this.lineasPedido[i]);
          }
          console.log("actualizar pedido");
          console.log(this.pedido);
          this.pedidoService.actualizar(this.pedido).subscribe(
            res => {
              this.pedido = res;
              this.sesionService.eliminarLineasPedido();
              let total: number = 0;
              for (let i = 0; i < this.pedido.lineasPedido.length; i++) {
                total = total + (this.pedido.lineasPedido[i].producto.precio * this.pedido.lineasPedido[i].cantidad);
              }
              this.pedido.total = total;
              this.sesionService.setCodigo(this.pedido.codigo);
              if(this.pedido.lineasPedido.length>0){
                this.pedido.cliente=new Cliente();
                this.habilitarConfirmarPedido=true;
                
              }
            },
            err => {
              Swal.fire(constantes.error, constantes.error_actualizar_pedido, constantes.error_swal)
            }
          );
        },
        err => {
          Swal.fire(constantes.error, constantes.error_obtener_pedido, constantes.error_swal)
        }
      );
    }

    if (this.codigo == null && this.lineasPedido.length>0) {
      for (let i = 0; i < this.lineasPedido.length; i++) {
        this.pedido.lineasPedido.push(this.lineasPedido[i]);
      }
      console.log("crear pedido");
      console.log(this.pedido);
      this.pedidoService.crear(this.pedido).subscribe(
        res => {
          this.pedido = res;
          this.sesionService.eliminarLineasPedido();
          let total: number = 0;
          for (let i = 0; i < this.pedido.lineasPedido.length; i++) {
            total = total + (this.pedido.lineasPedido[i].producto.precio * this.pedido.lineasPedido[i].cantidad);
          }
          this.pedido.total = total;
          this.sesionService.setCodigo(this.pedido.codigo);
          if(this.pedido.lineasPedido.length>0){
            this.pedido.cliente=new Cliente();
            this.habilitarConfirmarPedido=true;
            
          }
        },
        err => {
          Swal.fire(constantes.error, constantes.error_crear_pedido, constantes.error_swal)
        }
      );
    }
    
  }

  confirmarPedido() {
    console.log(this.pedido);
    this.pedidoService.confirmar(this.pedido).subscribe(
      res => {
        if (res != null) {
          Swal.fire(constantes.exito, constantes.exito_confirmar_pedido, constantes.exito_swal);
          this.pedido=res;
          this.sesionService.eliminarCodigo();
        }
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  eliminarLineaPedido(i: number){
    this.pedido.lineasPedido.splice(i, 1);
    let total: number = 0;
    for (let i = 0; i < this.pedido.lineasPedido.length; i++) {
      total = total + (this.pedido.lineasPedido[i].producto.precio * this.pedido.lineasPedido[i].cantidad);
    }
    this.pedido.total = total;
    this.pedidoService.actualizar(this.pedido).subscribe(
      res => {
        this.pedido = res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_actualizar_pedido, constantes.error_swal)
      }
    );
  }
}
