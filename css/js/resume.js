var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
param=query[i].split("=");
paramValue=parseInt(param[1]);
}
var request;
var idb=window.indexedDB||window.mozIndexedDB||window.msIndexedDB||window.webitIndexedDB;
var open=idb.open("StoreData",1);
console.log("IndexedDB is created");
open.onupgradeneeded=function(event)
{
var request=event.target.result;
var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
console.log("Object store is not created"+error);
}
open.onsuccess=function(event)
{
request=event.target.result;
var transaction=request.transaction("Formdata","readwrite");
var storeDB=transaction.objectStore("Formdata");
var info=storeDB.get(paramValue);
info.onsuccess=function(data)
{
  console.log(data.target.result);
  display(data.target.result);
  education(data.target.result);
  Tskills(data.target.result);
}
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data)
{
  var img=document.createElement("img");
  img.src="images/add.svg";
  left.append(img);
  var h3=document.createElement("h2");
  h3.textContent=data.name;
  left.append(h3);
  var kk =document.createElement("hr");
  left.append(kk);
  var h2=document.createElement("h3");
  h2.textContent=data.email;
  left.append(h2);
  var role=document.createElement("h4")
  role.textContent=data.role;
  left.append(role);
  var mobile=document.createElement("h4")
  mobile.textContent=data.mobile;
  left.append(mobile);
//right div
var head=document.createElement("h2");
head.textContent="career objective";
right.append(head);
var pc =document.createElement("p");
pc.textContent=data.career;
right.append(pc);
}
function education(ed)
{
  var h1=document.createElement("h1");
  h1.textContent="Educational details";
  right.append(h1);
  var kr =document.createElement("hr");
  right.append(kr);
  var table=document.createElement('table')
  table.border="1";
  let row='';
  row+="<tr>"+
  "<td>"+"Institute"+"</td>"+
  "<td>"+"Degree"+"</td>"+
  "<td>"+"Branch"+"</td>"+
  "<td>"+"percentage"+"</td>"
  "</tr>"
  for(i in ed.education)
  {
    row+="<tr>"
    +"<td>"+ed.education[i].college+"</td>"+
    "<td>"+ed.education[i].degree+"</td>"+
    "<td>"+ed.education[i].branch+"</td>"+
    "<td>"+ed.education[i].marks+"</td>"+
    "</tr>"
    table.innerHTML=row;
    right.append(table);
  }
}
  function Tskills(l)
  {
    var ill= document.createElement('h2');
    ill.textContent="Technical Skills";
    right.append(ill);
    var ll=document.createElement('hr');
    right.append(ll);
    var kkl=document.createElement("p");
    kkl.textContent=l.skills;
    right.append(kkl);
}
