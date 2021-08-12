import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  title: string;
	message: string;
	status : boolean = false;
	public onClose: Subject<boolean>;
  image: string="";
  items: any;
	constructor(public bsModalRef: BsModalRef,private commn_:CommonService) { 
		this.onClose = new Subject();
	}
	ngOnInit() {
		this.bsModalRef.content;
    console.log(this.message);
    this.getDocumentById();
	}
  
  getDocumentById()
  {
    this.commn_.get(urls.getDocumentByUserId+this.message+"/").subscribe(res=>{
    console.log(res);
    this.items=res.data;
    this.image=environment.imgBaseUrl;
    });
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
