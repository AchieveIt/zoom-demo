(this.webpackJsonpzoom=this.webpackJsonpzoom||[]).push([[0],{1483:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n.n(c),a=n(2),i=n.n(a),r=(n(42),n(5)),u=(n(43),n(44),n(35)),s=n.n(u),l=(n(1481),n(1482),n(37)),h=n(4),m=function(e){var t=e.temp,n=e.children,a=e.mouseEvent,i=Object(l.a)(e,["temp","children","mouseEvent"]),r=Object(h.pick)(i,["style","className","onMouseDown","onMouseUp","onTouchEnd","onTouchStart"]),u=Object(c.useRef)();return Object(c.useEffect)((function(){var e=u&&u.current;return e&&t&&function(e,t){var n=document.createEvent("HTMLEvents");n.initEvent("mousedown",!0,!0);var c=e.getBoundingClientRect;e.getBoundingClientRect=function(){return e.getBoundingClientRect=c,{left:t.clientX,top:t.clientY}},e.dispatchEvent(n)}(e,a),function(){return e&&t&&void document.createEvent("HTMLEvents").initEvent("mouseup",!0,!0)}}),[u,t,a]),o.a.createElement("div",Object.assign({ref:u},r),n)},y=n(15),d=n(36),f=function(e,t){switch(t.type){case"addTemp":if(-1!==e.findIndex((function(e){return e.temp})))return e;var n=e.reduce((function(e,t){return t.x+t.h>e?t.x+t.h:e}),0),c=e.reduce((function(e,t){return t.y+t.w>e?t.y+t.w:e}),0);return[].concat(Object(d.a)(e),[{x:n+1,y:c+1,h:t.h?t.h:1,w:t.w?t.w:1,content:t.content?t.content:String.fromCharCode(65+e.length),temp:!0,mouseEvent:t.mouseEvent,i:""+e.length}]);case"clearTemp":return e.filter((function(e){return!e.temp}));case"finaliseTemporaryItem":return e.map((function(e){return Object(y.a)(Object(y.a)({},e),{},{temp:!1})}));case"newLayout":if(-1!==e.findIndex((function(e){return e.temp})))return e;var o=Object(h.merge)(Object(h.keyBy)(e,"i"),Object(h.keyBy)(t.layout,"i"));return Object.values(o);default:return e}},w=[{i:"0",x:0,y:0,w:1,h:2,content:"A"},{i:"1",x:1,y:0,w:3,h:2,minW:2,maxW:4,content:"B"},{i:"2",x:4,y:0,w:1,h:2,content:"C"},{i:"3",x:5,y:0,w:1,h:2,content:"D"},{i:"4",x:0,y:2,w:2,h:2,content:"E"},{i:"5",x:2,y:2,w:3,h:2,content:"F"},{i:"6",x:5,y:2,w:1,h:2,content:"G"},{i:"7",x:0,y:4,w:6,h:2,content:"H"},{i:"8",x:0,y:6,w:1,h:2,content:"I"},{i:"9",x:2,y:6,w:1,h:2,content:"J"},{i:"10",x:4,y:6,w:1,h:2,content:"K"},{i:"11",x:5,y:6,w:1,h:2,content:"L"},{i:"12",x:0,y:8,w:3,h:1,content:"M"},{i:"13",x:3,y:8,w:3,h:1,content:"N"},{i:"14",x:1,y:9,w:2,h:2,content:"O"},{i:"15",x:3,y:9,w:3,h:2,content:"P"},{i:"16",x:0,y:11,w:3,h:3,content:"Q"},{i:"17",x:3,y:11,w:3,h:3,content:"R"},{i:"18",x:0,y:14,w:2,h:3,content:"S"},{i:"19",x:2,y:14,w:2,h:3,content:"T"},{i:"20",x:4,y:14,w:2,h:3,content:"U"},{i:"21",x:0,y:17,w:3,h:3,content:"V"},{i:"22",x:3,y:17,w:3,h:3,content:"W"},{i:"23",x:0,y:20,w:4,h:2,content:"X"},{i:"24",x:4,y:20,w:2,h:2,content:"Y"},{i:"25",x:0,y:22,w:2,h:2,content:"Z"},{i:"26",x:2,y:22,w:4,h:5,content:"AA"},{i:"27",x:0,y:24,w:2,h:3,content:"BB"},{i:"28",x:0,y:27,w:5,h:5,content:"CC"},{i:"29",x:5,y:27,w:1,h:8,content:"DD"},{i:"30",x:0,y:32,w:5,h:12,content:"EE"}],x=function(e){var t=Object(c.useRef)(),n=Object(c.useState)(!1),a=Object(r.a)(n,2),i=a[0],u=a[1],l=Object(c.useReducer)(f,w),h=Object(r.a)(l,2),y=h[0],d=h[1];return document.onclick=function(e){t.current.contains(e.target)&&e.target.classList.contains("indicator")||u(!1)},o.a.createElement("div",{className:i?"adding":void 0,style:{cursor:i?"crosshair":void 0}},o.a.createElement("div",{ref:t},o.a.createElement(s.a,{className:"layout",layout:y,onLayoutChange:function(e){return d({type:"newLayout",layout:e})},cols:6,rowHeight:30,width:1440,transformScale:e.zoom},y.map((function(e){return o.a.createElement(m,Object.assign({key:""+e.i,style:{border:"1px solid red"}},e),e.content,o.a.createElement("div",{className:"indicator",onClick:function(){if(i){u(!1);var t=y.concat();t.push({i:t.length.toString(),x:e.x,y:e.y+1,w:1,h:1,content:"N"}),d({type:"newLayout",layout:t})}}}))})))))};function v(){var e=Object(c.useState)(1),t=Object(r.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)(0),u=Object(r.a)(i,2),s=u[0],l=u[1],h=Object(c.useRef)(null),m=function(e){e.ctrlKey&&(e.preventDefault(),a((function(t){return Math.max(t-parseFloat((.01*e.deltaY).toFixed(2)),.25)})))};Object(c.useEffect)((function(){return window.addEventListener("wheel",m,{passive:!1}),function(){return window.removeEventListener("wheel",m,{passive:!1})}}),[]),Object(c.useEffect)((function(){h.current&&l(h.current.getBoundingClientRect().height)}),[]);return o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"header"},o.a.createElement("div",null,"Zoom"),o.a.createElement("div",{className:"zoomToggle"},o.a.createElement("button",{onClick:function(){return a((function(e){return Math.max(parseFloat((e-.1).toFixed(2)),.25)}))}},"-"),o.a.createElement("input",{value:parseFloat((100*n).toFixed(2)),onChange:function(e){var t=e.target.value;t/=100,a(Math.max(parseFloat(t.toFixed(2)),0))}}),o.a.createElement("button",{onClick:function(){return a((function(e){return parseFloat((e+.1).toFixed(2))}))}},"+"))),o.a.createElement("div",{className:"container",style:{margin:"auto",width:1440*n,height:s*n}},o.a.createElement("div",{ref:h,style:{transform:"scale(".concat(n,", ").concat(n,")"),transformOrigin:"0 0 0",width:1440}},o.a.createElement(x,{zoom:n}))))}i.a.render(o.a.createElement(v,null),document.getElementById("root"))},42:function(e,t,n){},43:function(e,t,n){}},[[1483,1,2]]]);
//# sourceMappingURL=main.152c6a70.chunk.js.map