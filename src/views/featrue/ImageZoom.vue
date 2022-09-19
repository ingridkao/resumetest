<template>
    <p>參考
        <a href="https://www.w3schools.com/howto/howto_js_image_zoom.asp" target="_blank">w3schools</a> | 
        <a href="https://codepen.io/creme/pen/gOYrvxM?editors=1010" target="_blank">codepan範例-這個做比較精緻但有點麻煩轉換成vue</a>
    </p>
    <!-- 
        <p>滑鼠位置：x: {{xPos}}y: {{yPos}}</p>
        <p>img：長: {{imageW}}寬: {{imageH}}</p>
        <p>放大鏡：長: {{zoomSizeW}}寬: {{zoomSizeH}}</p>
        <p>比例：zoomRatioW: {{zoomRatioW}}zoomRatioH: {{zoomRatioH}}</p> 
    -->

    <p>Mouse over the image:</p>
    <div class="img-zoom-container"
        :style="mainBoxSize"
    >
        <div class="img-zoom-lens"
            :style="lensStyle"
        />
        <img
            :src="imgURL"
            :style="mainBoxSize"
            @mousemove="cursorMouseMove"
        />
    </div>

    <p>Zoom Preview:</p>
    <div 
        class="img-zoom-result"
        :style="{
            ...resultImageSize,
            ...resultImagePosition
        }"
    />
</template>

<script>
//圖片寬高
const w = 640
const h = 320
export default {
    data(){
        return {
            imgURL: `https://picsum.photos/${w}/${h}`,
            imageW: w/2,
            imageH: h/2,
            zoomSizeW: w/8,
            zoomSizeH: h/8,
            zoomRatioW: 0,
            zoomRatioH: 0,
            zoomRatio: 5,
            xPos: 0,
            yPos: 0
        }
    },
    computed:{
        mainBoxSize(){
            //圖片寬高並置中
            return {
                width: `${this.imageW}px`,
                height: `${this.imageH}px`,
                margin: '0 auto'
            }
        },
        lensStyle(){
            //放大鏡的長寬和位置
            return {
                width: `${this.zoomSizeW}px`,
                height: `${this.zoomSizeH}px`,
                top: `${this.yPos}px`,
                left: `${this.xPos}px`
            }
        },
        resultImageSize(){
            /* 計算放大鏡結果的長寬比例 */
            this.zoomRatioW = parseFloat((this.imageW / this.zoomSizeW).toFixed(1))
            this.zoomRatioH = parseFloat((this.imageH / this.zoomSizeH).toFixed(1))
            return {
                ...this.mainBoxSize,
                'background-image': `url(${this.imgURL})`,
                'background-size': `${this.imageW*this.zoomRatioW}px ${this.imageH*this.zoomRatioH}px`
            }
        },
        resultImagePosition(){
            // 放大鏡結果的相對位置：尺寸＊長寬比例
            // 觀察範例發現要負值
            return {
                'background-position-x': `-${this.xPos*this.zoomRatioW}px`,
                'background-position-y': `-${this.yPos*this.zoomRatioH}px`
            }
        }
    },
    methods:{
        cursorMouseMove(event){
            // 滑鼠在img裡的位置offsetX及offsetY
            // 讓滑鼠的位置位於放大鏡的中間得到x和y
            const x = event.offsetX - this.zoomSizeW/2
            const y = event.offsetY -  this.zoomSizeH/2
    
            //判斷式：解釋
            if(x < 0){
                // 滑鼠位置左側超出放大鏡範圍，等於放大鏡最左邊
                this.xPos = 0
            }else if(x+this.zoomSizeW > this.imageW){
                // 放大鏡最右側超出縮圖範圍，等於縮圖寬度減放大鏡寬度
                this.xPos = this.imageW - this.zoomSizeW
            }else{
                this.xPos = x
            }
            if(y < 0){
                // 滑鼠位置頂端超出放大鏡範圍，等於放大鏡頂端
                this.yPos = 0
            }else if(y+this.zoomSizeH> this.imageH){
                // 放大鏡最下方超出縮圖範圍，等於縮圖高度減放大鏡高度
                this.yPos = this.imageH - this.zoomSizeH
            }else{
                this.yPos = y
            } 
        }
    }
}

function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /* Create lens: */
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /* Insert lens: */
  img.parentElement.insertBefore(lens, img);
  /* Calculate the ratio between result DIV and lens: */
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /* Set background properties for the result DIV */
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /* Execute a function when someone moves the cursor over the image, or the lens: */
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /* And also for touch screens: */
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    /* Calculate the position of the lens: */
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /* Prevent the lens from being positioned outside the image: */
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /* Set the position of the lens: */
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /* Display what the lens "sees": */
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}



</script>


<style lang="scss">
.img-zoom-container {
    position: relative;
    overflow: auto;
    border: 1px solid rgb(77, 65, 131);
    .img-zoom-lens {
        position: absolute;
        border: 1px solid #365f72;
        //讓div穿透
        pointer-events: none;
    }
}
.img-zoom-result {
    border: 1px solid #20703b;
    background-repeat: no-repeat;
}
</style>