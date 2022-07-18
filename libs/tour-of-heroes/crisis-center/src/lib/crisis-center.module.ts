import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CrisisCenterComponent } from './crisis-center/crisis-center.component';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, CrisisCenterRoutingModule],
  declarations: [CrisisCenterComponent],
})
export class CrisisCenterModule {}
