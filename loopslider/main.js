let ul = document.querySelector("ul");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let lis = ul.querySelectorAll("li");
let len = lis.length;
let enableClick = true;


init();

next.addEventListener("click", (e)=>{
    e.preventDefault();

    if (enableClick) {
        
        enableClick = false;
        nextSlide();
    }

    
})

prev.addEventListener("click", (e)=>{
    e.preventDefault();

    if (enableClick) {
       
        enableClick = false;
        prevSlide();
    }
})


/*
DOM구조를 변경시키는 코드
부모요소의 안쪽 가장 뒤에 자식요소를 삽입하는 방법
부모요소명.append(자식요소)


부모요소의 안쪽 가장 앞에 자식요소를 삽입하는 방법
부모요소명.prepend(자식요소)


loop 슬라이더의 경우
프레임을 기준으로 양쪽에 적어도 하나이상의 패널이 존재해야 합니다
따라서 적어도 3개의 패널이 있어야 loop가 가능합니다

loop를 시키려면 DOM구조를 변경시켜서
앞의 요소가 뒤로, 뒤의 요소가 앞으로 변경되어야 loop가 가능한데
이렇게 하였을때 DOM의 구조순서를 따라 설정하는 nth의 css코드는 적용할 수가
없습니다. nth로 적용할경우 DOM구조가 변경되면 순서도 변경되어 고유한
스타일이 입혀지는게 아니라 변경되어 순서가 입혀진대로 css가 입혀지는 결과가 발생
            
            &:nth-of-type(1){
                background-color: rgb(137, 238, 238);
            }
            &:nth-of-type(2){
                background-color: rgb(243, 227, 9);
            }

            &:nth-of-type(3){
                background-color: rgb(238, 164, 219);
            }

해결방법 1. 클래스를 매 프레임마다 적용해서 하는 방법,(비추천)
해결방법 2. data속성을 부여하여 적용시키는 방법(추천)
data속성이란??
개발자가 속성값으로 특정 정보를 은닉하는 방법입니다
DOM 요소에는 영향을 주지 않습니다 data-이름자유롭게 작성 ="";
data속성으로 지정하고, 값을 넣은 값은 개발자가 자유롭게 활용이 가능합니다
  

loop 슬라이더의 기본 로직
1. 초기 ul의 위치값을 left, margin-left가 -100%로 설정한다
=> loop가 되려면 반드시 보여지는 패널의 앞뒤에 최소 1개의 패널이 존재해야한다
2. 슬라이드의 기본모션
prev버튼 클릭시 -100% -> 0%
next버튼 클릭시 -100% -> -200%
3. 이동이 끝나고 나서는
앞이나 뒤에 쌓이 패널을 다시 앞으나 뒤로 재배치를 해줘야한다 => loop가 되려면
우리가 보려는 패널이 정상적으로 보이게 됨
4.ul의 초기위치를 항상 다시 -100%로 초기화 한다
*/


function init(){
    ul.style.left = "-100%";
    ul.prepend(ul.lastElementChild);

    //초기 화면이 1번 슬라이드가 올 수 있도록 처음에 맨뒤슬라이드를 
    // prepend로 떼어 내어 앞에 붙인다

    ul.style.width = `${100 * len}%`;

    lis.forEach((el) => {
    el.style.width = `${100 / len}%`
})
}

function nextSlide(){
   
    // ul.style.marginLeft = '-200%'; 
    // ul.append(ul.firstElementChild);
    // ul.style.marginleft = '-100%';
    // //동기적으로 해야한다 => 콜백을 사용해야합니다
   
    new Anim(ul, {
        prop : 'left',
        value : "-200%",
        duration : 1000,

        callback : () => {
            ul.append(ul.firstElementChild);
            ul.style.left = "-100%"
            enableClick = true;
        }
    }) 
    
}


function prevSlide(){
    // ul.style.marginLeft = '0%'; 
    // ul.prepend(ul.lastElementChild); 

    new Anim(ul, {
        prop: 'left',
        value: "0%",
        duration: 1000,
        callback: ()=>{
            
            ul.style.left = "-100%";
            ul.prepend(ul.lastElementChild);
            enableClick = true;
        }
    })
}