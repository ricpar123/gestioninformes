import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!:FormGroup

  constructor( private router: Router,
                private fb: FormBuilder) {
                  this.loginForm = this.fb.group({
                    userid: '',
                    clave:''
                  });
                 }

  ngOnInit() {
  }

  enviar(){
    let datosFormu = this.loginForm.value;
    
    var lista =[];
    let rolUsuario: string;
    
    console.log('datos del formu', datosFormu);

    fetch('https://serveringroup.herokuapp.com/usuarios/log', {
      method: 'POST',
      body: JSON.stringify(datosFormu),
      headers: {"Content-Type": "application/json"}
    })
    .then(resp => resp.json())
    .then((data) => {
      if(data.ok == true){
        console.log('usuario', data.usuario);
         rolUsuario = data.usuario.rol;
        console.log('rol:', rolUsuario);

      }else {
        alert('error en login, consulte con el Administrador');
        return;
      }
      if( rolUsuario == 'admin'){
        this.router.navigate(['tabs']);
      }else{
        alert('autenticacion con errores, Consulte al Administrador');
        return;
      }
    })

  }

}
