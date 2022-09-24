<template>
    <div class="fullCalendarContainer">
        <p>
            <a href="https://fullcalendar.io/docs/events-json-feed" target="_blank">官方教學</a>
            文件寫得蠻清楚的，不過有些功能要收錢的，需要收錢的官網上會說明
        </p>
        <p>
            範例沒有run成功的話，是因為讀不到daygrid和interaction，安裝<b>npm install --save @fullcalendar/daygrid @fullcalendar/interaction</b></p>
        <hr>
        <p>
            1. 週末開關
            <button @click="toggleWeekends">toggle weekends</button>
        </p>
        <p>
            2.選取
            <a href="https://fullcalendar.io/docs/date-clicking-selecting" target="_blank">選取教學</a>
        </p>
        <p>選取的日期：{{selectDate.start}} - {{selectDate.end}}</p>
        <FullCalendar :options="calendarOptions1" />
        <hr>
        <p>3.新增事件：如果要將資料庫資料丟給日曆，可以以此類推</p>
        <label>事件名稱</label><input type="text" v-model="newEvent.title">
        <label>事件日期</label><input type="text" v-model="newEvent.date">
        <button @click="addEvent">新增事件</button>
        <hr>
        <FullCalendar :options="calendarOptions2" />
        <p>點擊的日期：{{clickDate}}</p>

        <ScrollToTopBtn/>
    </div>

</template>

<script>
// import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import ScrollToTopBtn from '@/components/ScrollTo.vue'

// 官方提供範例： https://fullcalendar.io/docs/date-clicking-selecting-demo
export default {
    components: {
        FullCalendar,
        ScrollToTopBtn
    },
    data(){
        return {
            clickDate: '',
            selectDate: {
                start: '',
                end: ''
            },
            newEvent : {
                title: '',
                date: ''
            },
            calendarOptions1: {
                plugins: [ dayGridPlugin, interactionPlugin ],
                // 如果要timeGridWeek,timeGridDay，應該和dayGridMonth做法一樣
                initialView: 'dayGridMonth',
                weekends: false, // 週末要不要出現
                // dateClick: this.handleDateClick,
                selectable: true, //選取功能開啟
                select: this.handleDateSelect,
                unselect: this.handleDateUnselect,

                // dayMaxEvents: true, // 允許 "more" link when too many events
                events: [
                    { title: '露營', date: '2022-09-16',color: 'purple'},
                    { title: '推拿', date: '2022-09-16' }
                ]
            },
            calendarOptions2: {
                plugins: [ dayGridPlugin, interactionPlugin ],
                initialView: 'dayGridMonth',
                weekends: true,
                dateClick: this.handleDateClick,
                dayMaxEvents: true, // 允許 "more" link when too many events
                //https://fullcalendar.io/docs/events-json-feed
                events: {
                    //將檔案放到public中
                    url: '/data/events.json',
                    failure: (e) => {
                        console.log(e);
                        console.log('there was an error while fetching events!');
                    }
                }
            }
        }
    },
    methods: {
        toggleWeekends() {
            this.calendarOptions1.weekends = !this.calendarOptions1.weekends // toggle the boolean!
        },
        handleDateClick(arg) {
            // data是國際日期標準的格式 => 和new Date()一樣
            // this.start = arg.date
            this.clickDate = arg.dateStr
        },
        handleDateSelect(selectionInfo) {
            // console.log(selectionInfo);
            // this.selectDate.start = selectionInfo.start
            this.selectDate.start = selectionInfo.startStr
            // this.selectDate.end  = selectionInfo.end
            this.selectDate.end = selectionInfo.endStr
        },
        handleDateUnselect(){
            this.selectDate.start = ''
            this.selectDate.end = ''
        },
        addEvent(){
            //要驗證newEvent.date，日期格式是否符合yyyy-mm-dd
            this.calendarOptions1.events.push(this.newEvent)
            //清除input
            this.newEvent = {
                title: '',
                date: ''
            }
        },
        loadEvent(){
            // Ajax取的資料，將資料傳進
            //  this.calendarOptions1.events = data
        }
    },
    created(){
        // this.loadEvent()
    }
}
</script>

<style lang="scss">
.fullCalendarContainer{
    position: relative;
    text-align: left;
}
</style>
