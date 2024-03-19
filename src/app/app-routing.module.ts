import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { NavigationErrorComponent } from './core/navigation-error/navigation-error.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path:'login',loadChildren:() => import('./login/login.module')
    .then(m => m.LoginModule)
  },
  {
    path:'chat-board',loadChildren: () => import('./chat-board/chat-board.module')
    .then(m => m.ChatBoardModule),canLoad:[AuthGuard]
  },
  // Wildcard route for unmatched URLs
  { path: '**', redirectTo: '/error' }, // Redirect to '/error' for any unmatched route

  // Error route for displaying the ErrorComponent
  { path: 'error', component:NavigationErrorComponent},
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
