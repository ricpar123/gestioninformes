import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RequestService } from '../servicios/request.service';
import {FormGroup, FormBuilder } from '@angular/forms';

import { jsPDF } from "jspdf";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{


  informes: any;
  clientes: any;
  data!: object;
  infoForm!: FormGroup;

  constructor(private datos: RequestService,
              private alert: AlertController,
              private fb: FormBuilder) {
                this.infoForm = this.fb.group({
                  fechaIni: '',
                  fechaFin: '',
                  cliente: ''                  
                });
              }

  ngOnInit(): void {

    this.datos.getInformes().subscribe
    (resp => {
      if ( resp.ok == true){
        this.informes = resp.informes;
        console.log('informes:', this.informes);
        this.modificarFormatoFecha();
      }
      
    });

    this.datos.getClientes().subscribe
    (resp => {
      this.clientes = resp['listaClientes'];
      console.log('clientes', this.clientes);
    });
      
  }

  modificarFormatoFecha(){
  this.informes.forEach((element: any) => {
      let fecha = element.fecha;
      const fd = fecha.slice(0,4);
      const md = fecha.slice(5,7);
      const ld = fecha.slice(8,10);
      fecha = `${ld}`  +'-' + `${md}` +'-' +`${fd}`;
      element.fecha = fecha;
     
    });
  }

  detalles(i:number){
    let datosInf = this.informes[i];
    let numero = (this.informes[i].numero).toString();
   
    const doc = new jsPDF();
    doc.rect(6, 6, 200, 50);
    doc.setFont('Helvetica', 'BoldOblique');
    doc.setFontSize(30)
    doc.text('I N G r o u p S. R. L', 10,15);
    doc.setFont('Courier','Bold' );
    
    doc.setFontSize(20);
    doc.text('Ingenieria Electromecanica',10,25);
    doc.setFont('Courier', 'Oblique');
   
    doc.setFontSize(15);
    doc.text('Maria F. Gonzalez 820',12,33);
    doc.setFont('Courier', 'Oblique');
   
    doc.setFontSize(15);
    doc.text('Telefono: (0981) 401 850',30,40);
    doc.setFont('Courier', 'Oblique');
   
    doc.setFontSize(15);
    doc.text('e-mail: empresaingroup@gmail.com',12,47);
    doc.setFont('Courier','Oblique');

    doc.setFontSize(15);
    doc.text('Fdo. de la Mora - Paraguay',30,55);
    doc.line(120, 6, 120, 56);
    doc.line(120, 33, 206, 33);
    doc.setFont('Courier', 'Oblique');

    doc.setFontSize(15);
    doc.text('INFORME DE SERVICIO TECNICO',120,20);
    doc.setFont('times','bold');
  
    doc.setFontSize(20);
    doc.text('Nº:',135,50);
    doc.text(numero,150,50);
    doc.rect(6, 56, 200, 10);
    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Tecnico:', 8,63);
    doc.setFont('courier','oblique' );
    
    doc.setFontSize(15);
    doc.text(this.informes[i].tecnico, 40,63);

    doc.rect(6, 66, 200, 10);
    doc.setFont('courier', 'bold');
    
    doc.setFontSize(15);
    doc.text('Cliente:',8,73);
    doc.setFont('courier', 'oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].cliente, 35,73);

    doc.rect(6, 76, 200, 10);
    doc.rect(6, 86, 200, 10);
    doc.line(120, 76, 120, 96);

    doc.setFont('courier', 'bold');
    
    doc.setFontSize(15);
    doc.text('Equipo:', 8,81);
    doc.setFont('courier', 'oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].descripcion,35,81);

    doc.setFont('courier', 'bold');
    
    doc.setFontSize(15);
    doc.text('Marca:',122,81);
    doc.setFont('courier','oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].marca, 150,81);

    doc.setFont('courier', 'bold');
    
    doc.setFontSize(15);
    doc.text('Modelo:',8,91);
    doc.setFont('courier', 'oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].modelo, 35,91);

    doc.setFont('courier', 'bold');
    
    doc.setFontSize(15);
    doc.text('Nro Serie:', 122,91);
    doc.setFont('courier','oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].serie,165,91);

    //Campos motivo, trabajo, presupuesto
    doc.rect(6, 96, 200, 10);
    doc.rect(6, 106, 200, 10);
    doc.line(120, 106, 120, 116)


    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Motivo de la visita:',8,104);
    doc.setFont('courier', 'oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].motivo,85,104);

    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Tipo de trabajo:',8,112);
    doc.setFont('courier', 'oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].tipoTrabajo,65,112);

    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Presupuesto:',125,112);
    doc.setFont('courier', 'oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].presupuesto,165,112);

    //Campos de Fechas Inicio, Fin, horas
    doc.rect(6, 116, 200, 10);
    doc.rect(6, 126, 200, 10);
    doc.rect(6, 136, 200, 10);
    doc.rect(6, 146, 200, 10);
    doc.line(120, 126, 120, 136);

    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Fechas de inicio/fin      Horas trabajadas',50,123);

    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Inicio:',8,133);
    doc.setFont('courier','oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].fechaInicio,30,133);

    doc.setFont('courier', 'bold');
    
    doc.setFontSize(15);
    doc.text('Hr:',70,133);
    doc.setFont('courier', 'oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].horaInicio,80,133);

    doc.setFont('courier', 'bold');
    
    doc.setFontSize(15);
    doc.text('Fin:',122,133);
    doc.setFont('courier','oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].fechaFin,135,133);

    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Hr:',170,133);
    doc.setFont('courier', 'oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].horaFin,180,133);

    //Campos de horas normales, lab y viaje
    doc.setFont('courier', 'bold');
    
    doc.setFontSize(15);
    doc.text('Horas Normales:',8,143);
    doc.setFont('courier','oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].horasNormales,60,143);

    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Horas Lab:',85,143);
    doc.setFont('courier','oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].horasLab,120,143);

    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Horas Viaje:',140,143);
    doc.setFont('courier','oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].horasViaje,180,143);

    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Horas Totales:',80,153);
    doc.setFont('courier','oblique');
  
    doc.setFontSize(15);
    doc.text(this.informes[i].horasTotales,130,153);
    //Campo de Servicio realizado
    doc.rect(6, 156, 200, 10);
    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Servicio Realizado',80,163);
    //doc.rect(6, 166, 200, 50);
    doc.rect(6, 166, 200, 30);
    doc.setFont('courier','oblique');
 
    doc.setFontSize(15);
    doc.text(this.informes[i].servicio,8,173);

    //Campo de Observaciones
    //doc.rect(6, 216, 200, 10);
    doc.rect(6, 196, 200, 10);
    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Observaciones',80,200);
    doc.setFont('courier','oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].obs,8,231);
    //doc.rect(6, 226, 200, 30);
    doc.rect(6, 206, 200, 30);

    //campo de Recibido por, Ci nro
    //doc.rect(6,256, 200, 10);
    doc.rect(6, 236, 200, 10);

    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Recibido por:',8,243);
    doc.setFont('courier', 'oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].recibido,60,243);
    doc.setFont('courier', 'bold');
    
    doc.setFontSize(15);
    doc.text('CI nro:',140,243);
    doc.setFont('courier','oblique');
    
    doc.setFontSize(15);
    doc.text(this.informes[i].ci,170,243);

    //Campo de firma, fecha
    //doc.rect(6, 266, 200, 25);
    doc.rect(6, 246, 200, 45);
    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Firma del cliente:',8,253);
    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Fecha:',140,253);
    doc.setFont('courier', 'oblique');
    
    doc.setFontSize(15);
    doc.addImage(this.informes[i].firma, 'PNG', 10, 263, 50, 20);
    doc.setFont('courier','oblique');

    doc.setFontSize(15);
    doc.text(this.informes[i].fecha,160,253);
    doc.setFont('courier','bold');
    
    doc.setFontSize(15);
    doc.text('Firma del Tecnico',140,283);
    doc.addImage(this.informes[i].firmaT, 'PNG', 140, 253, 50, 20);







    doc.save('informe.pdf');

    

  }

  onSubmit() {
   
    let formulario = this.infoForm.value;
    console.log('valores:', formulario);
    let inicio = formulario.fechaIni;
    let fin = formulario.fechaFin;
    let cli = formulario.cliente;

    if(inicio == '' &&  fin == '' && cli == ''){
      alert ('los campos deben ser llenados');
      return;
    } else if( inicio == '' && fin == '' && cli != '') {
      inicio = 'undefined'; fin = 'undefined'
    }else if( cli == ''){
      cli='undefined';
    } 
    
    fetch(`https://serveringroup.herokuapp.com/informes/inicio/${inicio}/fin/${fin}/cliente/${cli}`)
    .then(resp  => resp.json())
    .then(data => {
      this.informes = data.informes;
    });

    
  }
}
