import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/common/shared.module';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, ClientRoutingModule, SharedModule]
})
export class ClientModule {}
