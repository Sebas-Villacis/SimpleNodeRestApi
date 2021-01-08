import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementorComponent } from './incrementor/incrementor.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [IncrementorComponent, DonaComponent],
  exports:[IncrementorComponent,DonaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    
  ]
})
export class ComponentsModule { }
