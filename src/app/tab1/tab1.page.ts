import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RequestService } from '../servicios/request.service';
import { UsuariodialogoComponent } from '../usuariodialogo/usuariodialogo.component';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  usuarios: any;
  displayColumn : string[] = ['userid', 'clave', 'rol', 'opciones'];
  dataSource : any
  filaDialogo: string[] = [];
  usuarioForm!: FormGroup;
  newusuario: {} = {};
  idDel: string =  '';

  @ViewChild(IonModal) modal!: IonModal;

  constructor( private datos: RequestService,
                private fb: FormBuilder,
                private matDialog: MatDialog) { 
                  this.usuarioForm =  this.fb.group({
                    userid: '',
                    clave: '', 
                    rol:''
                  });    
                }

  ngOnInit(): void {
     this.datos.getUsuarios().subscribe
     ( resp => {
      this.usuarios = resp['usuarios'];
      this.dataSource = this.usuarios;
     }); 
  }

  openDialog(i:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '0',
      left :'0'
    };
    this.filaDialogo = [this.usuarios[i]._id, this.usuarios[i].userid, this.usuarios[i].clave, this.usuarios[i].rol];
   console.log('fila click: ', this.filaDialogo);
   this.datos.datos = this.filaDialogo;
    
    
    const dialogRef = this.matDialog.open(UsuariodialogoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log('output', data)
    );
  
  }

  cancelar(){
    this.modal.dismiss(null, 'cancelar');
  }

  enviar(){

    this.newusuario = this.usuarioForm.value;
    this.datos._body = this.newusuario;

    fetch('https://serveringroup.herokuapp.com/usuarios/reg',{
      method: 'POST',
      body: JSON.stringify(this.datos._body),
      headers: { "Content-type": "application/json"}
    })
    .then(resp => resp.json())
    .then((data) => {
      if(data.ok == true){
        alert('nuevo usuario registrado');
      }else{
        alert('error Consulte al administrador');
      }
    });


    console.log('nuevo usuario', this.newusuario);


  }



  delete(i:number){
    var result = window.confirm('confirmar Borrar Usuario?');
    
        if(result){ this.idDel = this.usuarios[i]._id;
   
    //console.log('id a ser borrado: ', this.idDel);
    fetch(`https://serveringroup.herokuapp.com/usuarios/${this.idDel}`, {
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



}
