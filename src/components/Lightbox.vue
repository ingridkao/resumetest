<template>
    <div class="lightbox">
        <div class="modal-mask" :style="modalStyle">
            <!--.self 只有觸發此 DOM 元素本身才會觸發 self 事件。-->
            <div class="modal-container" @click.self="toggleModal">
                <div>
                    <div class="modal-body">
                        <header>
                            <slot name="header"></slot>
                        </header>
                        <hr>
                        <main>
                            <slot></slot>
                        </main>
                        <hr>
                        <footer>
                            <slot name="footer"></slot>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
        <button @click="isShow = true">Click Me</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isShow: false 
        }
    },
    computed: { 
        modalStyle() { 
            return { 
                'display': this.isShow ? '' : 'none' 
            }
        }
    }, 
    methods: { 
        toggleModal() { 
            this.isShow = !this.isShow
        } 
    }
}
</script>

<style lang="scss">
    
.lightbox {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    .modal-mask {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: table;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
    }
    .modal-container {
        cursor: pointer;
        display: table-cell;
        vertical-align: middle;
        .modal-body {
            cursor: auto;
            display: block;
            width: 50%;
            margin: 0 auto;
            padding: 2rem;
            background-color: #fff;
        }
    }
}
</style>