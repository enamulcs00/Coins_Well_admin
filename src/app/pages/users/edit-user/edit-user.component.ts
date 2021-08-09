import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm:FormGroup;
  constructor(private fb:FormBuilder) { 
    this.editUserForm=this.fb.group({
      phone_number:['',[Validators.required,Validators.pattern(/^([0-9])*$/)]],
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      building_no:['',[Validators.required]],
      image:[''],
      zone:['',[Validators.required]],
      street:['',[Validators.required]],
      document:[''],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      cash:['',[Validators.required,Validators.pattern(/^([0-9])*$/)]]
    });    
  }
  
  ngOnInit(): void {
  }

}
