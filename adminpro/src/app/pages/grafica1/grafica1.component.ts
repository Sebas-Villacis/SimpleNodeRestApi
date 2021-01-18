import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component   {

  public labels1: String[] = ['Sales 1', 'Sales 2', 'Sales 3'];
  public data1 = [
    [100, 450, 500],
  
  ];
}
