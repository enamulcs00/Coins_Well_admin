import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fv',
  templateUrl: './fv.component.html',
  styleUrls: ['./fv.component.scss']
})
export class FvComponent implements OnInit {
  title: string;
	message: string;
	status : boolean = false;
	public onClose: Subject<boolean>;
  image: any;
	constructor(public bsModalRef: BsModalRef,private commn_:CommonService) { 
		this.onClose = new Subject();
	}
	ngOnInit() {
		this.bsModalRef.content
    console.log(this.message);
    this.getFvById();
	}
  
  getFvById()
  {
   this.commn_.get(urls.getFvByUserId+this.message+"/").subscribe(
     (res)=>{
     console.log(res);
     this.image=environment.imgBaseUrl+res.data[0].facial_image.media_file;
     }
   );
  }

	public onConfirm(): void {
        this.onClose.next(true);
        this.bsModalRef.hide();
    }

    public onCancel(): void {
        this.onClose.next(false);
        this.bsModalRef.hide();
    }
}
