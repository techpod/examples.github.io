/*
Material contained herein is the property of Glenn Cy Caruso.
All Rights Reserved.
*/
function runImgGalry() {
    "use strict";
    var imgIntrvl = 0;
    var galCount = 0;
    var reSrtrInProg = false;
    var timr = 2000;
    var piktrs = $(".xmpl-piktr");
    var piktrCount = piktrs.length;
    var imgTimr = 1000;
    var galFinshd = false;
    var allowRestart = false;
    var imgPaused = true;

    function updatImg() {
        allowRestart = true;
        galCount = galCount + 1;
        if (galCount < piktrCount) {
            imgPaused = false;
            $("#xmpl-img-gal-inner").animate({ "marginLeft": $(".xmpl-piktr").width() * (-galCount) }, imgTimr,
                function () {
                    imgPaused = true;
                });
        }
        if (galCount === piktrCount) {
            galFinshd = true;
            clearInterval(imgIntrvl);
        }
    }

    imgIntrvl = setInterval(updatImg, timr);
    function reStrt() {
        reSrtrInProg = true;
        if (allowRestart) {
            allowRestart = false;
            $("#xmpl-img-gal-inner").stop();
            clearInterval(imgIntrvl);
            if (galFinshd === false && imgPaused === false) {
                //slider has not reached the end
                setTimeout(function () {
                    var restartSpeed = ((imgTimr * galCount) * 0.5);
                    $("#xmpl-img-gal-inner").animate({ "marginLeft": "0" },
                        restartSpeed,
                        "linear",
                        function () {
                            reSrtrInProg = false;
                        });
                    var startTime = restartSpeed;
                    galCount = 0;
                    setTimeout(function () {
                        imgIntrvl = setInterval(updatImg,
                            timr);
                    }, startTime);
                }, 500);
            } else { //slider has reached the end
                allowRestart = false;
                var restartSpeed = ((imgTimr * galCount) * 0.5);
                $("#xmpl-img-gal-inner").animate({ "marginLeft": "0" },
                    restartSpeed, "linear",
                    function () {
                        reSrtrInProg = false;
                    });
                var startTime = restartSpeed;
                galCount = 0;
                setTimeout(function () { imgIntrvl = setInterval(updatImg, timr); },
                    startTime);
                galFinshd = false;
            }
        }
    }
    var theButton = document.getElementById("btn1");
    theButton.addEventListener("click", reStrt);

    $(window).on("resize", function () {
        if (reSrtrInProg === false) {
            $("#xmpl-img-gal-inner").stop();
            clearInterval(imgIntrvl);
            if (galCount < piktrCount) {
                $("#xmpl-img-gal-inner").css({ "marginLeft": $(".xmpl-piktr").width() * (-galCount) });
            } else {
                galCount = piktrCount - 1;
                $("#xmpl-img-gal-inner").css({ "marginLeft": $(".xmpl-piktr").width() * (-galCount) });
            }
            imgPaused = true;
            imgIntrvl = setInterval(updatImg, timr);
        }
    });
}
$(document).ready(function () {
    "use strict";
    runImgGalry();
});
