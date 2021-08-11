import { AuthGuard } from './_gurads/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { LoggedGuard } from '../app/_gurads/logged.guard';

const routes: Routes = [

	{
		path: '',
		loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
		canActivate : [AuthGuard]
	},
	{
		path: 'core',
		loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
		canActivate : [LoggedGuard]
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/auth/login'

	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes), MaterialModule],
	exports: [RouterModule, MaterialModule]
})
export class AppRoutingModule { }
