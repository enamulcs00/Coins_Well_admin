(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/_validators/validEmail.ts":
/*!*******************************************!*\
  !*** ./src/app/_validators/validEmail.ts ***!
  \*******************************************/
/*! exports provided: validEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validEmail", function() { return validEmail; });
function validEmail(control) {
    let pattern = /^^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gi; // can change regex with your requirement
    //if validation fails, return error name & value of true
    if (!pattern.test(control.value)) {
        return { validEmail: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}


/***/ })

}]);
//# sourceMappingURL=common.js.map