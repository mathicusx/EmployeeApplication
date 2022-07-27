import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule} from '@angular/material/expansion';

const MaterialComponents = [
    MatButtonModule,
    MatExpansionModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [ MaterialComponents],

})
export class MaterialModule { }
