import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { RequestService } from '../servicios/request.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  clientes: any;
  data! : object;
  idDel: string =  '';

  

  constructor( private datos: RequestService,
              private alert: AlertController) {};  
    

  ngOnInit(): void {
        this.datos.getClientes().subscribe( resp => {
          this.clientes = resp['listaClientes'];
          
        });
    }

  async edit(i:number){
      let clienteEdit = this.clientes[i];
      console.log('id', clienteEdit._id);
      let id = clienteEdit._id;    
  
      let prompt = await this.alert.create({
        header: 'Editar Cliente',
        message: 'modificar los datos',
        inputs: [
          {
            name: 'email1',
            placeholder: 'email1',
            value: clienteEdit.email1
            
            
          },
          {
            name: 'email2',
            placeholder: 'email2',
            value: clienteEdit.email2
          },
          {
            name: 'email3',
            placeholder: 'email3',
            value: clienteEdit.email3
          },
          {
            name: 'email4',
            placeholder: 'email4',
            value: clienteEdit.email4
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: (resp: any) => {
              console.log('Cancelado', resp);
            }
          },
          {
            text: 'Guardar modificaciones',
            handler: (value: any) => {
              
              this.data = value;
              (<any>this.data)['_id'] = clienteEdit._id;
        
             
              
              console.log('datos del edit:', this.data);
  
       fetch('https://serveringroup.herokuapp.com/clientes',{
        method: 'PUT',
        body: JSON.stringify(this.data),
        headers: { "Content-type": "application/json"}
      })
      .then(resp => resp.json())
      .then((data) => {
        if(data.dbCliente){
          alert('cliente modificado!');
        }else{
          alert('error Consulte al Administrador')
        }
      });
  
            }
          }
        ]
      })
      prompt.present();
  }
  
  delete(i:number){
    var result = window.confirm('Corfirmar borrar Cliente');
    if(result){
      let idDel = this.clientes[i]._id;
      fetch(`https://serveringroup.herokuapp.com/clientes/${idDel}`, {
        method:'DELETE',
      
        headers: { "Content-type": "application/json"}
      }). then(resp =>{
        if(resp.ok == false){
          alert('error al borrar Consulte al Administrador')
        } else{
          alert('cliente eliminado!');
        }
      });

    }
  }


  async nuevoCliente(){
    

    let nuevo = await this.alert.create({
      header: 'Nuevo Cliente',
      message: 'introducir los datos del nuevo Cliente',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'nombre'
          
        }, 
        {
          name: 'email1',
          placeholder: 'email1'
            
        },
                 
        {
          name: 'email2',
          placeholder: 'email2'
         
        },
        {
          name: 'email3',
          placeholder: 'email3'
        
        },
        {
          name: 'email4',
          placeholder: 'email4'
       
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (resp: any) => {
            console.log('Cancelado', resp);
          }
        },
        {
          text: 'Hecho!',
          handler: (value: any) => {
            
            this.data = value;
         
            console.log('datos del new cliente:', this.data);

     fetch('https://serveringroup.herokuapp.com/clientes',{
      method: 'POST',
      body: JSON.stringify(this.data),
      headers: { "Content-type": "application/json"}
    })
    .then(resp => resp.json())
    .then((data) => {
      if(data.ok == true){
        alert('nuevo cliente registrado !');
      }else{
        alert('error Consulte al Administrador')
      }
    });

          }
        }
      ]
    })
    nuevo.present();
  }
}
