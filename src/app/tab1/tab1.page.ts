import { Component, OnInit } from '@angular/core';

import { RequestService } from '../servicios/request.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  usuarios: any;
  data!: object;
  
  constructor( private datos: RequestService,
                private alert: AlertController) {}

  ngOnInit(): void {
     this.datos.getUsuarios().subscribe
     ( resp => {
      this.usuarios = resp['usuarios'];
      
     }); 
  }

  async edit(i:number){
    let usuarioEdit = this.usuarios[i];
    console.log('id', usuarioEdit._id);
    let id = usuarioEdit._id;    

    let prompt = await this.alert.create({
      header: 'Editar Usuario',
      message: 'modificar los datos',
      inputs: [
        {
          name: 'userid',
          placeholder: 'userid',
          value: usuarioEdit.userid
          
          
        },
        {
          name: 'clave',
          placeholder: 'clave',
          value: usuarioEdit.clave
        },
        {
          name: 'rol',
          placeholder: 'rol',
          value: usuarioEdit.rol
        },
       
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
            (<any>this.data)['_id'] = usuarioEdit._id;
      
           
            
            console.log('datos del edit:', this.data);

     fetch('https://serveringroup.herokuapp.com/usuarios',{
      method: 'PUT',
      body: JSON.stringify(this.data),
      headers: { "Content-type": "application/json"}
    })
    .then(resp => resp.json())
    .then((data) => {
      if(data.dbCliente){
        alert('usuario modificado!');
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
    var result = window.confirm('confirmar Borrar Usuario?');
    let idDel = this.usuarios[i]._id;
    
  if(result){
   
    //console.log('id a ser borrado: ', this.idDel);
    fetch(`https://serveringroup.herokuapp.com/usuarios/${idDel}`, {
      method:'DELETE',
      headers: { "Content-type": "application/json"}
    }). then(resp =>{
      if(resp.ok == false){
        alert('error al borrar Consulte al Administrador')
      } else{
        alert('usuario eliminado!');
      }
    });
  }
  }

  async nuevoUsuario(){
    

    let nuevo = await this.alert.create({
      header: 'Nuevo Usuario',
      message: 'introducir los datos del nuevo usuario',
      inputs: [
        {
          name: 'userid',
          placeholder: 'userid'
          
        }, 
        {
          name: 'clave',
          placeholder: 'clave'
            
        },
                 
        {
          name: 'rol',
          placeholder: 'rol'
         
        }
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (resp: any) => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Crear nuevo usuario',
          handler: (value: any) => {
            
            this.data = value;
         
            console.log('datos del new usuario:', this.data);

     fetch('https://serveringroup.herokuapp.com/usuarios/reg',{
      method: 'POST',
      body: JSON.stringify(this.data),
      headers: { "Content-type": "application/json"}
    })
    .then(resp => resp.json())
    .then((data) => {
      if(data.ok == true){
        alert('nuevo usuario registrado !');
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






   


   


  



