const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),o=document.querySelector("button[data-stop]");let d=null;const a=()=>`#${Math.floor(16777215*Math.random()).toString(16)}`;e.addEventListener("click",(()=>{e.disabled||(d=setInterval((()=>{t.style.backgroundColor=a()}),1e3),e.disabled=!0)})),o.addEventListener("click",(()=>{clearTimeout(d),e.disabled=!1}));
//# sourceMappingURL=01-color-switcher.1a3422ed.js.map