(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{CHwo:function(e,t,n){"use strict";n.r(t),n.d(t,"ManageAdminsModule",(function(){return W}));var r=n("ofXK"),a=n("tyNb"),o=n("65KX"),m=n("Z+m1"),s=n("3Pt+"),i=n("AytR"),l=n("vZrp"),d=n("fXoL"),c=n("YWaA"),u=n("5eHb"),p=n("kmnG"),h=n("qFsG"),g=n("bSwM");function f(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1,"Image Required!"),d["\u0275\u0275elementEnd"]())}function b(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," First Name Required! "),d["\u0275\u0275elementEnd"]())}function v(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," First Name invalid! "),d["\u0275\u0275elementEnd"]())}function E(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Max Character 15! "),d["\u0275\u0275elementEnd"]())}function S(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Min Character 3! "),d["\u0275\u0275elementEnd"]())}function x(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Last Name Required! "),d["\u0275\u0275elementEnd"]())}function w(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Last Name invalid! "),d["\u0275\u0275elementEnd"]())}function _(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Min Character length 3! "),d["\u0275\u0275elementEnd"]())}function y(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Max Character length 15! "),d["\u0275\u0275elementEnd"]())}function F(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Email Required! "),d["\u0275\u0275elementEnd"]())}function I(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Email invalid! "),d["\u0275\u0275elementEnd"]())}function C(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Password Required! "),d["\u0275\u0275elementEnd"]())}function A(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Password invalid! "),d["\u0275\u0275elementEnd"]())}function M(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Password Min Length 8! "),d["\u0275\u0275elementEnd"]())}function P(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Phone Number Required! "),d["\u0275\u0275elementEnd"]())}function O(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Phone Number invalid! "),d["\u0275\u0275elementEnd"]())}function N(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Phone Number Max Length 15! "),d["\u0275\u0275elementEnd"]())}function k(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"mat-error"),d["\u0275\u0275text"](1," Phone Number Min Length 3! "),d["\u0275\u0275elementEnd"]())}function D(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementContainerStart"](0),d["\u0275\u0275elementStart"](1,"tr",14),d["\u0275\u0275elementStart"](2,"td"),d["\u0275\u0275text"](3),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](4,"td"),d["\u0275\u0275elementStart"](5,"mat-checkbox",41),d["\u0275\u0275listener"]("change",(function(){d["\u0275\u0275restoreView"](e);const n=t.index;return d["\u0275\u0275nextContext"]().checkPermission(n)})),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](6,"td"),d["\u0275\u0275element"](7,"mat-checkbox",42),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementContainerEnd"]()}if(2&e){const e=t.$implicit,n=t.index,r=d["\u0275\u0275nextContext"]();d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("formGroup",e),d["\u0275\u0275advance"](2),d["\u0275\u0275textInterpolate1"](" ",r.permissionItems[n].name," ")}}let L=(()=>{class e{constructor(e,t,n,r,a){this.fb=e,this.commn_=t,this.toaster=n,this.router=r,this.route=a,this.imageFlag=!1,this.adminId=null,this.userForm=this.fb.group({phone_number:[null,[s.A.required,s.A.pattern(/^([0-9])*$/),s.A.maxLength(15),s.A.minLength(7)]],first_name:[null,[s.A.required,s.A.minLength(3),s.A.maxLength(15),s.A.pattern(new RegExp("\\S"))]],last_name:[null,[s.A.required,s.A.minLength(3),s.A.maxLength(15),s.A.pattern(new RegExp("\\S"))]],image:[null],email:[null,[s.A.required,s.A.email]],password:[null,[s.A.required,s.A.pattern(new RegExp("\\S")),s.A.minLength(8)]],country_code:["+91"],permissions:this.fb.array([])}),this.route.queryParams.subscribe(e=>{this.adminId=e.id,this.adminId&&this.getAdminInfo()})}getAdminInfo(){l.Loading.circle(),this.commn_.get(m.a.getSubAdminById+this.adminId).subscribe(e=>{this.fillAdminInfo(e.data),l.Loading.remove()},()=>{l.Loading.remove()})}fillAdminInfo(e){e.permissions=e.permissions.map(e=>(e.module=e.module.id,e)),this.userForm.patchValue(e),this.imageUrl=i.a.homeURL+e.image.media_file}ngOnInit(){this.getSubAdmin()}getSubAdmin(){this.commn_.get(m.a.getSubAdminList).subscribe(e=>{console.log(e),this.permissionItems=e.data,null==e||e.data.forEach(e=>{this.getForms().push(this.createForms(e))})})}createForms(e){return this.fb.group({module:e.id,is_add_edit:!1,is_view:!1})}getForms(){return this.userForm.get("permissions")}onImageSelect(e){var t=e.target.files;t[0].size<=1e7?(this.imageFlag=!1,this.userPic=t[0],this.uploadMedia()):this.userPic=null}uploadMedia(){let e=new FormData;this.userPic&&e.append("media",this.userPic),this.commn_.post(m.a.addMedia,e).subscribe(e=>{"OK"==e.message&&this.userPic&&(this.imageUrl=i.a.imgBaseUrl+e.data[0].media_file,this.userForm.controls.image.setValue(e.data[0].id),this.toaster.success(e.message,"Success",{timeOut:1050}))})}addUser(){if(this.userForm.valid){l.Loading.circle();let e=m.a.addSubAdmin;null!=this.adminId?(e=m.a.editSubAdminStatus+this.adminId+"/",this.commn_.put(e,this.userForm.value).subscribe(e=>{200==e.code?(this.toaster.success(e.message,"Success",{timeOut:1050}),this.router.navigate(["/manage-admins"])):this.toaster.error(e.message,"Error",{timeOut:1050}),l.Loading.remove()})):this.commn_.post(e,this.userForm.value).subscribe(e=>{200==e.code?(this.toaster.success(e.message,"Success",{timeOut:1050}),this.router.navigate(["/manage-admins"])):this.toaster.error(e.message,"Error",{timeOut:1050}),l.Loading.remove()})}else this.userForm.markAllAsTouched(),l.Loading.remove()}checkPermission(e){let t=this.getForms().at(e);t.get("is_add_edit").value&&t.get("is_view").setValue(!0)}}return e.\u0275fac=function(t){return new(t||e)(d["\u0275\u0275directiveInject"](s.g),d["\u0275\u0275directiveInject"](c.a),d["\u0275\u0275directiveInject"](u.b),d["\u0275\u0275directiveInject"](a.b),d["\u0275\u0275directiveInject"](a.a))},e.\u0275cmp=d["\u0275\u0275defineComponent"]({type:e,selectors:[["app-add"]],decls:85,vars:23,consts:[[1,"admin-content"],[1,"bg-dark"],[1,"container-fluid","m-b-30"],[1,"col-12","text-white","p-t-40","p-b-90"],[1,"ex-main"],[1,""],[1,"btn","btn-white-translucent"],[1,"mdi","mdi-account"],["routerLink","/manage-admins",1,"btn","btn-white-translucent"],[1,"container-fluid","pull-up"],[1,"row"],[1,"col-lg-12"],[1,"card","m-b-30"],[1,"card-body"],[3,"formGroup"],[1,"user-profile"],[3,"src"],[1,"upload-avatar"],["type","file","id","myfile","name","myfile","accept","image/*",3,"change"],[1,"overlay"],[4,"ngIf"],[1,"form-row"],[1,"form-group","col-md-6"],["appearance","outline",1,"row","col-12"],["for","first_name"],["matInput","","type","text","formControlName","first_name","id","first_name",3,"keydown.space"],["space",""],["for","last_name"],["matInput","","type","text","formControlName","last_name","id","last_name",3,"keydown.space"],["spac",""],["for","email"],["type","text","matInput","","id","email","formControlName","email","placeholder",""],["for","password"],["matInput","","type","password","formControlName","password","id","password"],["for","phone_number"],["type","text","matInput","","formControlName","phone_number","id","phone_number"],["formArrayName","permissions",1,"form-row"],[1,"table"],[4,"ngFor","ngForOf"],[1,"form-group"],[1,"btn","btn-primary",3,"click"],["color","primary","formControlName","is_add_edit",1,"example-margin",3,"change"],["color","primary","formControlName","is_view",1,"example-margin"]],template:function(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"section",0),d["\u0275\u0275elementStart"](1,"div",1),d["\u0275\u0275elementStart"](2,"div",2),d["\u0275\u0275elementStart"](3,"div",3),d["\u0275\u0275elementStart"](4,"div",4),d["\u0275\u0275elementStart"](5,"h4",5),d["\u0275\u0275elementStart"](6,"span",6),d["\u0275\u0275element"](7,"i",7),d["\u0275\u0275elementEnd"](),d["\u0275\u0275text"](8),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](9,"a",8),d["\u0275\u0275text"](10,"Back"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](11,"div",9),d["\u0275\u0275elementStart"](12,"div",10),d["\u0275\u0275elementStart"](13,"div",11),d["\u0275\u0275elementStart"](14,"div",12),d["\u0275\u0275elementStart"](15,"div",13),d["\u0275\u0275elementStart"](16,"form",14),d["\u0275\u0275elementStart"](17,"div",15),d["\u0275\u0275elementStart"](18,"figure"),d["\u0275\u0275element"](19,"img",16),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](20,"div",17),d["\u0275\u0275elementStart"](21,"input",18),d["\u0275\u0275listener"]("change",(function(e){return t.onImageSelect(e)})),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](22,"span",19),d["\u0275\u0275text"](23,"+"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275template"](24,f,2,0,"mat-error",20),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](25,"div",21),d["\u0275\u0275elementStart"](26,"div",22),d["\u0275\u0275elementStart"](27,"mat-form-field",23),d["\u0275\u0275elementStart"](28,"mat-label",24),d["\u0275\u0275text"](29,"First Name"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](30,"input",25,26),d["\u0275\u0275listener"]("keydown.space",(function(t){return d["\u0275\u0275restoreView"](e),d["\u0275\u0275reference"](31).value?null:t.preventDefault()})),d["\u0275\u0275elementEnd"](),d["\u0275\u0275template"](32,b,2,0,"mat-error",20),d["\u0275\u0275template"](33,v,2,0,"mat-error",20),d["\u0275\u0275template"](34,E,2,0,"mat-error",20),d["\u0275\u0275template"](35,S,2,0,"mat-error",20),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](36,"div",22),d["\u0275\u0275elementStart"](37,"mat-form-field",23),d["\u0275\u0275elementStart"](38,"mat-label",27),d["\u0275\u0275text"](39,"Last Name"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](40,"input",28,29),d["\u0275\u0275listener"]("keydown.space",(function(t){return d["\u0275\u0275restoreView"](e),d["\u0275\u0275reference"](41).value?null:t.preventDefault()})),d["\u0275\u0275elementEnd"](),d["\u0275\u0275template"](42,x,2,0,"mat-error",20),d["\u0275\u0275template"](43,w,2,0,"mat-error",20),d["\u0275\u0275template"](44,_,2,0,"mat-error",20),d["\u0275\u0275template"](45,y,2,0,"mat-error",20),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](46,"div",21),d["\u0275\u0275elementStart"](47,"div",22),d["\u0275\u0275elementStart"](48,"mat-form-field",23),d["\u0275\u0275elementStart"](49,"mat-label",30),d["\u0275\u0275text"](50,"Email"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275element"](51,"input",31),d["\u0275\u0275template"](52,F,2,0,"mat-error",20),d["\u0275\u0275template"](53,I,2,0,"mat-error",20),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](54,"div",22),d["\u0275\u0275elementStart"](55,"mat-form-field",23),d["\u0275\u0275elementStart"](56,"mat-label",32),d["\u0275\u0275text"](57,"Password"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275element"](58,"input",33),d["\u0275\u0275template"](59,C,2,0,"mat-error",20),d["\u0275\u0275template"](60,A,2,0,"mat-error",20),d["\u0275\u0275template"](61,M,2,0,"mat-error",20),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](62,"div",21),d["\u0275\u0275elementStart"](63,"div",22),d["\u0275\u0275elementStart"](64,"mat-form-field",23),d["\u0275\u0275elementStart"](65,"mat-label",34),d["\u0275\u0275text"](66,"Phone Number"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275element"](67,"input",35),d["\u0275\u0275template"](68,P,2,0,"mat-error",20),d["\u0275\u0275template"](69,O,2,0,"mat-error",20),d["\u0275\u0275template"](70,N,2,0,"mat-error",20),d["\u0275\u0275template"](71,k,2,0,"mat-error",20),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](72,"div",36),d["\u0275\u0275elementStart"](73,"table",37),d["\u0275\u0275elementStart"](74,"tr"),d["\u0275\u0275elementStart"](75,"td"),d["\u0275\u0275text"](76,"Name"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](77,"td"),d["\u0275\u0275text"](78,"Add/Edit"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](79,"td"),d["\u0275\u0275text"](80,"View"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275template"](81,D,8,2,"ng-container",38),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](82,"div",39),d["\u0275\u0275elementStart"](83,"button",40),d["\u0275\u0275listener"]("click",(function(){return t.addUser()})),d["\u0275\u0275text"](84),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"]()}2&e&&(d["\u0275\u0275advance"](8),d["\u0275\u0275textInterpolate1"](" ",t.adminId?"Edit":"Add"," Sub Admin "),d["\u0275\u0275advance"](8),d["\u0275\u0275property"]("formGroup",t.userForm),d["\u0275\u0275advance"](3),d["\u0275\u0275property"]("src",t.imageUrl?t.imageUrl:"assets/img/users/defaultuser.jpg",d["\u0275\u0275sanitizeUrl"]),d["\u0275\u0275advance"](5),d["\u0275\u0275property"]("ngIf",t.imageFlag),d["\u0275\u0275advance"](8),d["\u0275\u0275property"]("ngIf",t.userForm.controls.first_name.touched&&t.userForm.controls.first_name.hasError("required")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.first_name.touched&&t.userForm.controls.first_name.hasError("pattern")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.first_name.touched&&t.userForm.controls.first_name.hasError("maxlength")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.first_name.touched&&t.userForm.controls.first_name.hasError("minlength")),d["\u0275\u0275advance"](7),d["\u0275\u0275property"]("ngIf",t.userForm.controls.last_name.touched&&t.userForm.controls.last_name.hasError("required")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.last_name.touched&&t.userForm.controls.last_name.hasError("pattern")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.last_name.touched&&t.userForm.controls.last_name.hasError("minlength")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.last_name.touched&&t.userForm.controls.last_name.hasError("maxlength")),d["\u0275\u0275advance"](7),d["\u0275\u0275property"]("ngIf",t.userForm.controls.email.touched&&t.userForm.controls.email.hasError("required")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.email.touched&&t.userForm.controls.email.hasError("email")),d["\u0275\u0275advance"](6),d["\u0275\u0275property"]("ngIf",t.userForm.controls.password.touched&&t.userForm.controls.password.hasError("required")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.password.touched&&t.userForm.controls.password.hasError("pattern")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.password.touched&&t.userForm.controls.password.hasError("minlength")),d["\u0275\u0275advance"](7),d["\u0275\u0275property"]("ngIf",t.userForm.controls.phone_number.touched&&t.userForm.controls.phone_number.hasError("required")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.phone_number.touched&&t.userForm.controls.phone_number.hasError("pattern")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.phone_number.touched&&t.userForm.controls.phone_number.hasError("maxlength")),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.userForm.controls.phone_number.touched&&t.userForm.controls.phone_number.hasError("minlength")),d["\u0275\u0275advance"](10),d["\u0275\u0275property"]("ngForOf",t.getForms().controls),d["\u0275\u0275advance"](3),d["\u0275\u0275textInterpolate"](t.adminId?"Edit":"Add"))},directives:[a.d,s.B,s.t,s.l,r.n,p.c,p.f,h.b,s.d,s.s,s.j,s.f,r.m,p.b,g.a],styles:[".upload-avatar[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{z-index:1;cursor:pointer;font-size:0}.upload-avatar[_ngcontent-%COMP%]   .overlay[_ngcontent-%COMP%], .upload-avatar[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%}.upload-avatar[_ngcontent-%COMP%]   .overlay[_ngcontent-%COMP%]{display:none;background:rgba(0,0,0,.3);align-items:center;justify-content:center;font-size:40px;color:#fff}.upload-avatar[_ngcontent-%COMP%]:hover   .overlay[_ngcontent-%COMP%]{display:flex}"]}),e})();var j=n("lDzL"),U=n("XNiG"),q=n("FV+P");function R(e,t){if(1&e&&d["\u0275\u0275text"](0),2&e){const e=t.rowIndex,n=d["\u0275\u0275nextContext"]();d["\u0275\u0275textInterpolate1"](" ",n.page.pageNumber*n.page.size+e+1," ")}}function V(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"div",29),d["\u0275\u0275listener"]("click",(function(){d["\u0275\u0275restoreView"](e);const n=t.row,r=d["\u0275\u0275nextContext"]();return r.userModal(r.baseUrl+n.image.media_file)})),d["\u0275\u0275element"](1,"img",30),d["\u0275\u0275elementEnd"]()}if(2&e){const e=t.row,n=d["\u0275\u0275nextContext"]();d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("src",e.image?n.baseUrl+e.image.media_file:"assets/img/users/defaultuser.jpg",d["\u0275\u0275sanitizeUrl"])}}function H(e,t){if(1&e&&d["\u0275\u0275text"](0),2&e){const e=t.row;d["\u0275\u0275textInterpolate1"](" ",null==e?null:e.id," ")}}function z(e,t){if(1&e&&d["\u0275\u0275text"](0),2&e){const e=t.row;d["\u0275\u0275textInterpolate2"](" ",null==e?null:e.first_name," ",null==e?null:e.last_name," ")}}function $(e,t){if(1&e&&(d["\u0275\u0275elementStart"](0,"span"),d["\u0275\u0275text"](1),d["\u0275\u0275elementEnd"]()),2&e){const e=t.row;d["\u0275\u0275advance"](1),d["\u0275\u0275textInterpolate1"](" ",null==e?null:e.email," ")}}function B(e,t){1&e&&d["\u0275\u0275text"](0),2&e&&d["\u0275\u0275textInterpolate1"](" ",t.row.phone_number," ")}function T(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"label",31),d["\u0275\u0275elementStart"](1,"input",32),d["\u0275\u0275listener"]("ngModelChange",(function(n){return d["\u0275\u0275restoreView"](e),t.row.is_active=n}))("change",(function(){d["\u0275\u0275restoreView"](e);const n=t.row;return d["\u0275\u0275nextContext"]().changeFlag(n)})),d["\u0275\u0275elementEnd"](),d["\u0275\u0275element"](2,"span",33),d["\u0275\u0275elementEnd"]()}if(2&e){const e=t.row;d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngModel",e.is_active)}}function G(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"ul",34),d["\u0275\u0275elementStart"](1,"li"),d["\u0275\u0275elementStart"](2,"a",35),d["\u0275\u0275listener"]("click",(function(){d["\u0275\u0275restoreView"](e);const n=t.row;return d["\u0275\u0275nextContext"]().navigate(null==n?null:n.id)})),d["\u0275\u0275element"](3,"i",36),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](4,"li"),d["\u0275\u0275elementStart"](5,"a",37),d["\u0275\u0275listener"]("click",(function(){d["\u0275\u0275restoreView"](e);const n=t.row;return d["\u0275\u0275nextContext"]().deleteUser(n)})),d["\u0275\u0275element"](6,"i",38),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"]()}}let K=(()=>{class e{constructor(e,t,n){this._common=e,this.toastr=t,this.route=n,this.positionOptions=["below","above","left","right"],this.position=new s.h(this.positionOptions[1]),this.searchData={event:new U.a,value:""},this.page=new q.a,this.rows=new Array,this.ColumnMode=j.a,this.definedColumns=[{data:"id"},{data:"first_name"},{data:"last_name"},{data:"email"}],this.formData={status:status,draw:0,columns:this._common.getColumns(this.definedColumns),order:[{column:0,dir:"desc"}],start:0,length:10,search:{value:"",regex:!1}},this.baseUrl=i.a.homeURL,this.page.pageNumber=0,this.page.size=20}ngOnInit(){this.setPage({offset:0}),this.searchData.event.subscribe(()=>{this.setPage({offset:0})})}navigate(e){this.route.navigate(["manage-admins/add"],{queryParams:{id:e}})}searchHere(){clearTimeout(this.timeOut),this.timeOut=setTimeout(()=>{this.searchData.event.next()},1e3)}deleteUser(e){const t=()=>{this._common.delete(`${m.a.deleteSubAdmin}${e.id}/`).subscribe(e=>{200==e.code?(this.toastr.success(e.message,"Success",{timeOut:1050}),this.setPage({offset:this.page.pageNumber})):this.toastr.error(e.message,"Error")})};this._common.confirm("Confirm","Do you want to  Delete user ?").subscribe(e=>{e&&t()})}changeFlag(e){this._common.put(`${m.a.changeSubAdminStatus}${e.id}/`,{is_active:e.is_active}).subscribe(e=>{this.toastr.success(e.message,"Success",{timeOut:1050}),this.setPage({offset:0})})}documentModal(e){const t=()=>{this._common.put(`${m.a.acceptDoc}${e}/`,{}).subscribe(e=>{this.toastr.success(e.message,"Success",{timeOut:1050})})},n=e=>{this._common.post(""+m.a.rejectFvDocByUserId,e).subscribe(e=>{this.toastr.success(e.message,"Success",{timeOut:1050})})};this._common.dconfirm("Documents",e).subscribe(r=>{r?t():0==r&&this._common.reasonConfirm("Reject Reason","").subscribe(t=>{console.log(t),t&&n({user:e,rejection_type:"2",description:t})})})}fvModal(e){const t=()=>{this._common.put(`${m.a.acceptFv}${e}/`,{}).subscribe(e=>{this.toastr.success(e.message,"Success",{timeOut:1050})})},n=e=>{this._common.post(""+m.a.rejectFvDocByUserId,e).subscribe(e=>{this.toastr.success(e.message,"Success",{timeOut:1050})})};this._common.fvConfirm("Facial Verification",e).subscribe(r=>{r?t():0==r&&this._common.reasonConfirm("Reject Reason","").subscribe(t=>{console.log(t),t&&n({user:e,rejection_type:"1",description:t})})})}reasonModal(){this._common.reasonConfirm("Reject Reason","").subscribe(e=>{})}userModal(e){this._common.userConfirm("User Picture",e).subscribe(e=>{})}setPage(e){l.Block.circle("#users-list-page"),null!=this.status&&(this.formData.status=this.status),null==this.status&&(this.formData.status=this.status),null!=this.flag&&(this.formData.flag=!0),this.formData.search.value=this.searchData.value,this.formData.start=e.offset*this.formData.length,this._common.post(m.a.subAdminList,this.formData).subscribe(t=>{this.page={totalElements:t.recordsTotal,pageNumber:e.offset,totalPages:Math.ceil(t.recordsTotal/this.formData.length),size:this.formData.length},this.rows=t.data,setTimeout(e=>{l.Block.remove("#users-list-page")},700)})}emailModal(e){this._common.emailConfirm("Send Email","").subscribe(t=>{t&&(t.email=e.email,this._common.post(m.a.sendEmail,t).subscribe(e=>{200==e.code?this.toastr.success(e.message,"Success",{timeOut:2e3}):this.toastr.error(e.message,"Error",{timeOut:2e3})}))})}}return e.\u0275fac=function(t){return new(t||e)(d["\u0275\u0275directiveInject"](c.a),d["\u0275\u0275directiveInject"](u.b),d["\u0275\u0275directiveInject"](a.b))},e.\u0275cmp=d["\u0275\u0275defineComponent"]({type:e,selectors:[["app-list"]],inputs:{status:"status",flag:"flag",searchData:"searchData"},decls:40,vars:17,consts:[[1,"admin-content"],[1,"bg-dark"],[1,"container-fluid","m-b-30"],[1,"row"],[1,"col-12","text-white","p-t-40","p-b-90"],[1,"ex-main"],[1,""],[1,"btn","btn-white-translucent"],[1,"mdi","mdi-account"],["routerLink","add",1,"btn","btn-white-translucent","mr-3"],[1,"container-fluid","pull-up"],[1,"col-md-12"],[1,"card","m-b-30"],[1,"card-header","seachbar"],[1,"form-group","col-md-4","pl-0","pr-0","mb-0"],["type","text","name","searchField","id","searchField","placeholder","Search",1,"form-control",3,"ngModel","keyup","ngModelChange"],[1,"card-body"],["id","users-list-page",1,"table-responsive"],["rowHeight","auto",1,"bootstrap",3,"scrollbarH","rows","columnMode","limit","headerHeight","footerHeight","externalPaging","count","offset","page"],["name","#","prop","#",3,"width"],["data-index","#i","ngx-datatable-cell-template",""],["name","Image","prop","image",3,"width"],["ngx-datatable-cell-template",""],["name","Id","prop","id",3,"width"],["name","Name","prop","name",3,"width"],["name","Email","prop","email",3,"width"],["name","PHONE NUMBER","prop","phone"],["name","Status","prop","Status",3,"width"],["name","ACTION","prop","status"],[1,"avatar","avatar-sm",3,"click"],["alt","",1,"avatar-img","avatar-sm","rounded-circle",3,"src"],[1,"switch"],["type","checkbox",3,"ngModel","ngModelChange","change"],[1,"slider","round"],[1,"action"],["href","javascript:void(0)",1,"btn","btn-primary",3,"click"],["title","Edit",1,"mdi","mdi-pen"],["href","javascript:void(0)",1,"btn","btn-danger",3,"click"],["title","Delete",1,"mdi","mdi-delete"]],template:function(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"section",0),d["\u0275\u0275elementStart"](1,"div",1),d["\u0275\u0275elementStart"](2,"div",2),d["\u0275\u0275elementStart"](3,"div",3),d["\u0275\u0275elementStart"](4,"div",4),d["\u0275\u0275elementStart"](5,"div",5),d["\u0275\u0275elementStart"](6,"h4",6),d["\u0275\u0275elementStart"](7,"span",7),d["\u0275\u0275element"](8,"i",8),d["\u0275\u0275elementEnd"](),d["\u0275\u0275text"](9," Manage Sub Admins "),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](10,"div"),d["\u0275\u0275elementStart"](11,"a",9),d["\u0275\u0275text"](12,"Add Sub Admin"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](13,"div",10),d["\u0275\u0275elementStart"](14,"div",3),d["\u0275\u0275elementStart"](15,"div",11),d["\u0275\u0275elementStart"](16,"div",12),d["\u0275\u0275elementStart"](17,"div",13),d["\u0275\u0275element"](18,"h5"),d["\u0275\u0275elementStart"](19,"div",14),d["\u0275\u0275elementStart"](20,"input",15),d["\u0275\u0275listener"]("keyup",(function(){return t.searchHere()}))("ngModelChange",(function(e){return t.searchData.value=e})),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](21,"div",16),d["\u0275\u0275elementStart"](22,"div",17),d["\u0275\u0275elementStart"](23,"ngx-datatable",18),d["\u0275\u0275listener"]("page",(function(e){return t.setPage(e)})),d["\u0275\u0275elementStart"](24,"ngx-datatable-column",19),d["\u0275\u0275template"](25,R,1,1,"ng-template",20),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](26,"ngx-datatable-column",21),d["\u0275\u0275template"](27,V,2,1,"ng-template",22),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](28,"ngx-datatable-column",23),d["\u0275\u0275template"](29,H,1,1,"ng-template",22),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](30,"ngx-datatable-column",24),d["\u0275\u0275template"](31,z,1,2,"ng-template",22),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](32,"ngx-datatable-column",25),d["\u0275\u0275template"](33,$,2,1,"ng-template",22),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](34,"ngx-datatable-column",26),d["\u0275\u0275template"](35,B,1,1,"ng-template",22),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](36,"ngx-datatable-column",27),d["\u0275\u0275template"](37,T,3,1,"ng-template",22),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](38,"ngx-datatable-column",28),d["\u0275\u0275template"](39,G,7,0,"ng-template",22),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"]()),2&e&&(d["\u0275\u0275advance"](20),d["\u0275\u0275property"]("ngModel",t.searchData.value),d["\u0275\u0275advance"](3),d["\u0275\u0275property"]("scrollbarH",!0)("rows",t.rows)("columnMode",t.ColumnMode.force)("limit",10)("headerHeight",50)("footerHeight",50)("externalPaging",!0)("count",t.page.totalElements)("offset",t.page.pageNumber)("limit",t.page.size),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("width",80),d["\u0275\u0275advance"](2),d["\u0275\u0275property"]("width",80),d["\u0275\u0275advance"](2),d["\u0275\u0275property"]("width",100),d["\u0275\u0275advance"](2),d["\u0275\u0275property"]("width",200),d["\u0275\u0275advance"](2),d["\u0275\u0275property"]("width",220),d["\u0275\u0275advance"](4),d["\u0275\u0275property"]("width",80))},directives:[a.d,s.d,s.s,s.v,j.d,j.c,j.b,s.a],styles:[""]}),e})();const X=[{path:"",component:(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d["\u0275\u0275defineComponent"]({type:e,selectors:[["app-manage-admins"]],decls:1,vars:0,template:function(e,t){1&e&&d["\u0275\u0275element"](0,"router-outlet")},directives:[a.f],styles:[""]}),e})(),children:[{path:"",component:K},{path:"add",component:L,canActivate:[o.a],data:{permission:"manage_sub_admin",type:"add"}},{path:"edit",component:L,canActivate:[o.a],data:{permission:"manage_sub_admin",type:"add"}}]}];let J=(()=>{class e{}return e.\u0275mod=d["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=d["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[a.e.forChild(X)],a.e]}),e})();var Z=n("pKmL");let W=(()=>{class e{}return e.\u0275mod=d["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=d["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[r.c,J,Z.CoreModule,g.b]]}),e})()}}]);