import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from'@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { UsuariodialogoComponent } from '../usuariodialogo/usuariodialogo.component';


import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule, MatInputModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
