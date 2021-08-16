import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Block } from 'notiflix';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { Page } from '../modal/page';
import { ExportToCsv } from 'export-to-csv';

declare var $:any
@Component({
  selector: 'app-bank-name-list',
  templateUrl: './bank-name-list.component.html',
  styleUrls: ['./bank-name-list.component.scss'],
})
export class BankNameListComponent implements OnInit {
  @Input('status') status: boolean | null;
  @Input('flag') flag: boolean | null;

  @Input('searchData') searchData = {
    event: new Subject(),
    value: '',
  };
  page = new Page();
  rows = new Array<any>();
  ColumnMode = ColumnMode;
  definedColumns = [
    {
      data: 'id',
    },
    {
      data: 'name',
    },
    {
      data: 'branch',
    },
    {
      data: 'ifsc',
    },
  ];
  formData: any = {
    status: status,
    draw: 0,
    columns: this._common.getColumns(this.definedColumns),
    order: [
      {
        column: 0,
        dir: 'desc',
      },
    ],
    start: 0,
    length: 10,
    search: {
      value: '',
      regex: false,
    },
  };

  baseUrl: string = environment.homeURL;
  imgurl: any;
  constructor(
    private _common: CommonService,
    private router: Router,
    private _noti: NotificationsService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.searchData.event.subscribe((searchText) => {
      this.setPage({
        offset: 0,
      });
    });
  }

  searchHere() {
    this.searchData.event.next();
  }
  setPage(pageInfo) {
    this.formData.search.value = this.searchData.value;
    this.formData.start = pageInfo.offset * this.formData.length;
    this._common
      .post(urls.getBankDetails, this.formData)
      .subscribe((_pagedData) => {
        console.log('Bank list', _pagedData);
        this.page = {
          totalElements: _pagedData.recordsTotal,
          pageNumber: pageInfo.offset,
          totalPages: Math.ceil(_pagedData.recordsTotal / this.formData.length),
          size: this.formData.length,
        };
        this.rows = _pagedData.data;
        setTimeout((x) => {
          Block.remove('#users-list-page');
        }, 700);
      });
  }
  ShowImage(image){
    this.imgurl = image
    console.log("show image called");
    $('#userclick').modal('show');
    
  }
  Delete(id) {
    this._noti.confirm('Delete!', 'Do you want to delete ?').subscribe((x) => {
      if (x) {
        this._common
          .delete(`admin/delete-bank-by-pk/${id}/`)
          .subscribe((res: any) => {
            if (res.code == 200) {
              this.ngOnInit();
              this._noti.show(
                'success',
                'Bank deleted successfully.',
                'Success!'
              );
            }
          });
      }
    });
  }
  
  exportToCsv()
  {
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: '',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
   
  const csvExporter = new ExportToCsv(options);
   this._common.get(urls.bankExportCsv).subscribe(res=>{
   csvExporter.generateCsv(res.data);
   });
  }

}
