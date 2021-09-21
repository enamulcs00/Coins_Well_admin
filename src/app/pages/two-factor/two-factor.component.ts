import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerifyPhoneComponent } from '../../verification-module/verify-phone/verify-phone.component';
@Component({
	selector: 'app-two-factor-page',
	templateUrl: './two-factor.component.html',
	styleUrls: ['./two-factor.component.scss']
})
export class TwoFactorPageComponent implements OnInit {
	
	constructor(private dialog : MatDialog) { }
	ngOnInit(): void {
	}

	checkThisOne() {
		const dialogRef = this.dialog.open(VerifyPhoneComponent);
		dialogRef.afterClosed().subscribe(x=>{
			
			// console.log("Closed", x);
		})
	}
	
}
