const t11 = new Date()
const t1 = t11.getHours()
const t2 = t11.getMinutes()
const t3 = t11.getSeconds()
let timeinput = t1+":"+t2+":"+t3

showtask();
let addtaskinput = document.getElementById('addtaskinput'); 

function addtaskbtn(){

    addtaskinputval = document.getElementById('addtaskinput').value;
    let webtask = localStorage.getItem("localtask")
    if(addtaskinputval.trim()!=0){
    console.log(addtaskinputval.trim())
    const objdata = {
        TaskName : addtaskinputval,
        Time : timeinput
    }


if(webtask==null){
    localStorage.setItem('localtask','[]');
}

let taskobj = JSON.parse(webtask)
taskobj.push(objdata);
localStorage.setItem('localtask',JSON.stringify(taskobj))
addtaskinput.value = ''
window.location.reload()

showtask();
}
};

/* Show-Data in Table */
function showtask(){
    let webtask = localStorage.getItem("localtask");
    let   taskobj = JSON.parse(webtask);
    // console.log(taskobj[].Time)
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    taskobj.forEach((item, index) => {
        html += `<tr class="tableraw">
        <th scope="row" class="rowline">${index+1}</th>
        <td >${item.TaskName} </td>
        <td><button type="button"
        onclick="edittask(${index})">Edit</button></td>
                    <td><button type="button" onclick="deletedata(${index})" >Delete</button></td>
                    </tr>`;
            
                    
    });
        addedtasklist.innerHTML = html;
            
}

 /* ----- Click Edit to Select data in indexing and get text field ----- */
//  showtime();
 function edittask(index){
showtime();
    function showtime(){    /* Show time in Browser  */
        document.getElementById("Timeshow").innerHTML = '';
        let webtask1 = localStorage.getItem("localtask");
        let  taskobj1 = JSON.parse(webtask1);
        let timeshow = taskobj1[index].Time
        document.getElementById("Timeshow").innerHTML += "A-Time "+`${timeshow}`



    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    addtaskinput.value = taskobj[index].TaskName;
    addtaskbtn.style.display = "none";
    savetaskbtn.style.display = "block";
    saveindex.value = index;
    };
};


// window.location.reload()

/* ----- Save Edited and Update new data in table ----- */
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
   let addtaskbtn = document.getElementById("addtaskbtn");
   let  webtask = localStorage.getItem("localtask");
   let saveindex = document.getElementById("saveindex").value;
   let taskobj = JSON.parse(webtask);
   taskobj[saveindex].TaskName = addtaskinput.value;
   savetaskbtn.style.display = 'none';
   addtaskbtn.style.display = 'block';
   document.getElementById("Modtime").innerHTML = "M-Time("+timeinput+")" 
   localStorage.setItem('localtask',JSON.stringify(taskobj));
   addtaskinput.value = ''
   showtask();
});


/* ----- Delete value on click delete button ----- */
function deletedata(index){
    let  webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    taskobj.splice(index,1);
    localStorage.setItem('localtask',JSON.stringify(taskobj));
    window.location.reload()
    showtask();
}   