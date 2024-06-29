import { LoginModule } from './modules/login/login.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' 
  },
  {
    path: 'login',
    // canActivate: [LoginGuard],
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'chat',
    // canActivate: [LoginGuard],
    loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'registro',
    // canActivate: [LoginGuard],
    loadChildren: () => import('./modules/registro/registro.module').then(m => m.RegistroModule)
  },
  {
    path: 'test',
    // canActivate: [LoginGuard],
    loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
