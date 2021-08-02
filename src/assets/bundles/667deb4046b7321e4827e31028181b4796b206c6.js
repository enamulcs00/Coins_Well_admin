/** Trumbowyg v2.10.0 - A lightweight WYSIWYG editor - alex-d.github.io/Trumbowyg - License MIT - Author : Alexandre Demode (Alex-D) / alex-d.fr */
jQuery.trumbowyg={langs:{en:{viewHTML:"View HTML",undo:"Undo",redo:"Redo",formatting:"Formatting",p:"Paragraph",blockquote:"Quote",code:"Code",header:"Header",bold:"Bold",italic:"Italic",strikethrough:"Stroke",underline:"Underline",strong:"Strong",em:"Emphasis",del:"Deleted",superscript:"Superscript",subscript:"Subscript",unorderedList:"Unordered list",orderedList:"Ordered list",insertImage:"Insert Image",link:"Link",createLink:"Insert link",unlink:"Remove link",justifyLeft:"Align Left",justifyCenter:"Align Center",justifyRight:"Align Right",justifyFull:"Align Justify",horizontalRule:"Insert horizontal rule",removeformat:"Remove format",fullscreen:"Fullscreen",close:"Close",submit:"Confirm",reset:"Cancel",required:"Required",description:"Description",title:"Title",text:"Text",target:"Target",width:"Width"}},plugins:{},svgPath:null,hideButtonTexts:null},Object.defineProperty(jQuery.trumbowyg,"defaultOptions",{value:{lang:"en",fixedBtnPane:!1,fixedFullWidth:!1,autogrow:!1,autogrowOnEnter:!1,imageWidthModalEdit:!1,prefix:"trumbowyg-",semantic:!0,resetCss:!1,removeformatPasted:!1,tagsToRemove:[],btns:[["viewHTML"],["undo","redo"],["formatting"],["strong","em","del"],["superscript","subscript"],["link"],["insertImage"],["justifyLeft","justifyCenter","justifyRight","justifyFull"],["unorderedList","orderedList"],["horizontalRule"],["removeformat"],["fullscreen"]],btnsDef:{},inlineElementsSelector:"a,abbr,acronym,b,caption,cite,code,col,dfn,dir,dt,dd,em,font,hr,i,kbd,li,q,span,strikeout,strong,sub,sup,u",pasteHandlers:[],plugins:{},urlProtocol:!1,minimalLinks:!1},writable:!1,enumerable:!0,configurable:!1}),function(e,t,n,a){"use strict";var o="tbwconfirm",r="tbwcancel";a.fn.trumbowyg=function(e,t){var n="trumbowyg";if(e===Object(e)||!e)return this.each(function(){a(this).data(n)||a(this).data(n,new i(this,e))});if(1===this.length)try{var o=a(this).data(n);switch(e){case"execCmd":return o.execCmd(t.cmd,t.param,t.forceCss);case"openModal":return o.openModal(t.title,t.content);case"closeModal":return o.closeModal();case"openModalInsert":return o.openModalInsert(t.title,t.fields,t.callback);case"saveRange":return o.saveRange();case"getRange":return o.range;case"getRangeText":return o.getRangeText();case"restoreRange":return o.restoreRange();case"enable":return o.setDisabled(!1);case"disable":return o.setDisabled(!0);case"toggle":return o.toggle();case"destroy":return o.destroy();case"empty":return o.empty();case"html":return o.html(t)}}catch(r){}return!1};var i=function(o,r){var i=this,s="trumbowyg-icons",l=a.trumbowyg;i.doc=o.ownerDocument||n,i.$ta=a(o),i.$c=a(o),r=r||{},null!=r.lang||null!=l.langs[r.lang]?i.lang=a.extend(!0,{},l.langs.en,l.langs[r.lang]):i.lang=l.langs.en,i.hideButtonTexts=null!=l.hideButtonTexts?l.hideButtonTexts:r.hideButtonTexts;var d=null!=l.svgPath?l.svgPath:r.svgPath;if(i.hasSvg=d!==!1,i.svgPath=i.doc.querySelector("base")?t.location.href.split("#")[0]:"",0===a("#"+s,i.doc).length&&d!==!1){if(null==d){for(var c=n.getElementsByTagName("script"),u=0;u<c.length;u+=1){var g=c[u].src,f=g.match("trumbowyg(.min)?.js");null!=f&&(d=g.substring(0,g.indexOf(f[0]))+"ui/icons.svg")}null==d&&console.warn("You must define svgPath: https://goo.gl/CfTY9U")}var h=i.doc.createElement("div");h.id=s,i.doc.body.insertBefore(h,i.doc.body.childNodes[0]),a.ajax({async:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",dataType:"xml",crossDomain:!0,url:d,data:null,beforeSend:null,complete:null,success:function(e){h.innerHTML=(new XMLSerializer).serializeToString(e.documentElement)}})}var p=i.lang.header,m=function(){return(t.chrome||t.Intl&&Intl.v8BreakIterator)&&"CSS"in t};i.btnsDef={viewHTML:{fn:"toggle"},undo:{isSupported:m,key:"Z"},redo:{isSupported:m,key:"Y"},p:{fn:"formatBlock"},blockquote:{fn:"formatBlock"},h1:{fn:"formatBlock",title:p+" 1"},h2:{fn:"formatBlock",title:p+" 2"},h3:{fn:"formatBlock",title:p+" 3"},h4:{fn:"formatBlock",title:p+" 4"},subscript:{tag:"sub"},superscript:{tag:"sup"},bold:{key:"B",tag:"b"},italic:{key:"I",tag:"i"},underline:{tag:"u"},strikethrough:{tag:"strike"},strong:{fn:"bold",key:"B"},em:{fn:"italic",key:"I"},del:{fn:"strikethrough"},createLink:{key:"K",tag:"a"},unlink:{},insertImage:{},justifyLeft:{tag:"left",forceCss:!0},justifyCenter:{tag:"center",forceCss:!0},justifyRight:{tag:"right",forceCss:!0},justifyFull:{tag:"justify",forceCss:!0},unorderedList:{fn:"insertUnorderedList",tag:"ul"},orderedList:{fn:"insertOrderedList",tag:"ol"},horizontalRule:{fn:"insertHorizontalRule"},removeformat:{},fullscreen:{"class":"trumbowyg-not-disable"},close:{fn:"destroy","class":"trumbowyg-not-disable"},formatting:{dropdown:["p","blockquote","h1","h2","h3","h4"],ico:"p"},link:{dropdown:["createLink","unlink"]}},i.o=a.extend(!0,{},l.defaultOptions,r),i.o.hasOwnProperty("imgDblClickHandler")||(i.o.imgDblClickHandler=i.getDefaultImgDblClickHandler()),i.urlPrefix=i.setupUrlPrefix(),i.disabled=i.o.disabled||"TEXTAREA"===o.nodeName&&o.disabled,r.btns?i.o.btns=r.btns:i.o.semantic||(i.o.btns[3]=["bold","italic","underline","strikethrough"]),a.each(i.o.btnsDef,function(e,t){i.addBtnDef(e,t)}),i.eventNamespace="trumbowyg-event",i.keys=[],i.tagToButton={},i.tagHandlers=[],i.pasteHandlers=[].concat(i.o.pasteHandlers),i.isIE=e.userAgent.indexOf("MSIE")!==-1||e.appVersion.indexOf("Trident/")!==-1,i.init()};i.prototype={DEFAULT_SEMANTIC_MAP:{b:"strong",i:"em",s:"del",strike:"del",div:"p"},init:function(){var e=this;e.height=e.$ta.height(),e.initPlugins();try{e.doc.execCommand("enableObjectResizing",!1,!1),e.doc.execCommand("defaultParagraphSeparator",!1,"p")}catch(t){}e.buildEditor(),e.buildBtnPane(),e.fixedBtnPaneEvents(),e.buildOverlay(),setTimeout(function(){e.disabled&&e.setDisabled(!0),e.$c.trigger("tbwinit")})},addBtnDef:function(e,t){this.btnsDef[e]=t},setupUrlPrefix:function(){var e=this.o.urlProtocol;if(e)return"string"!=typeof e?"https://":/:\/\/$/.test(e)?e:e+"://"},buildEditor:function(){var e=this,n=e.o.prefix,o="";e.$box=a("<div/>",{"class":n+"box "+n+"editor-visible "+n+e.o.lang+" trumbowyg"}),e.isTextarea=e.$ta.is("textarea"),e.isTextarea?(o=e.$ta.val(),e.$ed=a("<div/>"),e.$box.insertAfter(e.$ta).append(e.$ed,e.$ta)):(e.$ed=e.$ta,o=e.$ed.html(),e.$ta=a("<textarea/>",{name:e.$ta.attr("id"),height:e.height}).val(o),e.$box.insertAfter(e.$ed).append(e.$ta,e.$ed),e.syncCode()),e.$ta.addClass(n+"textarea").attr("tabindex",-1),e.$ed.addClass(n+"editor").attr({contenteditable:!0,dir:e.lang._dir||"ltr"}).html(o),e.o.tabindex&&e.$ed.attr("tabindex",e.o.tabindex),e.$c.is("[placeholder]")&&e.$ed.attr("placeholder",e.$c.attr("placeholder")),e.$c.is("[spellcheck]")&&e.$ed.attr("spellcheck",e.$c.attr("spellcheck")),e.o.resetCss&&e.$ed.addClass(n+"reset-css"),e.o.autogrow||e.$ta.add(e.$ed).css({height:e.height}),e.semanticCode(),e.o.autogrowOnEnter&&e.$ed.addClass(n+"autogrow-on-enter");var r,i=!1,s=!1,l="keyup";e.$ed.on("dblclick","img",e.o.imgDblClickHandler).on("keydown",function(t){if((t.ctrlKey||t.metaKey)&&!t.altKey){i=!0;var n=e.keys[String.fromCharCode(t.which).toUpperCase()];try{return e.execCmd(n.fn,n.param),!1}catch(a){}}}).on("compositionstart compositionupdate",function(){s=!0}).on(l+" compositionend",function(t){if("compositionend"===t.type)s=!1;else if(s)return;var n=t.which;if(!(n>=37&&n<=40)){if(!t.ctrlKey&&!t.metaKey||89!==n&&90!==n)if(i||17===n)"undefined"==typeof t.which&&e.semanticCode(!1,!1,!0);else{var a=!e.isIE||"compositionend"===t.type;e.semanticCode(!1,a&&13===n),e.$c.trigger("tbwchange")}else e.$c.trigger("tbwchange");setTimeout(function(){i=!1},50)}}).on("mouseup keydown keyup",function(t){(!t.ctrlKey&&!t.metaKey||t.altKey)&&setTimeout(function(){i=!1},50),clearTimeout(r),r=setTimeout(function(){e.updateButtonPaneStatus()},50)}).on("focus blur",function(t){if(e.$c.trigger("tbw"+t.type),"blur"===t.type&&a("."+n+"active-button",e.$btnPane).removeClass(n+"active-button "+n+"active"),e.o.autogrowOnEnter){if(e.autogrowOnEnterDontClose)return;"focus"===t.type?(e.autogrowOnEnterWasFocused=!0,e.autogrowEditorOnEnter()):e.o.autogrow||(e.$ed.css({height:e.$ed.css("min-height")}),e.$c.trigger("tbwresize"))}}).on("cut",function(){setTimeout(function(){e.semanticCode(!1,!0),e.$c.trigger("tbwchange")},0)}).on("paste",function(n){if(e.o.removeformatPasted){n.preventDefault(),t.getSelection&&t.getSelection().deleteFromDocument&&t.getSelection().deleteFromDocument();try{var o=t.clipboardData.getData("Text");try{e.doc.selection.createRange().pasteHTML(o)}catch(r){e.doc.getSelection().getRangeAt(0).insertNode(e.doc.createTextNode(o))}e.$c.trigger("tbwchange",n)}catch(i){e.execCmd("insertText",(n.originalEvent||n).clipboardData.getData("text/plain"))}}a.each(e.pasteHandlers,function(e,t){t(n)}),setTimeout(function(){e.semanticCode(!1,!0),e.$c.trigger("tbwpaste",n)},0)}),e.$ta.on("keyup",function(){e.$c.trigger("tbwchange")}).on("paste",function(){setTimeout(function(){e.$c.trigger("tbwchange")},0)}),e.$box.on("keydown",function(t){if(27===t.which&&1===a("."+n+"modal-box",e.$box).length)return e.closeModal(),!1})},autogrowEditorOnEnter:function(){var e=this;e.$ed.removeClass("autogrow-on-enter");var t=e.$ed[0].clientHeight;e.$ed.height("auto");var n=e.$ed[0].scrollHeight;e.$ed.addClass("autogrow-on-enter"),t!==n&&(e.$ed.height(t),setTimeout(function(){e.$ed.css({height:n}),e.$c.trigger("tbwresize")},0))},buildBtnPane:function(){var e=this,t=e.o.prefix,n=e.$btnPane=a("<div/>",{"class":t+"button-pane"});a.each(e.o.btns,function(o,r){a.isArray(r)||(r=[r]);var i=a("<div/>",{"class":t+"button-group "+(r.indexOf("fullscreen")>=0?t+"right":"")});a.each(r,function(t,n){try{e.isSupportedBtn(n)&&i.append(e.buildBtn(n))}catch(a){}}),i.html().trim().length>0&&n.append(i)}),e.$box.prepend(n)},buildBtn:function(e){var t=this,n=t.o.prefix,o=t.btnsDef[e],r=o.dropdown,i=null==o.hasIcon||o.hasIcon,s=t.lang[e]||e,l=a("<button/>",{type:"button","class":n+e+"-button "+(o["class"]||"")+(i?"":" "+n+"textual-button"),html:t.hasSvg&&i?'<svg><use xlink:href="'+t.svgPath+"#"+n+(o.ico||e).replace(/([A-Z]+)/g,"-$1").toLowerCase()+'"/></svg>':t.hideButtonTexts?"":o.text||o.title||t.lang[e]||e,title:(o.title||o.text||s)+(o.key?" (Ctrl + "+o.key+")":""),tabindex:-1,mousedown:function(){return r&&!a("."+e+"-"+n+"dropdown",t.$box).is(":hidden")||a("body",t.doc).trigger("mousedown"),!((t.$btnPane.hasClass(n+"disable")||t.$box.hasClass(n+"disabled"))&&!a(this).hasClass(n+"active")&&!a(this).hasClass(n+"not-disable"))&&(t.execCmd(!!r&&"dropdown"||o.fn||e,o.param||e,o.forceCss),!1)}});if(r){l.addClass(n+"open-dropdown");var d=n+"dropdown",c={"class":d+"-"+e+" "+d+" "+n+"fixed-top"};c["data-"+d]=e;var u=a("<div/>",c);a.each(r,function(e,n){t.btnsDef[n]&&t.isSupportedBtn(n)&&u.append(t.buildSubBtn(n))}),t.$box.append(u.hide())}else o.key&&(t.keys[o.key]={fn:o.fn||e,param:o.param||e});return r||(t.tagToButton[(o.tag||e).toLowerCase()]=e),l},buildSubBtn:function(e){var t=this,n=t.o.prefix,o=t.btnsDef[e],r=null==o.hasIcon||o.hasIcon;return o.key&&(t.keys[o.key]={fn:o.fn||e,param:o.param||e}),t.tagToButton[(o.tag||e).toLowerCase()]=e,a("<button/>",{type:"button","class":n+e+"-dropdown-button"+(o.ico?" "+n+o.ico+"-button":""),html:t.hasSvg&&r?'<svg><use xlink:href="'+t.svgPath+"#"+n+(o.ico||e).replace(/([A-Z]+)/g,"-$1").toLowerCase()+'"/></svg>'+(o.text||o.title||t.lang[e]||e):o.text||o.title||t.lang[e]||e,title:o.key?" (Ctrl + "+o.key+")":null,style:o.style||null,mousedown:function(){return a("body",t.doc).trigger("mousedown"),t.execCmd(o.fn||e,o.param||e,o.forceCss),!1}})},isSupportedBtn:function(e){try{return this.btnsDef[e].isSupported()}catch(t){}return!0},buildOverlay:function(){var e=this;return e.$overlay=a("<div/>",{"class":e.o.prefix+"overlay"}).appendTo(e.$box),e.$overlay},showOverlay:function(){var e=this;a(t).trigger("scroll"),e.$overlay.fadeIn(200),e.$box.addClass(e.o.prefix+"box-blur")},hideOverlay:function(){var e=this;e.$overlay.fadeOut(50),e.$box.removeClass(e.o.prefix+"box-blur")},fixedBtnPaneEvents:function(){var e=this,n=e.o.fixedFullWidth,o=e.$box;e.o.fixedBtnPane&&(e.isFixed=!1,a(t).on("scroll."+e.eventNamespace+" resize."+e.eventNamespace,function(){if(o){e.syncCode();var r=a(t).scrollTop(),i=o.offset().top+1,s=e.$btnPane,l=s.outerHeight()-2;r-i>0&&r-i-e.height<0?(e.isFixed||(e.isFixed=!0,s.css({position:"fixed",top:0,left:n?"0":"auto",zIndex:7}),a([e.$ta,e.$ed]).css({marginTop:s.height()})),s.css({width:n?"100%":o.width()-1+"px"}),a("."+e.o.prefix+"fixed-top",o).css({position:n?"fixed":"absolute",top:n?l:l+(r-i)+"px",zIndex:15})):e.isFixed&&(e.isFixed=!1,s.removeAttr("style"),a([e.$ta,e.$ed]).css({marginTop:0}),a("."+e.o.prefix+"fixed-top",o).css({position:"absolute",top:l}))}}))},setDisabled:function(e){var t=this,n=t.o.prefix;t.disabled=e,e?t.$ta.attr("disabled",!0):t.$ta.removeAttr("disabled"),t.$box.toggleClass(n+"disabled",e),t.$ed.attr("contenteditable",!e)},destroy:function(){var e=this,n=e.o.prefix;e.isTextarea?e.$box.after(e.$ta.css({height:""}).val(e.html()).removeClass(n+"textarea").show()):e.$box.after(e.$ed.css({height:""}).removeClass(n+"editor").removeAttr("contenteditable").removeAttr("dir").html(e.html()).show()),e.$ed.off("dblclick","img"),e.destroyPlugins(),e.$box.remove(),e.$c.removeData("trumbowyg"),a("body").removeClass(n+"body-fullscreen"),e.$c.trigger("tbwclose"),a(t).off("scroll."+e.eventNamespace+" resize."+e.eventNamespace)},empty:function(){this.$ta.val(""),this.syncCode(!0)},toggle:function(){var e=this,t=e.o.prefix;e.o.autogrowOnEnter&&(e.autogrowOnEnterDontClose=!e.$box.hasClass(t+"editor-hidden")),e.semanticCode(!1,!0),setTimeout(function(){e.doc.activeElement.blur(),e.$box.toggleClass(t+"editor-hidden "+t+"editor-visible"),e.$btnPane.toggleClass(t+"disable"),a("."+t+"viewHTML-button",e.$btnPane).toggleClass(t+"active"),e.$box.hasClass(t+"editor-visible")?e.$ta.attr("tabindex",-1):e.$ta.removeAttr("tabindex"),e.o.autogrowOnEnter&&!e.autogrowOnEnterDontClose&&e.autogrowEditorOnEnter()},0)},dropdown:function(e){var n=this,o=n.doc,r=n.o.prefix,i=a("[data-"+r+"dropdown="+e+"]",n.$box),s=a("."+r+e+"-button",n.$btnPane),l=i.is(":hidden");if(a("body",o).trigger("mousedown"),l){var d=s.offset().left;s.addClass(r+"active"),i.css({position:"absolute",top:s.offset().top-n.$btnPane.offset().top+s.outerHeight(),left:n.o.fixedFullWidth&&n.isFixed?d+"px":d-n.$btnPane.offset().left+"px"}).show(),a(t).trigger("scroll"),a("body",o).on("mousedown."+n.eventNamespace,function(e){i.is(e.target)||(a("."+r+"dropdown",n.$box).hide(),a("."+r+"active",n.$btnPane).removeClass(r+"active"),a("body",o).off("mousedown."+n.eventNamespace))})}},html:function(e){var t=this;return null!=e?(t.$ta.val(e),t.syncCode(!0),t.$c.trigger("tbwchange"),t):t.$ta.val()},syncTextarea:function(){var e=this;e.$ta.val(e.$ed.text().trim().length>0||e.$ed.find("hr,img,embed,iframe,input").length>0?e.$ed.html():"")},syncCode:function(e){var t=this;if(!e&&t.$ed.is(":visible"))t.syncTextarea();else{var n=a("<div>").html(t.$ta.val()),o=a("<div>").append(n);a(t.o.tagsToRemove.join(","),o).remove(),t.$ed.html(o.contents().html())}if(t.o.autogrow&&(t.height=t.$ed.height(),t.height!==t.$ta.css("height")&&(t.$ta.css({height:t.height}),t.$c.trigger("tbwresize"))),t.o.autogrowOnEnter){t.$ed.height("auto");var r=t.autogrowOnEnterWasFocused?t.$ed[0].scrollHeight:t.$ed.css("min-height");r!==t.$ta.css("height")&&(t.$ed.css({height:r}),t.$c.trigger("tbwresize"))}},semanticCode:function(e,t,n){var o=this;if(o.saveRange(),o.syncCode(e),o.o.semantic){if(o.semanticTag("b"),o.semanticTag("i"),o.semanticTag("s"),o.semanticTag("strike"),t){var r=o.o.inlineElementsSelector,i=":not("+r+")";o.$ed.contents().filter(function(){return 3===this.nodeType&&this.nodeValue.trim().length>0}).wrap("<span data-tbw/>");var s=function(e){if(0!==e.length){var t=e.nextUntil(i).addBack().wrapAll("<p/>").parent(),n=t.nextAll(r).first();t.next("br").remove(),s(n)}};s(o.$ed.children(r).first()),o.semanticTag("div",!0),o.$ed.find("p").filter(function(){return(!o.range||this!==o.range.startContainer)&&(0===a(this).text().trim().length&&0===a(this).children().not("br,span").length)}).contents().unwrap(),a("[data-tbw]",o.$ed).contents().unwrap(),o.$ed.find("p:empty").remove()}n||o.restoreRange(),o.syncTextarea()}},semanticTag:function(e,t){var n;if(null!=this.o.semantic&&"object"==typeof this.o.semantic&&this.o.semantic.hasOwnProperty(e))n=this.o.semantic[e];else{if(this.o.semantic!==!0||!this.DEFAULT_SEMANTIC_MAP.hasOwnProperty(e))return;n=this.DEFAULT_SEMANTIC_MAP[e]}a(e,this.$ed).each(function(){var e=a(this);e.wrap("<"+n+"/>"),t&&a.each(e.prop("attributes"),function(){e.parent().attr(this.name,this.value)}),e.contents().unwrap()})},createLink:function(){for(var e,t,n,o=this,r=o.doc.getSelection(),i=r.focusNode,s=(new XMLSerializer).serializeToString(r.getRangeAt(0).cloneContents());["A","DIV"].indexOf(i.nodeName)<0;)i=i.parentNode;if(i&&"A"===i.nodeName){var l=a(i);s=l.text(),e=l.attr("href"),o.o.minimalLinks||(t=l.attr("title"),n=l.attr("target"));var d=o.doc.createRange();d.selectNode(i),r.removeAllRanges(),r.addRange(d)}o.saveRange();var c={url:{label:"URL",required:!0,value:e},text:{label:o.lang.text,value:s}};o.o.minimalLinks||Object.assign(c,{title:{label:o.lang.title,value:t},target:{label:o.lang.target,value:n}}),o.openModalInsert(o.lang.createLink,c,function(e){var t=o.prependUrlPrefix(e.url);if(!t.length)return!1;var n=a(['<a href="',e.url,'">',e.text||e.url,"</a>"].join(""));return o.o.minimalLinks||(e.title.length>0&&n.attr("title",e.title),e.target.length>0&&n.attr("target",e.target)),o.range.deleteContents(),o.range.insertNode(n[0]),o.syncCode(),o.$c.trigger("tbwchange"),!0})},prependUrlPrefix:function(e){var t=this;if(!t.urlPrefix)return e;const n=/^([a-z][-+.a-z0-9]*:|\/|#)/i;if(n.test(e))return e;const a=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return a.test(e)?"mailto:"+e:t.urlPrefix+e},unlink:function(){var e=this,t=e.doc.getSelection(),n=t.focusNode;if(t.isCollapsed){for(;["A","DIV"].indexOf(n.nodeName)<0;)n=n.parentNode;if(n&&"A"===n.nodeName){var a=e.doc.createRange();a.selectNode(n),t.removeAllRanges(),t.addRange(a)}}e.execCmd("unlink",void 0,void 0,!0)},insertImage:function(){var e=this;e.saveRange();var t={url:{label:"URL",required:!0},alt:{label:e.lang.description,value:e.getRangeText()}};e.o.imageWidthModalEdit&&(t.width={}),e.openModalInsert(e.lang.insertImage,t,function(t){e.execCmd("insertImage",t.url);var n=a('img[src="'+t.url+'"]:not([alt])',e.$box);return n.attr("alt",t.alt),e.o.imageWidthModalEdit&&n.attr({width:t.width}),e.syncCode(),e.$c.trigger("tbwchange"),!0})},fullscreen:function(){var e,n=this,o=n.o.prefix,r=o+"fullscreen";n.$box.toggleClass(r),e=n.$box.hasClass(r),a("body").toggleClass(o+"body-fullscreen",e),a(t).trigger("scroll"),n.$c.trigger("tbw"+(e?"open":"close")+"fullscreen")},execCmd:function(e,t,n,a){var o=this;a=!!a||"","dropdown"!==e&&o.$ed.focus();try{o.doc.execCommand("styleWithCSS",!1,n||!1)}catch(r){}try{o[e+a](t)}catch(r){try{e(t)}catch(i){"insertHorizontalRule"===e?t=void 0:"formatBlock"===e&&o.isIE&&(t="<"+t+">"),o.doc.execCommand(e,!1,t),o.syncCode(),o.semanticCode(!1,!0)}"dropdown"!==e&&(o.updateButtonPaneStatus(),o.$c.trigger("tbwchange"))}},openModal:function(e,n){var i=this,s=i.o.prefix;if(a("."+s+"modal-box",i.$box).length>0)return!1;i.o.autogrowOnEnter&&(i.autogrowOnEnterDontClose=!0),i.saveRange(),i.showOverlay(),i.$btnPane.addClass(s+"disable");var l=a("<div/>",{"class":s+"modal "+s+"fixed-top"}).css({top:i.$btnPane.height()}).appendTo(i.$box);i.$overlay.one("click",function(){return l.trigger(r),!1});var d=a("<form/>",{action:"",html:n}).on("submit",function(){return l.trigger(o),!1}).on("reset",function(){return l.trigger(r),!1}).on("submit reset",function(){i.o.autogrowOnEnter&&(i.autogrowOnEnterDontClose=!1)}),c=a("<div/>",{"class":s+"modal-box",html:d}).css({top:"-"+i.$btnPane.outerHeight()+"px",opacity:0}).appendTo(l).animate({top:0,opacity:1},100);return a("<span/>",{text:e,"class":s+"modal-title"}).prependTo(c),l.height(c.outerHeight()+10),a("input:first",c).focus(),i.buildModalBtn("submit",c),i.buildModalBtn("reset",c),a(t).trigger("scroll"),l},buildModalBtn:function(e,t){var n=this,o=n.o.prefix;return a("<button/>",{"class":o+"modal-button "+o+"modal-"+e,type:e,text:n.lang[e]||e}).appendTo(a("form",t))},closeModal:function(){var e=this,t=e.o.prefix;e.$btnPane.removeClass(t+"disable"),e.$overlay.off();var n=a("."+t+"modal-box",e.$box);n.animate({top:"-"+n.height()},100,function(){n.parent().remove(),e.hideOverlay()}),e.restoreRange()},openModalInsert:function(e,t,n){var i=this,s=i.o.prefix,l=i.lang,d="";return a.each(t,function(e,t){var n=t.label||e,a=t.name||e,o=t.attributes||{},r=Object.keys(o).map(function(e){return e+'="'+o[e]+'"'}).join(" ");d+='<label><input type="'+(t.type||"text")+'" name="'+a+'"'+("checkbox"===t.type&&t.value?' checked="checked"':' value="'+(t.value||"").replace(/"/g,"&quot;"))+'"'+r+'><span class="'+s+'input-infos"><span>'+(l[n]?l[n]:n)+"</span></span></label>"}),i.openModal(e,d).on(o,function(){var e=a("form",a(this)),r=!0,s={};a.each(t,function(t,n){var o=n.name||t,l=a('input[name="'+o+'"]',e),d=l.attr("type");switch(d.toLowerCase()){case"checkbox":s[o]=l.is(":checked");break;case"radio":s[o]=l.filter(":checked").val();break;default:s[o]=a.trim(l.val())}n.required&&""===s[o]?(r=!1,i.addErrorOnModalField(l,i.lang.required)):n.pattern&&!n.pattern.test(s[o])&&(r=!1,i.addErrorOnModalField(l,n.patternError))}),r&&(i.restoreRange(),n(s,t)&&(i.syncCode(),i.$c.trigger("tbwchange"),i.closeModal(),a(this).off(o)))}).one(r,function(){a(this).off(o),i.closeModal()})},addErrorOnModalField:function(e,t){var n=this.o.prefix,o=e.parent();e.on("change keyup",function(){o.removeClass(n+"input-error")}),o.addClass(n+"input-error").find("input+span").append(a("<span/>",{"class":n+"msg-error",text:t}))},getDefaultImgDblClickHandler:function(){var e=this;return function(){var t=a(this),n=t.attr("src"),o="(Base64)";0===n.indexOf("data:image")&&(n=o);var r={url:{label:"URL",value:n,required:!0},alt:{label:e.lang.description,value:t.attr("alt")}};return e.o.imageWidthModalEdit&&(r.width={value:t.attr("width")?t.attr("width"):""}),e.openModalInsert(e.lang.insertImage,r,function(n){return n.src!==o&&t.attr({src:n.url}),t.attr({alt:n.alt}),e.o.imageWidthModalEdit&&(parseInt(n.width)>0?t.attr({width:n.width}):t.removeAttr("width")),!0}),!1}},saveRange:function(){var e=this,t=e.doc.getSelection();if(e.range=null,t.rangeCount){var n,a=e.range=t.getRangeAt(0),o=e.doc.createRange();o.selectNodeContents(e.$ed[0]),o.setEnd(a.startContainer,a.startOffset),n=(o+"").length,e.metaRange={start:n,end:n+(a+"").length}}},restoreRange:function(){var e,t=this,n=t.metaRange,a=t.range,o=t.doc.getSelection();if(a){if(n&&n.start!==n.end){var r,i=0,s=[t.$ed[0]],l=!1,d=!1;for(e=t.doc.createRange();!d&&(r=s.pop());)if(3===r.nodeType){var c=i+r.length;!l&&n.start>=i&&n.start<=c&&(e.setStart(r,n.start-i),l=!0),l&&n.end>=i&&n.end<=c&&(e.setEnd(r,n.end-i),d=!0),i=c}else for(var u=r.childNodes,g=u.length;g>0;)g-=1,s.push(u[g])}o.removeAllRanges(),o.addRange(e||a)}},getRangeText:function(){return this.range+""},updateButtonPaneStatus:function(){var e=this,t=e.o.prefix,n=e.getTagsRecursive(e.doc.getSelection().focusNode),o=t+"active-button "+t+"active";a("."+t+"active-button",e.$btnPane).removeClass(o),a.each(n,function(n,r){var i=e.tagToButton[r.toLowerCase()],s=a("."+t+i+"-button",e.$btnPane);if(s.length>0)s.addClass(o);else try{s=a("."+t+"dropdown ."+t+i+"-dropdown-button",e.$box);var l=s.parent().data("dropdown");a("."+t+l+"-button",e.$box).addClass(o)}catch(d){}})},getTagsRecursive:function(e,t){var n=this;if(t=t||(e&&e.tagName?[e.tagName]:[]),!e||!e.parentNode)return t;e=e.parentNode;var o=e.tagName;return"DIV"===o?t:("P"===o&&""!==e.style.textAlign&&t.push(e.style.textAlign),a.each(n.tagHandlers,function(a,o){t=t.concat(o(e,n))}),t.push(o),n.getTagsRecursive(e,t).filter(function(e){return null!=e}))},initPlugins:function(){var e=this;e.loadedPlugins=[],a.each(a.trumbowyg.plugins,function(t,n){n.shouldInit&&!n.shouldInit(e)||(n.init(e),n.tagHandler&&e.tagHandlers.push(n.tagHandler),e.loadedPlugins.push(n))})},destroyPlugins:function(){a.each(this.loadedPlugins,function(e,t){t.destroy&&t.destroy()})}}}(navigator,window,document,jQuery);;
(function ($) {

    'use strict';

    if ($("#chart-widget-01").length) {
        var options = {
            colors: [colors[0]],
            chart: {
                height: 200,
                animations: {
                    enabled: false,
                },
                sparkline: {
                    enabled: true
                },
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                    columnWidth: '35%',
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            series: [{
                name: 'Last Month',
                data: [10, 30, 45, 50, 61, 55, 45, 35, 10]
            },
                // {
                //     name: 'Last Month',
                //     data: [10 , 61, 55, 45, 30, 45, 50, 35, 10]
                // }
            ],
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },

            fill: {
                opacity: 1

            },
            // legend: {
            //     floating: true
            // },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-01"),
            options
        );

        chart.render();
    }
    if ($("#chart-widget-02").length) {
        var options = {
            colors: colors[0],
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        name: {
                            fontSize: '16px',
                            color: undefined,
                            offsetY: 120
                        },
                        value: {
                            offsetY: 76,
                            fontSize: '22px',
                            color: undefined,
                            formatter: function (val) {
                                return val + "%";
                            }
                        }
                    }
                }
            },
            fill: {
                gradient: {
                    enabled: true,
                    shade: 'dark',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 65, 91]
                },
            },
            stroke: {
                dashArray: 4
            },
            series: [67],
            labels: ['Funded'],

        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-02"),
            options
        );

        chart.render();

    }
    if ($("#chart-widget-03").length) {
        var options = {
            colors: colors[19],
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 15,
                        size: '70%',
                        image: '../assets/img/icecream.png',
                        imageWidth: 100,
                        imageHeight: 100,
                        imageClipped: false
                    },
                    dataLabels: {
                        name: {
                            show: false,
                            color: '#fff'
                        },
                        value: {
                            show: true,
                            color: '#ddd',
                            offsetY: 80,
                            fontSize: '22px'

                        }
                    }
                }
            },

            series: [67],
            stroke: {
                lineCap: 'round'
            },
            labels: ['Volatility'],

        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-03"),
            options
        );

        chart.render();

    }
    if ($("#chart-widget-04").length) {


        var options = {
            colors: [colors[15], colors[18], colors[19]],

            chart: {
                width: 240,
                type: 'donut',
            },
            series: [44, 55, 25],
            dataLabels: {
                enabled: false
            },
            legend: {
                position: 'bottom',
                show: false
            }

        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-04"),
            options
        );

        chart.render();
    }
    if ($("#chart-widget-05").length) {
        var options = {
            colors: colors,
            chart: {
                height: 150,
                type: 'area',
                sparkline: {
                    enabled: true
                },
                animations: {
                    enabled: false,
                },

            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            series: [
                {
                    name: 'Bandwidth',
                    data: [{
                        x: 1996,
                        y: 322
                    },
                        {
                            x: 1997,
                            y: 324
                        },
                        {
                            x: 1998,
                            y: 329
                        },
                        {
                            x: 1999,
                            y: 342
                        },
                        {
                            x: 2000,
                            y: 348
                        },
                        {
                            x: 2001,
                            y: 334
                        },
                        {
                            x: 2002,
                            y: 325
                        },
                        {
                            x: 2003,
                            y: 316
                        },
                        {
                            x: 2004,
                            y: 318
                        },
                        {
                            x: 2005,
                            y: 330
                        },
                        {
                            x: 2006,
                            y: 355
                        },
                        {
                            x: 2007,
                            y: 366
                        },
                        {
                            x: 2008,
                            y: 337
                        },
                        {
                            x: 2009,
                            y: 352
                        },
                        {
                            x: 2010,
                            y: 377
                        },
                        {
                            x: 2011,
                            y: 383
                        },
                        {
                            x: 2012,
                            y: 344
                        },
                        {
                            x: 2013,
                            y: 366
                        },
                        {
                            x: 2014,
                            y: 389
                        },
                        {
                            x: 2015,
                            y: 334
                        }
                    ]
                }],

            xaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },

            fill: {
                opacity: 0.5,
                gradient: {
                    enabled: false
                }
            },

        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-05"),
            options
        );

        chart.render();

    }
    if ($("#chart-widget-06").length) {
        var options = {
            colors: [colors[1], colors[1]],
            chart: {
                height: 150,
                type: 'area',
                sparkline: {
                    enabled: true
                },
                animations: {
                    enabled: false,
                },

            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            series: [
                {
                    name: 'Bandwidth',
                    data: [{
                        x: 1996,
                        y: 322
                    },
                        {
                            x: 1997,
                            y: 324
                        },
                        {
                            x: 1998,
                            y: 329
                        },
                        {
                            x: 1999,
                            y: 342
                        },
                        {
                            x: 2000,
                            y: 348
                        },
                        {
                            x: 2001,
                            y: 334
                        },
                        {
                            x: 2002,
                            y: 325
                        },
                        {
                            x: 2003,
                            y: 316
                        },
                        {
                            x: 2004,
                            y: 318
                        },
                        {
                            x: 2005,
                            y: 330
                        },
                        {
                            x: 2006,
                            y: 355
                        },
                        {
                            x: 2007,
                            y: 366
                        },
                        {
                            x: 2008,
                            y: 337
                        },
                        {
                            x: 2009,
                            y: 352
                        },
                        {
                            x: 2010,
                            y: 377
                        },
                        {
                            x: 2011,
                            y: 383
                        },
                        {
                            x: 2012,
                            y: 344
                        },
                        {
                            x: 2013,
                            y: 366
                        },
                        {
                            x: 2014,
                            y: 389
                        },
                        {
                            x: 2015,
                            y: 334
                        }
                    ]
                }],

            xaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },

            fill: {
                opacity: 0.5,
                gradient: {
                    enabled: false
                }
            },

        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-06"),
            options
        );

        chart.render();

    }
    if ($("#chart-widget-07").length) {
        var options = {
            colors: [colors[2], colors[20],],
            chart: {

                height: 350,
                type: 'bar',
                stacked: true,
                toolbar: {
                    show: false
                },
            },
            responsive: [{
                breakpoint: 700,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: false,

                    }
                },
            },
            series: [{
                name: 'Previous Year',
                data: [44, 55, 41, 67, 22, 43]
            }, {
                name: 'Current Year',
                data: [13, 23, 20, 8, 13, 27]
            }],
            xaxis: {
                type: 'datetime',
                categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT'],
            },
            fill: {
                opacity: 1
            },
        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-07"),
            options
        );

        chart.render();

    }
    if ($("#chart-widget-08").length) {
        var options = {
            chart: {
                type: 'area',
                sparkline: {
                    enabled: true
                },
                animations: {
                    enabled: false,
                },
            },

            stroke: {
                curve: 'smooth',
                width: 0
            },
            fill: {
                opacity: 0.7,
                gradient: {
                    enabled: false
                }
            },
            series: [{
                data: [0, 68, 50, 98, 62, 25, 32, 68, 0]
            }],
            yaxis: {
                min: 0
            },
            colors: colors[12],

        }
        var chart = new ApexCharts(
            document.querySelector("#chart-widget-08"),
            options
        );

        chart.render();
    }
    if ($("#chart-widget-09").length) {
        var options = {
            colors: colors,
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            series: [{
                name: "Desktops",
                data: [30, 41, 35, 51, 49, 62, 69, 91, 126]
            }],
            title: {
                text: 'Product Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            labels: ["13 Nov 2017", "14 Nov 2017", "15 Nov 2017", "16 Nov 2017", "17 Nov 2017", "20 Nov 2017", "21 Nov 2017", "22 Nov 2017", "23 Nov 2017", "24 Nov 2017", "27 Nov 2017", "28 Nov 2017", "29 Nov 2017", "30 Nov 2017", "01 Dec 2017", "04 Dec 2017", "05 Dec 2017", "06 Dec 2017", "07 Dec 2017", "08 Dec 2017"],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            },
        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-09"),
            options
        );

        chart.render();


    }
    if ($("#chart-widget-10").length) {

        var options = {
            colors: colors,
            chart: {
                sparkline: {
                    enabled: true
                },
                height: 250,
                type: 'area',
                toolbar: {
                    show: false
                },
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 1,
                type: 'solid'
            },
            stroke: {
                curve: 'straight'
            },
            series: [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 60, 35]
            }, {
                name: 'series2',
                data: [50, 70, 45, 70, 90, 80, 90]
            }],

            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00", "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00", "2018-09-19T06:30:00"],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-10"),
            options
        );

        chart.render();

    }
    if ($("#chart-widget-11").length) {

        var options = {
            colors: colors[10],
            chart: {
                sparkline: {
                    enabled: true
                },
                height: 150,
                type: 'area',
                toolbar: {
                    show: false
                },
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 1,
                type: 'solid'
            },
            stroke: {
                curve: 'straight'
            },
            series: [{
                name: 'series1',
                data: [51, 42, 45, 31, 40, 28, 35]
            }],

            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00", "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00", "2018-09-19T06:30:00"],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-11"),
            options
        );

        chart.render();

    }
    if ($("#chart-widget-12").length) {
        var options = {
            colors: colors,
            chart: {
                height: 250,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            series: [70],
            labels: ['Complete'],

        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-12"),
            options
        );

        chart.render();

    }
    if ($("#chart-widget-13").length) {

        var options = {
            colors: [colors[20]],
            chart: {
                sparkline: {
                    enabled: true
                },
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                    columnWidth: '20%',
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            series: [{
                name: 'Net Profit',
                data: [60, 30, 90, 46, 61, 28, 63, 60, 66]
            }],
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1

            },
            // legend: {
            //     floating: true
            // },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-13"),
            options
        );

        chart.render();
    }
    if ($("#chart-widget-14").length) {

        var options = {
            chart: {
                type: 'line',

                height: 135,
                sparkline: {
                    enabled: true
                }
            },
            series: [{
                data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
            }],
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-14"),
            options
        );

        chart.render();


    }
    if ($("#chart-widget-15").length) {

        var options = {
            colors: [colors[0], colors[20]],
            chart: {
                type: 'bar',
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',

                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            series: [{
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61]
            }, {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87]
            }],
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1

            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-15"),
            options
        );

        chart.render();


    }
    if ($("#chart-widget-16").length) {

        var options = {
            colors: [colors[6]],
            chart: {
                type: 'area',
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',

                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            series: [{
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61]
            }],
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1

            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-16"),
            options
        );

        chart.render();


    }
    if ($("#chart-widget-17").length) {

        var options = {
            chart: {
                type: 'line',
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',

                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            series: [{
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61]
            }],
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1

            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-17"),
            options
        );

        chart.render();

    }
    if ($("#chart-widget-18").length) {


        var options = {
            colors: [colors[0], colors[18], colors[19], colors[17], colors[15], colors[12]],
            chart: {
                width: 240,
                type: 'donut',
            },
            series: [44, 55, 25, 25, 16, 46],
            dataLabels: {
                enabled: false
            },
            legend: {
                position: 'bottom',
                show: false
            }

        }

        var chart = new ApexCharts(
            document.querySelector("#chart-widget-18"),
            options
        );

        chart.render();
    }
    if ($.trumbowyg) {
        $.trumbowyg.svgPath = 'assets/vendor/trumbowyg/ui/icons.svg';

        $("#trumbowyg-note").trumbowyg({
            btns: [
                ['strong', 'em', 'del'],
                ['link'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                ['unorderedList', 'orderedList'],
                ['fullscreen']
            ]
        });
    }
})(window.jQuery);;
