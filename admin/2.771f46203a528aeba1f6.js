(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"+obK":function(t,e,i){"use strict";i.d(e,"a",(function(){return d}));var n=i("0IaG"),o=i("Z+m1"),a=i("fXoL"),s=i("3Pt+"),r=i("YWaA"),c=i("nC9J"),l=i("9OaD");const h=function(){return{length:4}};let d=(()=>{class t{constructor(t,e,i,n,o,a){this.fb=t,this.service=e,this._noti=i,this._diloag=n,this.dialogRef=o,this.data=a,this.message="",this.status=!1,this.isLoading=!1}ngOnInit(){this.data?this.service.postWithHeaders(o.a.sendPhoneOtp,{},{Authorization:"Bearer "+this.data.token}).subscribe():this.service.post(o.a.sendPhoneOtp).subscribe(),this.otpForm=this.fb.group({otp:[""]})}onOtpChange(t){this.otpvalue=t}verifyOtp(){if(this.otpvalue){let t={otp:this.otpvalue};this.data?this.service.postWithHeaders(o.a.verifyPhoneOtp,t,{Authorization:"Bearer "+this.data.token}).subscribe(t=>{this._diloag.openDialogs[0].close(!0)}):this.service.post(o.a.verifyPhoneOtp,t).subscribe(t=>{this._diloag.openDialogs[0].close(!0)})}else this._noti.show("Failed","Invalid Otp","Verification")}closeIt(){this._diloag.openDialogs[0].close(!1)}}return t.\u0275fac=function(e){return new(e||t)(a["\u0275\u0275directiveInject"](s.g),a["\u0275\u0275directiveInject"](r.a),a["\u0275\u0275directiveInject"](c.a),a["\u0275\u0275directiveInject"](n.b),a["\u0275\u0275directiveInject"](n.d),a["\u0275\u0275directiveInject"](n.a))},t.\u0275cmp=a["\u0275\u0275defineComponent"]({type:t,selectors:[["app-verify-phone"]],decls:11,vars:4,consts:[["id","form",1,"mx-auto","center_auth","p-5","pb-2",3,"formGroup"],[1,"mdi","mdi-close",3,"click"],[1,"text-center"],[1,"form-group","text-center"],[3,"config","onInputChange"],[1,"form__buttons"],["type","button",1,"btn","btn-primary","btn-lg","btn-block",3,"click"]],template:function(t,e){1&t&&(a["\u0275\u0275elementStart"](0,"form",0),a["\u0275\u0275elementStart"](1,"span",1),a["\u0275\u0275listener"]("click",(function(){return e.closeIt()})),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](2,"h1",2),a["\u0275\u0275text"](3,"Verify Phone Number"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](4,"div",3),a["\u0275\u0275elementStart"](5,"label"),a["\u0275\u0275text"](6,"Enter 4-digit code sent on your registered mobile number."),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](7,"ng-otp-input",4),a["\u0275\u0275listener"]("onInputChange",(function(t){return e.onOtpChange(t)})),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](8,"div",5),a["\u0275\u0275elementStart"](9,"button",6),a["\u0275\u0275listener"]("click",(function(){return e.verifyOtp()})),a["\u0275\u0275text"](10),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()),2&t&&(a["\u0275\u0275property"]("formGroup",e.otpForm),a["\u0275\u0275advance"](7),a["\u0275\u0275property"]("config",a["\u0275\u0275pureFunction0"](3,h)),a["\u0275\u0275advance"](3),a["\u0275\u0275textInterpolate"](e.isLoading?"Processing...":"Submit"))},directives:[s.B,s.t,s.l,l.b],styles:["form[_ngcontent-%COMP%]{position:relative}form[_ngcontent-%COMP%]   .mdi-close[_ngcontent-%COMP%]{font-size:29px;position:absolute;right:0;top:0;cursor:pointer}"]}),t})()},"0IaG":function(t,e,i){"use strict";i.d(e,"a",(function(){return T})),i.d(e,"b",(function(){return F})),i.d(e,"c",(function(){return S})),i.d(e,"d",(function(){return D}));var n=i("rDax"),o=i("+rOU"),a=i("fXoL"),s=i("FKr1"),r=i("cH1L"),c=i("ofXK"),l=i("XNiG"),h=i("NXyV"),d=i("LRne"),u=i("pLZG"),p=i("IzEk"),f=i("JX91"),g=i("R0Ic"),m=i("FtGj"),_=i("u47x");function b(t,e){}class v{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.maxWidth="80vw",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.autoFocus=!0,this.restoreFocus=!0,this.closeOnNavigation=!0}}const y={dialogContainer:Object(g.n)("dialogContainer",[Object(g.k)("void, exit",Object(g.l)({opacity:0,transform:"scale(0.7)"})),Object(g.k)("enter",Object(g.l)({transform:"none"})),Object(g.m)("* => enter",Object(g.e)("150ms cubic-bezier(0, 0, 0.2, 1)",Object(g.l)({transform:"none",opacity:1}))),Object(g.m)("* => void, * => exit",Object(g.e)("75ms cubic-bezier(0.4, 0.0, 0.2, 1)",Object(g.l)({opacity:0})))])};let C=(()=>{class t extends o.a{constructor(t,e,i,n,o,s){super(),this._elementRef=t,this._focusTrapFactory=e,this._changeDetectorRef=i,this._config=o,this._focusMonitor=s,this._animationStateChanged=new a.EventEmitter,this._elementFocusedBeforeDialogWasOpened=null,this._closeInteractionType=null,this.attachDomPortal=t=>(this._portalOutlet.hasAttached(),this._portalOutlet.attachDomPortal(t)),this._ariaLabelledBy=o.ariaLabelledBy||null,this._document=n}_initializeWithAttachedContent(){this._setupFocusTrap(),this._capturePreviouslyFocusedElement(),this._focusDialogContainer()}attachComponentPortal(t){return this._portalOutlet.hasAttached(),this._portalOutlet.attachComponentPortal(t)}attachTemplatePortal(t){return this._portalOutlet.hasAttached(),this._portalOutlet.attachTemplatePortal(t)}_recaptureFocus(){this._containsFocus()||(!this._config.autoFocus||!this._focusTrap.focusInitialElement())&&this._elementRef.nativeElement.focus()}_trapFocus(){this._config.autoFocus?this._focusTrap.focusInitialElementWhenReady():this._containsFocus()||this._elementRef.nativeElement.focus()}_restoreFocus(){const t=this._elementFocusedBeforeDialogWasOpened;if(this._config.restoreFocus&&t&&"function"==typeof t.focus){const e=this._document.activeElement,i=this._elementRef.nativeElement;e&&e!==this._document.body&&e!==i&&!i.contains(e)||(this._focusMonitor?(this._focusMonitor.focusVia(t,this._closeInteractionType),this._closeInteractionType=null):t.focus())}this._focusTrap&&this._focusTrap.destroy()}_setupFocusTrap(){this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement)}_capturePreviouslyFocusedElement(){this._document&&(this._elementFocusedBeforeDialogWasOpened=this._document.activeElement)}_focusDialogContainer(){this._elementRef.nativeElement.focus&&this._elementRef.nativeElement.focus()}_containsFocus(){const t=this._elementRef.nativeElement,e=this._document.activeElement;return t===e||t.contains(e)}}return t.\u0275fac=function(e){return new(e||t)(a["\u0275\u0275directiveInject"](a.ElementRef),a["\u0275\u0275directiveInject"](_.i),a["\u0275\u0275directiveInject"](a.ChangeDetectorRef),a["\u0275\u0275directiveInject"](c.e,8),a["\u0275\u0275directiveInject"](v),a["\u0275\u0275directiveInject"](_.h))},t.\u0275dir=a["\u0275\u0275defineDirective"]({type:t,viewQuery:function(t,e){var i;1&t&&a["\u0275\u0275staticViewQuery"](o.b,!0),2&t&&a["\u0275\u0275queryRefresh"](i=a["\u0275\u0275loadQuery"]())&&(e._portalOutlet=i.first)},features:[a["\u0275\u0275InheritDefinitionFeature"]]}),t})(),O=(()=>{class t extends C{constructor(){super(...arguments),this._state="enter"}_onAnimationDone({toState:t,totalTime:e}){"enter"===t?(this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e})):"exit"===t&&(this._restoreFocus(),this._animationStateChanged.next({state:"closed",totalTime:e}))}_onAnimationStart({toState:t,totalTime:e}){"enter"===t?this._animationStateChanged.next({state:"opening",totalTime:e}):"exit"!==t&&"void"!==t||this._animationStateChanged.next({state:"closing",totalTime:e})}_startExitAnimation(){this._state="exit",this._changeDetectorRef.markForCheck()}}return t.\u0275fac=function(e){return j(e||t)},t.\u0275cmp=a["\u0275\u0275defineComponent"]({type:t,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1","aria-modal","true",1,"mat-dialog-container"],hostVars:6,hostBindings:function(t,e){1&t&&a["\u0275\u0275syntheticHostListener"]("@dialogContainer.start",(function(t){return e._onAnimationStart(t)}))("@dialogContainer.done",(function(t){return e._onAnimationDone(t)})),2&t&&(a["\u0275\u0275hostProperty"]("id",e._id),a["\u0275\u0275attribute"]("role",e._config.role)("aria-labelledby",e._config.ariaLabel?null:e._ariaLabelledBy)("aria-label",e._config.ariaLabel)("aria-describedby",e._config.ariaDescribedBy||null),a["\u0275\u0275syntheticHostProperty"]("@dialogContainer",e._state))},features:[a["\u0275\u0275InheritDefinitionFeature"]],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(t,e){1&t&&a["\u0275\u0275template"](0,b,0,0,"ng-template",0)},directives:[o.b],styles:[".mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.cdk-high-contrast-active .mat-dialog-container{outline:solid 1px}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:8px 0;display:flex;flex-wrap:wrap;min-height:52px;align-items:center;margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions .mat-button-base+.mat-button-base,.mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],encapsulation:2,data:{animation:[y.dialogContainer]}}),t})();const j=a["\u0275\u0275getInheritedFactory"](O);let I=0;class D{constructor(t,e,i="mat-dialog-"+I++){this._overlayRef=t,this._containerInstance=e,this.id=i,this.disableClose=this._containerInstance._config.disableClose,this._afterOpened=new l.a,this._afterClosed=new l.a,this._beforeClosed=new l.a,this._state=0,e._id=i,e._animationStateChanged.pipe(Object(u.a)(t=>"opened"===t.state),Object(p.a)(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),e._animationStateChanged.pipe(Object(u.a)(t=>"closed"===t.state),Object(p.a)(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),t.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._afterClosed.next(this._result),this._afterClosed.complete(),this.componentInstance=null,this._overlayRef.dispose()}),t.keydownEvents().pipe(Object(u.a)(t=>t.keyCode===m.g&&!this.disableClose&&!Object(m.s)(t))).subscribe(t=>{t.preventDefault(),x(this,"keyboard")}),t.backdropClick().subscribe(()=>{this.disableClose?this._containerInstance._recaptureFocus():x(this,"mouse")})}close(t){this._result=t,this._containerInstance._animationStateChanged.pipe(Object(u.a)(t=>"closing"===t.state),Object(p.a)(1)).subscribe(e=>{this._beforeClosed.next(t),this._beforeClosed.complete(),this._overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),e.totalTime+100)}),this._state=1,this._containerInstance._startExitAnimation()}afterOpened(){return this._afterOpened}afterClosed(){return this._afterClosed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._overlayRef.backdropClick()}keydownEvents(){return this._overlayRef.keydownEvents()}updatePosition(t){let e=this._getPositionStrategy();return t&&(t.left||t.right)?t.left?e.left(t.left):e.right(t.right):e.centerHorizontally(),t&&(t.top||t.bottom)?t.top?e.top(t.top):e.bottom(t.bottom):e.centerVertically(),this._overlayRef.updatePosition(),this}updateSize(t="",e=""){return this._getPositionStrategy().width(t).height(e),this._overlayRef.updatePosition(),this}addPanelClass(t){return this._overlayRef.addPanelClass(t),this}removePanelClass(t){return this._overlayRef.removePanelClass(t),this}getState(){return this._state}_finishDialogClose(){this._state=2,this._overlayRef.dispose()}_getPositionStrategy(){return this._overlayRef.getConfig().positionStrategy}}function x(t,e,i){return void 0!==t._containerInstance&&(t._containerInstance._closeInteractionType=e),t.close(i)}const T=new a.InjectionToken("MatDialogData"),w=new a.InjectionToken("mat-dialog-default-options"),k=new a.InjectionToken("mat-dialog-scroll-strategy"),E={provide:k,deps:[n.c],useFactory:function(t){return()=>t.scrollStrategies.block()}};let A=(()=>{class t{constructor(t,e,i,n,o,a,s,r,c){this._overlay=t,this._injector=e,this._defaultOptions=i,this._parentDialog=n,this._overlayContainer=o,this._dialogRefConstructor=s,this._dialogContainerType=r,this._dialogDataToken=c,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new l.a,this._afterOpenedAtThisLevel=new l.a,this._ariaHiddenElements=new Map,this.afterAllClosed=Object(h.a)(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Object(f.a)(void 0))),this._scrollStrategy=a}get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){const t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}open(t,e){(e=function(t,e){return Object.assign(Object.assign({},e),t)}(e,this._defaultOptions||new v)).id&&this.getDialogById(e.id);const i=this._createOverlay(e),n=this._attachDialogContainer(i,e),o=this._attachDialogContent(t,n,i,e);return this.openDialogs.length||this._hideNonDialogContentFromAssistiveTechnology(),this.openDialogs.push(o),o.afterClosed().subscribe(()=>this._removeOpenDialog(o)),this.afterOpened.next(o),n._initializeWithAttachedContent(),o}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(t){return this.openDialogs.find(e=>e.id===t)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_createOverlay(t){const e=this._getOverlayConfig(t);return this._overlay.create(e)}_getOverlayConfig(t){const e=new n.d({positionStrategy:this._overlay.position().global(),scrollStrategy:t.scrollStrategy||this._scrollStrategy(),panelClass:t.panelClass,hasBackdrop:t.hasBackdrop,direction:t.direction,minWidth:t.minWidth,minHeight:t.minHeight,maxWidth:t.maxWidth,maxHeight:t.maxHeight,disposeOnNavigation:t.closeOnNavigation});return t.backdropClass&&(e.backdropClass=t.backdropClass),e}_attachDialogContainer(t,e){const i=a.Injector.create({parent:e&&e.viewContainerRef&&e.viewContainerRef.injector||this._injector,providers:[{provide:v,useValue:e}]}),n=new o.c(this._dialogContainerType,e.viewContainerRef,i,e.componentFactoryResolver);return t.attach(n).instance}_attachDialogContent(t,e,i,n){const s=new this._dialogRefConstructor(i,e,n.id);if(t instanceof a.TemplateRef)e.attachTemplatePortal(new o.f(t,null,{$implicit:n.data,dialogRef:s}));else{const i=this._createInjector(n,s,e),a=e.attachComponentPortal(new o.c(t,n.viewContainerRef,i));s.componentInstance=a.instance}return s.updateSize(n.width,n.height).updatePosition(n.position),s}_createInjector(t,e,i){const n=t&&t.viewContainerRef&&t.viewContainerRef.injector,o=[{provide:this._dialogContainerType,useValue:i},{provide:this._dialogDataToken,useValue:t.data},{provide:this._dialogRefConstructor,useValue:e}];return!t.direction||n&&n.get(r.b,null)||o.push({provide:r.b,useValue:{value:t.direction,change:Object(d.a)()}}),a.Injector.create({parent:n||this._injector,providers:o})}_removeOpenDialog(t){const e=this.openDialogs.indexOf(t);e>-1&&(this.openDialogs.splice(e,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((t,e)=>{t?e.setAttribute("aria-hidden",t):e.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(){const t=this._overlayContainer.getContainerElement();if(t.parentElement){const e=t.parentElement.children;for(let i=e.length-1;i>-1;i--){let n=e[i];n===t||"SCRIPT"===n.nodeName||"STYLE"===n.nodeName||n.hasAttribute("aria-live")||(this._ariaHiddenElements.set(n,n.getAttribute("aria-hidden")),n.setAttribute("aria-hidden","true"))}}}_closeDialogs(t){let e=t.length;for(;e--;)t[e].close()}}return t.\u0275fac=function(e){return new(e||t)(a["\u0275\u0275directiveInject"](n.c),a["\u0275\u0275directiveInject"](a.Injector),a["\u0275\u0275directiveInject"](void 0),a["\u0275\u0275directiveInject"](void 0),a["\u0275\u0275directiveInject"](n.e),a["\u0275\u0275directiveInject"](void 0),a["\u0275\u0275directiveInject"](a.Type),a["\u0275\u0275directiveInject"](a.Type),a["\u0275\u0275directiveInject"](a.InjectionToken))},t.\u0275dir=a["\u0275\u0275defineDirective"]({type:t}),t})(),F=(()=>{class t extends A{constructor(t,e,i,n,o,a,s){super(t,e,n,a,s,o,D,O,T)}}return t.\u0275fac=function(e){return new(e||t)(a["\u0275\u0275inject"](n.c),a["\u0275\u0275inject"](a.Injector),a["\u0275\u0275inject"](c.j,8),a["\u0275\u0275inject"](w,8),a["\u0275\u0275inject"](k),a["\u0275\u0275inject"](t,12),a["\u0275\u0275inject"](n.e))},t.\u0275prov=a["\u0275\u0275defineInjectable"]({token:t,factory:t.\u0275fac}),t})(),S=(()=>{class t{}return t.\u0275mod=a["\u0275\u0275defineNgModule"]({type:t}),t.\u0275inj=a["\u0275\u0275defineInjector"]({factory:function(e){return new(e||t)},providers:[F,E],imports:[[n.f,o.e,s.j],s.j]}),t})()},"4FC3":function(t,e,i){"use strict";i.d(e,"a",(function(){return c}));var n=i("ofXK"),o=i("pKmL"),a=i("9OaD"),s=i("K3ix"),r=i("fXoL");let c=(()=>{class t{}return t.\u0275mod=r["\u0275\u0275defineNgModule"]({type:t}),t.\u0275inj=r["\u0275\u0275defineInjector"]({factory:function(e){return new(e||t)},imports:[[n.c,o.CoreModule,a.a,s.c]]}),t})()},"4KSJ":function(t,e,i){"use strict";function n(t){return/^^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gi.test(t.value)?null:{validEmail:!0}}i.d(e,"a",(function(){return n}))},xhSK:function(t,e,i){"use strict";i.d(e,"a",(function(){return u}));var n=i("0IaG"),o=i("Z+m1"),a=i("fXoL"),s=i("3Pt+"),r=i("YWaA"),c=i("nC9J"),l=i("tyNb"),h=i("9OaD");const d=function(){return{length:6}};let u=(()=>{class t{constructor(t,e,i,n,o,a,s){this.fb=t,this.service=e,this._noti=i,this.router=n,this._diloag=o,this.dialogRef=a,this.data=s,this.message="",this.status=!1,this.isLoading=!1}ngOnInit(){this.OtpForm=this.fb.group({otp:[""]})}onOtpChange(t){this.otpvalue=t,console.log(this.otpvalue)}VerifyOtp(){if(this.otpvalue){let t={otp:this.otpvalue};this.data?this.service.postWithHeaders(o.a.verifyOtp,t,{Authorization:"Bearer "+this.data.token}).subscribe(t=>{200==t.code?(this.status=!0,this._diloag.openDialogs[0].close(!0)):(this._noti.show("Failed",t.message,"Verification"),this._diloag.openDialogs[0].close(!1))}):this.service.post(o.a.verifyOtp,t).subscribe(t=>{200==t.code?(this.status=!0,this._diloag.openDialogs[0].close(!0)):(this._noti.show("Failed",t.message,"Verification"),this._diloag.openDialogs[0].close(!1))})}else this._noti.show("Failed","Invalid Otp","Verification")}closeIt(){this._diloag.openDialogs[0].close(!1)}}return t.\u0275fac=function(e){return new(e||t)(a["\u0275\u0275directiveInject"](s.g),a["\u0275\u0275directiveInject"](r.a),a["\u0275\u0275directiveInject"](c.a),a["\u0275\u0275directiveInject"](l.b),a["\u0275\u0275directiveInject"](n.b),a["\u0275\u0275directiveInject"](n.d),a["\u0275\u0275directiveInject"](n.a))},t.\u0275cmp=a["\u0275\u0275defineComponent"]({type:t,selectors:[["app-two-factor"]],decls:11,vars:4,consts:[["id","form",1,"mx-auto","center_auth","p-5","pb-2",3,"formGroup"],[1,"mdi","mdi-close",3,"click"],[1,"text-center"],[1,"form-group","text-center"],[3,"config","onInputChange"],[1,"form__buttons"],["type","button",1,"btn","btn-primary","btn-lg","btn-block",3,"click"]],template:function(t,e){1&t&&(a["\u0275\u0275elementStart"](0,"form",0),a["\u0275\u0275elementStart"](1,"span",1),a["\u0275\u0275listener"]("click",(function(){return e.closeIt()})),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](2,"h1",2),a["\u0275\u0275text"](3,"TWO-FACTOR AUTHENTICATION"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](4,"div",3),a["\u0275\u0275elementStart"](5,"label"),a["\u0275\u0275text"](6,"Enter 6-digit code from your authenticator application"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](7,"ng-otp-input",4),a["\u0275\u0275listener"]("onInputChange",(function(t){return e.onOtpChange(t)})),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](8,"div",5),a["\u0275\u0275elementStart"](9,"button",6),a["\u0275\u0275listener"]("click",(function(){return e.VerifyOtp()})),a["\u0275\u0275text"](10),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()),2&t&&(a["\u0275\u0275property"]("formGroup",e.OtpForm),a["\u0275\u0275advance"](7),a["\u0275\u0275property"]("config",a["\u0275\u0275pureFunction0"](3,d)),a["\u0275\u0275advance"](3),a["\u0275\u0275textInterpolate"](e.isLoading?"Processing...":"Submit"))},directives:[s.B,s.t,s.l,h.b],styles:["form[_ngcontent-%COMP%]{position:relative}form[_ngcontent-%COMP%]   .mdi-close[_ngcontent-%COMP%]{font-size:29px;position:absolute;right:0;top:0;cursor:pointer}"]}),t})()}}]);