import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-change',
  templateUrl: './rate-change.component.html',
  styleUrls: ['./rate-change.component.scss']
})
export class RateChangeComponent implements OnInit {
  rateForm:FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rateForm=this.fb.group({
      
    });
  }

}
