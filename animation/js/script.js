class Parallax {
    constructor (obj) {
        this.clouds = document.querySelectorAll(obj.clouds);
        this.boat = document.querySelector(obj.boat);
        this.background = document.querySelector(obj.background);
        window.addEventListener('scroll', ()=>{this.moveElements()})
    }
    moveElements(){
        // console.log(window.scrollY);
        this.boat.style.transform = `translateX(${window.scrollY}px)`;
        this.background.style.objectPosition = `0 ${50 + window.scrollY / 10}%`;
        this.clouds.forEach((val)=>{
            let speed = val.getAttribute('data-speed')
            val.style.transform = `translateX(${window.scrollY * speed}px)`;
        })
    }
}

const parallax = new Parallax({
    clouds: '.header__cloud',
    boat: '.header__boat',
    background: '.header__fantasy'
})

class Text {
    constructor(obj){
        if (typeof obj.title == 'string') {
            this.title = document.querySelector(obj.title);
        }
        else if(obj.title instanceof HTMLElement){
            this.title = obj.title
        }
        this.fullText = this.title.innerHTML;
        this.title.innerHTML = '';
        this.str()
    }

    str(x =0){
        this.title.innerHTML += this.fullText[x]
        x++;
        if (x < this.fullText.length) {
            setTimeout(() => {
            this.str(x)
            }, 200);            
        }
    }
}

let a = document.querySelector('.header__title');

const text = new Text({
    // title: '.header__title'
    title: a
})

// console.log(text);

class ParallaxMove{
    constructor(obj){
    this.moveEl = document.querySelectorAll(obj.moveEl);
    window.addEventListener('mousemove', (e)=> {
        this.moveItems(e)
    })
    }
    moveItems(e){
        this.moveEl.forEach((val)=>{
            const speed = val.getAttribute('data-speed');
            let x = e.x / 100 * speed;
            let y = e.y / 100 * speed;
            val.style.transform = `translate(${x}px, ${y}px)`;
            // console.log(speed);
        })
    }
}

const parallaxMove = new ParallaxMove({
    moveEl: '.parallax__ball'
})

class Timer {
    constructor(obj){
        this.nums = document.querySelectorAll(obj.num);
        this.section = document.querySelector(obj.section);
        this.state = true;
        this.nums.forEach((val)=>{
            val.innerHTML = 0;
        })
        window.addEventListener("scroll", ()=>{this.scrollTimer()})
    }
    setTimer(){
        this.nums.forEach((val)=>{
            let count = +val.getAttribute('data-num');
            function rec(k=0){
                    val.innerHTML = k;
                    k++;
                    if (k<= count) {
                    setTimeout(()=>{
                        rec(k)
                    }, 10) 
                }
                
            }
            rec ()
        })
    }
    scrollTimer(){
        let scrollTop = window.scrollY + window.innerHeight - this.section.offsetHeight /2
        if (this.section.offsetTop <= scrollTop && this.state) {
            this.setTimer();
            this.state = false;
        }
    }
}

const timer = new Timer({
    num: '.timer__num',
    section: '.timer'
})

class Bubble {
    constructor (obj) {
        this.link = document.querySelectorAll(obj.link);
        this.link.forEach((val)=>{
            val.addEventListener('mousemove', (e)=>{
                this.bubbleShow(e, val)
            })
        })
    }
    bubbleShow(e, btn){
        let x = e.pageX - btn.offsetLeft;
        let y = e.pageY - btn.offsetTop;
        const span = btn.querySelector('span');
        span.style.left = x + 'px';
        span.style.top = y + 'px';
    }
}

const bubble =new Bubble ({
    link: '.timer__btn'
})

class Scroll {
    constructor(obj){
        this.section = document.querySelectorAll(obj.section);
        window.addEventListener('scroll', ()=>{
            this.section.forEach((val)=>{
                this.fadeAnim(val)
            })
        })
    }
    fadeAnim(sec){
        const cards = sec.querySelectorAll('.fade-right');
        let scrollTop = window.scrollY + window.innerHeight - sec.offsetHeight / 2
        cards.forEach ((val)=>{
            let speed = val.getAttribute('data-speed');
            val.style.transition = `${speed}ms`;
            if (scrollTop >= sec.offsetTop) {
                val.classList.add('active');
            } else {
                val.classList.remove('active');
            }
        })
    }
}

const scroll = new Scroll({ section: '.scroll'})
console.log(scroll);

class Rotate3D {
    constructor (obj) {
        this.card = document.querySelectorAll(obj.card);
        this.card.forEach ((val)=>{
            val.addEventListener('mousemove', (e)=>{
                this.rotate(val, e)
            })
            val.addEventListener('mouseout', ()=>{
                this.rorateNone(val)
            })
        })
    }
    rotate(elem, e){
        const cardItem = elem.querySelector('.card__item');
        let halfHight = cardItem.offsetHeight /2;
        let rorateX = (halfHight - e.offsetY) / halfHight * 30;
        let halfWidth = cardItem.offsetWidth /2;
        let rorateY = (halfWidth - e.offsetX) / halfWidth * 30;
        cardItem.style.transform = `rotateX(${rorateX}deg) rotateY(${-rorateY}deg)`;
    }
    rorateNone(elem){
        const cardItem = elem.querySelector('.card__item');
        cardItem.style.transform = `rorate(0)`
    }
}

const rotate3D = new Rotate3D({
    card: '.card',
})
console.log(rotate3D);
