import { Component } from '@angular/core';
import { Block } from 'notiflix';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'angularlearn';
	constructor() {
		Block.init({
			backgroundColor:"rgba(255,255,255,0.547)",
		})
	}
}
