import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm:FormGroup;
  constructor(private fb:FormBuilder) { 
    this.userForm=this.fb.group({
      phone_number:[''],
      first_name:[''],
      last_name:[''],
      building_no:[''],
      image:[''],
      street:[''],
      zone:[''],
      currency:[''],
      country_code:[''],
      user_documnets:[''],
      email:[''],
      password:['']
    });
   }

  ngOnInit(): void {
  }

}
