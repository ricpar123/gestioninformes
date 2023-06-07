import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from '../servicios/request.service';


@Component({
  selector: 'app-usuariodialogo',
  templateUrl: './usuariodialogo.component.html',
  styleUrls: ['./usuariodialogo.component.scss'],
})
export class UsuariodialogoComponent  implements OnInit {

  form!: FormGroup;
  filaDialog: string[] = [];


  constructor(public dialogRef: MatDialogRef<UsuariodialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder, 
    private datos: RequestService) {
      this.form = this.fb.group({
        "_id": this.datos.datos[0],
        "userid":  this.datos.datos[1],
        "clave": this.datos.datos[2],
        "rol": this.datos.datos[3]
      });
     }

  ngOnInit() {

  }

  close(){
    this.dialogRef.close('chau');
  }

  guardar(){
    this.datos._body = this.form.value;

    fetch('https://serveringroup.herokuapp.com/usuarios', {
      method: 'PUT',
      body: JSON.stringify(this.datos._body),
      headers: { "Content-type": "application/json"}
    })
    .then(resp => resp.json())
    .then((data) => {
      if(data.dbEquipo){
        alert('usuario modificado');
      }else{
        alert('error Consulte al administrador');
      }
    });
   
  }

  

}
