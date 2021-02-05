import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { Pedido } from 'src/app/modelos/pedido';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { environment } from './../../../environments/environment';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leer-pedido-cliente',
  templateUrl: './leer-pedido-cliente.component.html',
  styleUrls: ['./leer-pedido-cliente.component.css']
})
export class LeerPedidoClienteComponent implements OnInit {

  pedidos: Pedido[]=[];
  prefijoUrlImagenes = environment.prefijo_url_imagenes;

  constructor(private pedidoService: PedidoService, private sesionService: SesionService) { }

  ngOnInit(): void {
    this.consultarPedidos();
  }

  consultarPedidos(){
    let cliente: Cliente=this.sesionService.getCliente();
    this.pedidoService.consultarPorCliente(cliente.celular).subscribe(
      res => {
          this.pedidos=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_pedido, constantes.error_swal)
      }
    );
  }
}
