"use strict";function savePostAsImg(){var t=$("#dream-save-post-as-img"),e=t.prop("scrollWidth"),a=t.prop("scrollHeight"),o=document.createElement("canvas"),n=e,c=a;return o.width=2*n,o.height=2*c,o.getContext("2d").scale(2,2),html2canvas(document.querySelector("#dream-save-post-as-img"),{canvas:o,width:n,height:c,scale:2}).then(function(t){var e=t.getContext("2d");e.mozImageSmoothingEnabled=!1,e.webkitImageSmoothingEnabled=!1,e.msImageSmoothingEnabled=!1,e.imageSmoothingEnabled=!1;var a=t.toDataURL("image/png"),o=document.createElement("a");o.href=URL.createObjectURL(dataURLtoBlob(a)),o.download="".concat(document.title.replace("|","").split(" ").join("-"),".png"),o.click()}),!1}function dataURLtoBlob(t){for(var e=t.split(","),a=e[0].match(/:(.*?);/)[1],o=atob(e[1]),n=o.length,c=new Uint8Array(n);n--;)c[n]=o.charCodeAt(n);return new Blob([c],{type:a})}