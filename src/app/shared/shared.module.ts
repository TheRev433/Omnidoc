import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@src/app/shared/input/input.component';
import { LabelComponent } from './label/label.component';
import { LinkComponent } from './link/link.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    InputComponent,
    LabelComponent,
    LinkComponent,
    EmptyStateComponent,
  ],
  exports: [InputComponent, LabelComponent, LinkComponent, EmptyStateComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class SharedModule {}
