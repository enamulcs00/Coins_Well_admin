import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm:FormGroup;
  userDoc: any;
  userPic: any;
  imageUrl: any;
  localId: any;
  constructor(private fb:FormBuilder,private toaster:ToastrService,private commn_:CommonService,private route:ActivatedRoute,private router:Router) { 
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
    this.route.queryParams.subscribe(params=>{
      this.getUserbyId(params.id);
      this.localId=params.id;
    })
  }
  
  getUserbyId(id)
  {
   this.commn_.get(urls.getUserById+id+"/").subscribe(res=>{
     if(res.code==200)
     {
      console.log(res);
      this.editUserForm.controls.first_name.setValue(res?.data?.first_name);
      this.editUserForm.controls.last_name.setValue(res?.data?.last_name);
      this.editUserForm.controls.phone_number.setValue(res?.data?.phone_number);
      this.editUserForm.controls.email.setValue(res?.data?.email);
      this.editUserForm.controls.building_no.setValue(res?.data?.building_no);
      this.editUserForm.controls.zone.setValue(res?.data?.zone);
      this.editUserForm.controls.cash.setValue(res?.data?.cash);
      this.editUserForm.controls.street.setValue(res?.data?.street);
      this.editUserForm.controls.document.setValue(res?.data?.user_documents[0]?.document);
      this.imageUrl=environment.imgBaseUrl+res.data.image.media_file;
     }
     else
     {
       this.toaster.error(res.message,"Error",{timeOut:1050});
     }
   });
  }

  onDocumentSelect(e) {
    var files = e.target.files;
    if (files[0].size <= 10000000) {
      this.userDoc = files[0];
      this.toaster.success("User Document Selected","Success",{timeOut:1050});
      this.uploadMedia();
    } else {
      this.userDoc = null;
    }
  }
  
  onImageSelect(e) {
    var files = e.target.files;
    if (files[0].size <= 10000000) {
      this.userPic = files[0];
      this.toaster.success("User Image Selected","Success",{timeOut:1050});
      this.uploadMedia();
    } else {
      this.userPic = null;
    }
  }
  
  uploadMedia()
  {
    let formData=new FormData();
    if(this.userPic)
    {
    formData.append("media",this.userPic);
    }
    else if(this.userDoc)
    {
    formData.append("media",this.userDoc);
    }  
    this.commn_.post(urls.addMedia,formData).subscribe((res)=>{
    if(res.message=="OK")
    {
    if(this.userPic)
    {
      this.imageUrl=environment.imgBaseUrl+res.data[0].media_file;
      this.editUserForm.controls.image.setValue(res.data[0].id);
    }
    if(this.userDoc)
    {
      this.editUserForm.controls.document.setValue(res.data[0].id);
    }
      this.toaster.success(res.message,"Success",{timeOut:1050});
    }
    });
  }
   
  updateUser()
  {
    if(this.editUserForm.valid)
    {

      let body={
        first_name:this.editUserForm.value.first_name,
        last_name:this.editUserForm.value.last_name,
        phone_number:this.editUserForm.value.phone_number,
        building_no:this.editUserForm.value.building_no,
        zone:this.editUserForm.value.zone,
        email:this.editUserForm.value.email,
        cash:this.editUserForm.value.cash,
        street:this.editUserForm.value.street,
      };
      if(this.editUserForm.value.document!=""){
        body['user_documents'] =  [
          {
              "document":this.editUserForm.value.document
          }
      ]
      }
      
      if(this.editUserForm.value.password!='')
      {
        body['password']=this.editUserForm.value.password;
      }
      if(this.editUserForm.value.image!='')
      {
        body['image']=this.editUserForm.value.image;
      }


      this.commn_.put(urls.updateUserById+this.localId+"/",body).subscribe(res=>{
        if(res.code==200)
        {
          this.toaster.success(res.message,"Success",{timeOut:1050});
          this.router.navigate(['/users']);
        }
        else
        {
          this.toaster.error(res.message,"Error",{timeOut:1050});
        }
      });
      
    }
    else
    {
      this.toaster.error("Fill all Required Fields!","Error",{timeOut:1050});
    }
    
  }

}
