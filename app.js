const canvas = document.getElementById("jsCanvas");//html 파일에서 문서 객체찾기 
const ctx = canvas.getContext("2d");/*캔버스애서 그릴 수 있게 변수 선언*/
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

canvas.width =  CANVAS_SIZE;//선을 그릴 수 있게 사이즈 설정
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = "INITIAL_COLOR";/*선,채우기 색상사용가능*/
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;



let painting = false;
let filling = false;

function stopPainting(){ 
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){//마우스 캔버스 안에 있는지유뮤
    
    const x = event.offsetX;//캔버스 기준의 x,y   
    const y = event.offsetY;  
    if(!painting){/*커서 안누를때 시작지점 이동중*/
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
   
    
   else{/*정해지면 시작지점과 끝지점을 잇는다*/
         ctx.lineTo(x, y);
         ctx.stroke();/*실체화*/
    }
}

function changeColor (event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange (event){
    const size = event.target.value;
    ctx.lineWidth = size;/*크기조정 바 크기*/
}

function handleModeClick(){//클릭시에 버튼 바뀌기
    if(filling === true){
        filling = false;
        mode.innerText = 'Fill';
    }    
    else{
        filling = true;
        mode.innerText = "Paint";
        
    }  
}

function handleCanvasClick()
{
    if(filling){/*채우기*/
    
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

}

function handleSaveClick(){//사진 저장 
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[📷]";
    link.click();
}


function handleCM(event){
    event.preventDefault()
}




if(canvas){/*특정조건을 만족하면 발생하는 이벤트 모음 */
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting );
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    
} 

Array.from (colors).forEach(color => color.addEventListener("click", changeColor));//색상 바꾸기

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}



if(save){
    save.addEventListener("click", handleSaveClick);
}