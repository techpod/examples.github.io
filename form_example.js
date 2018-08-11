var namLabl;
var namFld;
var phonNumbrLabl;
var phonNumbrFld;
var emaalLabl;
var emaalFld;
var savInProg = false;

var xmplInfFrm = function () {
    "use strict";
    namLabl = document.querySelector("#xmpl-inf-frm-nam-labl");
    namFld = document.querySelector("#xmpl-inf-frm-nam");
    phonNumbrLabl = document.querySelector("#xmpl-inf-frm-phon-numbr-labl");
    phonNumbrFld = document.querySelector("#xmpl-inf-frm-phon-numbr");
    emaalLabl = document.querySelector("#xmpl-inf-frm-emaal-labl");
    emaalFld = document.querySelector("#xmpl-inf-frm-emaal");
    function clerFrm() {
        if (document.readyState === "complete") {
            namLabl.style.display = "none";
            namFld.value = "";
            namFld.style.backgroundColor = "#fff";
            namFld.style.borderColor = "#cf9cd2";
            phonNumbrLabl.style.display = "none";
            phonNumbrFld.value = "";
            phonNumbrFld.style.backgroundColor = "#fff";
            phonNumbrFld.style.borderColor = "#cf9cd2";
            emaalLabl.style.display = "none";
            emaalFld.value = "";
            emaalFld.style.backgroundColor = "#fff";
            emaalFld.style.borderColor = "#cf9cd2";
        }
    }
    var clearButton = document.getElementById("clrBtn");
    clearButton.addEventListener("click", clerFrm);
    $("#xmpl-inf-frm-nam").mousedown(function () {
        $("#xmpl-inf-frm-nam").css("backgroundColor", "#fff");
        $("#xmpl-inf-frm-nam").css("borderColor", "#cf9cd2");
    });
    $("#xmpl-inf-frm-phon-numbr").mousedown(function () {
        $("#xmpl-inf-frm-phon-numbr").css("backgroundColor", "#fff");
        $("#xmpl-inf-frm-phon-numbr").css("borderColor", "#cf9cd2");
    });
    $("#xmpl-inf-frm-emaal").mousedown(function () {
        $("#xmpl-inf-frm-emaal").css("backgroundColor", "#fff");
        $("#xmpl-inf-frm-emaal").css("borderColor", "#cf9cd2");
    });
};

function validRqFld(el, elmLabl) {
    "use strict";
    el.style.backgroundColor = "#f6edf6";
    el.style.borderColor = "#cf9cd2";
    if (elmLabl.innerHTML !== "* required") {
        elmLabl.style.display = "none";
        elmLabl.innerHTML = "* required";
        $(elmLabl).fadeIn();
    }
    $(elmLabl).fadeIn();
    return true;
}
function validElFrmt(el, elmLabl, mesTxt) {
    "use strict";
    el.style.backgroundColor = "#f6edf6";
    el.style.borderColor = "#cf9cd2";
    if (elmLabl.innerHTML !== mesTxt) {
        elmLabl.style.display = "none";
        elmLabl.innerHTML = mesTxt;
        $(elmLabl).fadeIn();
    }
    return true;
}
function submtDisply() {
    "use strict";
    if (savInProg) {
        return false;
    }
    savInProg = true;
    var submtDisp = document.querySelector("#xmpl-inf-frm-conf-mssg");
    $(submtDisp).fadeIn();
    function endDisply() {
        $(submtDisp).fadeOut(400, function () {
            savInProg = false;
        });
    }
    setTimeout(endDisply, 3000);
}
function valXmplFrm() {
    "use strict";
    if (document.readyState === "complete") {
        var valXmplFlag = false;
        var valTxt = "";

        /*simple front end validation*/
        var namRgEx = /[^a-zA-Z]/;
        var phonRgEx = /[^0-9]/;
        var emaalRgEx = /^\S+\S+@\S+(\.[a-zA-Z]{2,3})$/;

        if (namFld.value === "") {
            valXmplFlag = validRqFld(namFld, namLabl);
        }
        if (phonNumbrFld.value === "") {
            valXmplFlag = validRqFld(phonNumbrFld, phonNumbrLabl);
        }
        if (emaalFld.value === "") {
            valXmplFlag = validRqFld(emaalFld, emaalLabl);
        }
        if (namFld.value !== "") {
            if ((namFld.value).length < 2 || (namFld.value).length > 24) {
                valTxt = "* 2 to 24 letters";
                valXmplFlag = validElFrmt(namFld, namLabl, valTxt);
            } else if (namRgEx.test(namFld.value) === true) {
                valTxt = "* letters only";
                valXmplFlag = validElFrmt(namFld, namLabl, valTxt);
            } else {
                namLabl.innerHTML = "";
            }
        }
        if (phonNumbrFld.value !== "") {
            if ((phonNumbrFld.value).length !== 10) {
                valTxt = "* 10 numbers";
                valXmplFlag = validElFrmt(phonNumbrFld, phonNumbrLabl, valTxt);
            } else if (phonRgEx.test(phonNumbrFld.value) === true) {
                valTxt = "* numbers only";
                valXmplFlag = validElFrmt(phonNumbrFld, phonNumbrLabl, valTxt);
            } else {
                phonNumbrLabl.innerHTML = "";
            }
        }
        if (emaalFld.value !== "") {
            if (emaalRgEx.test(emaalFld.value) === false) {
                valTxt = "* format";
                valXmplFlag = validElFrmt(emaalFld, emaalLabl, valTxt);
            } else {
                emaalLabl.innerHTML = "";
            }
        }
        if (valXmplFlag) {
            return false;
        } else {
            submtDisply();
            return false;
        }
    }
}

$(document).ready(xmplInfFrm);
