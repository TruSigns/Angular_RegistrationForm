import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { CdkPortal } from '@angular/cdk/portal';
import { UserDetailComponent } from './user-detail/user-detail.component';

//routes to different pages for the web applcation
const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: CreateRegistrationComponent },
  { path: 'list', component: RegistrationListComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'update/:id', component: CreateRegistrationComponent },
  // { path: 'detail/:id', component: UserDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
