import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

const MaterialComponents = [MatButtonModule,MatInputModule,MatFormFieldModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatRadioModule,MatCheckboxModule,MatButtonModule,MatIconModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MaterialComponents
  ],
  exports : [MaterialComponents]
})
export class ModuleModule { }
