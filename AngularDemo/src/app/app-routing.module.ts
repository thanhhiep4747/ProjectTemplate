import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => {
            return import('./modules/admin/admin.module').then((m) => {
                return m.AdminModule;
            });
        }
    },
    {
        path: '',
        loadChildren: () => {
            return import('./modules/client/client.module').then((m) => {
                return m.ClientModule;
            });
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
