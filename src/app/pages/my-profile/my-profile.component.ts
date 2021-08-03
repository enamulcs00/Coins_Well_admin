import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validString } from 'src/app/_validators/string';
import { validEmail } from 'src/app/_validators/validEmail';
@Component({
	selector: 'app-my-profile',
	templateUrl: './my-profile.component.html',
	styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
	selectedCountry: any;
	signUpForm: FormGroup;
	constructor(private _fb: FormBuilder) { }

	ngOnInit(): void {
		this.signUpForm = this._fb.group({
			full_name: [null, [Validators.required, Validators.maxLength(30), Validators.minLength(4), validString]],
			email: [null, [validEmail, Validators.required, Validators.email]],
			full_phone: [null, Validators.required],
			phone_number: [null, [Validators.required]],
			country_code: [null, Validators.required],
		});
	}

	countryChanged(event: any) {
		if (event) {
			this.selectedCountry = event;
		}
	}

	signUpNow() {
		// if (this.signUpForm.get('full_phone').value) {
		// 	let phones = this.signUpForm.get('full_phone').value.split(this.selectedCountry.dialCode);
		// 	this.signUpForm.get('phone_number').setValue(phones[1]);
		// 	this.signUpForm.get('country_code').setValue('+' + this.selectedCountry.dialCode);
		// }
	}
}
