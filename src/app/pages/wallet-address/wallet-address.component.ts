import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_services/common.service';
import {urls} from '../../_services/urls';

@Component({
  selector: 'app-wallet-address',
  templateUrl: './wallet-address.component.html',
  styleUrls: ['./wallet-address.component.scss']
})
export class WalletAddressComponent implements OnInit {
  walletForm:FormGroup;
  asset:FormArray;
  name=[];
  id:any=[];
  constructor(private fb: FormBuilder,private comn_:CommonService,private toastr:ToastrService) { 
    this.walletForm=this.fb.group({
      asset: this.fb.array([]) ,
    });
  }
  
  ngOnInit(): void {
    this.getWalletAddress()
  }

  createItem(): FormGroup {
    return this.fb.group({
      address: ['',[Validators.required]]
    });
  }
   
  

  add(){ 
    this.asset = this.walletForm.get('asset') as FormArray;
  this.asset.push(this.createItem());
  }
  

  getWallet() {
    return <FormArray>this.walletForm.get('asset');
    }
  
    getWalletAddress()
  {
    this.name=[];
    this.id=[];
  this.comn_.get(urls.getWalletAddress).subscribe(res=>{
    console.log(res);
  for(let i=0;i<res.data.length;i++)
  {
  this.add();  
  }
  for(let i=0;i<res["data"].length;i++)
  {
  this.name.push(res["data"][i]['asset']);
  this.id.push(res["data"][i]['id']);
  this.getWallet().controls[i]["controls"].address.setValue(res["data"][i].address);
  }
  });
  }

  updateForm(id)
  {
    let body={
      asset:this.name[id],
      address:this.getWallet().controls[id]['value'].address,
  }
  console.log(body,this.id[id]);
  this.comn_.put(urls.updateWalletAddress+this.id[id]+"/",body).subscribe(res=>{
    if(res.code==200)
    {
      this.toastr.success(res.message,"Success",{timeOut:1050});
      this.walletForm=this.fb.group({
        asset: this.fb.array([]) ,
      });
      this.getWalletAddress();
    }
    else
    {
      this.toastr.error(res.message,"Error",{timeOut:1050});
    }
   console.log(res);
  });
  }

}
