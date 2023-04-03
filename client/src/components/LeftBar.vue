<template>
        <div class="content" v-if="this.$store.state.loggedIn">
        <div :class="{mobile: (!this.showRightPart || this.showLeftPart), notvisible: (this.showRightPart || !this.showLeftPart), pc: (!this.windowIsSmall)}" class="container">
    <div class="main-lists_block">
        <div @click="getSelectedListValue({title: 'All notes', id: Math.random(), userEmail: this.$store.state.userEmail}), goToNotes()" class="list-item">
            <img src="../icons/house.svg" alt="">
            <h3>All notes</h3>
            <span :class="this.todosCount !== 0 ? 'color' : 'nocolor'" class="counter">{{ todosCount }}</span>
        </div>
        <div class="list-item">
            <img src="../icons/important.svg" alt="">
            <h3>Important</h3>
            <span :class="this.importantTodosCount !== 0 ? 'color' : 'nocolor'" class="counter">{{ importantTodosCount }}</span>
        </div>
    </div>

    <div class="divider"></div>

    <div class="personal-lists_block">
        <!--add list-->
        <div v-if="inputField" @keyup.enter="addList" class="input-field_lists">
            <img src="../icons/list.svg" alt="">
            <input v-model="listValue" type="text">
        </div>
        <!--personal lists-->
        <div class="personal-list-items">
            <div @click="getSelectedListValue(list), goToNotes()" v-for="list in lists" :key="list.id" class="list-item">
                <img src="../icons/list.svg">
                <h3 ref="thisListTitle">{{ list.title?.length > 16 ? `${list.title.slice(0, 12)}...` : list.title}}</h3>
                <span :class="this.personalTodosCount.filter(todo => todo.familyList == list.title).length !== 0 ? 'color' : 'nocolor'" class="counter">{{ personalTodosCount.filter(todo => todo.familyList == list.title).length }}</span>
            </div>
        </div>
        <!--add list button-->
        <div @click="this.inputField = !this.inputField" class="add-list">
            <img src="../icons/plus.svg" alt="">
            <h3>Add New List</h3>
        </div>
    </div>

    <div class="footer-block">
        <!-- <div class="footer-block-content"></div> -->
        <div class="divider"></div>
        <div>
            <img src="../icons/primary-logo.svg">
            <h3>OwnTodo</h3>
        </div>
    </div>
  </div>
  <!--notes-->
    <div :class="(!windowIsSmall || !this.showLeftPart || this.showRightPart) ? 'mobile' : 'notvisible'" class="right-part">
        <RightUpperBar @updateParentShowing="onUpdateChildShowing" :windowIsSmall="this.windowIsSmall" :userName="$route.params.name" :selectedList="selectedList"/>
        <RightBar :windowIsSmall="this.windowIsSmall" @updateTodosArray="onUpdateTodosArray" @updateParentTodos="onUpdateChildTodos" @updateParentImportant="onUpdateChildImportant" :selectedList="selectedList"/>
    </div>
    </div>
</template>

<script>
import axios from 'axios'

import RightBar from './RightBar.vue'
import RightUpperBar from './RightUpperBar.vue'
export default {
    components: {
        RightUpperBar, RightBar
    },
    data() {
        return {
            windowIsSmall: false,
            /* visible (for mobile) */
            showRightPart: false,
            showLeftPart: true,
            /* lists array */
            lists: [],
            /* show input field */
            inputField: false,
            allListsCounter: []
        }
    },
    /* mobile version */
    created() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.onResize)
    },
    async mounted() {
        const response = await axios.get('http://localhost:3000/get_lists')
        const allLists = response.data
        this.$store.commit('setLists', allLists.filter(list => list.userEmail == this.$store.state.userEmail))
    },
    computed:{
        lists: function() {
            return this.$store.state.lists
        },
        todosCount: function() {
            return this.$store.state.todos.length
        },
        importantTodosCount: function() {
            return this.$store.state.todos.filter(todo => todo.statusImportant == true).length
        },
        personalTodosCount: function() {
            return this.$store.state.todos
        }
    },
    methods: {
        onResize() {
            this.windowIsSmall = window.innerWidth <= 767;
        },
        goToNotes() {
            if (this.windowIsSmall) {
                this.showRightPart = true
                this.showLeftPart = false
            }
        },
        async addList() {
            // if(!this.listValue) return
            const newList = {
                title: this.listValue,
                id: Math.random(),
                userEmail: this.$store.state.userEmail
            }

            // отправка раздела на сервер
            const response = await axios.post('http://localhost:3000/lists', newList)
            this.lists.push(response.data)
            console.log(response.data);
            this.$store.commit('addList', response.data)
            /* clear input field */
            this.listValue = ''
            /* close input field */
            this.inputField = false
        },
        getSelectedListValue(list) {
            this.$store.commit('setSelectedList', list)
        },
        /* emitting */
        onUpdateChildShowing(data) {
            this.showLeftPart = data.showLeftPart
            this.showRightPart = false
        },
        onUpdateChildTodos(data) {
            this.TodosLength = data.todosLength
        },
        onUpdateChildImportant(data) {
            this.importantTodosLength = data.importantTodosLength
        },
    }
}
</script>

<style>
@import url(../assets/reset.css);
 
.content {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    /* right part */
    .right-part {
        width: 100%;
    }

    .right-part.notvisible {
        display: none;
    }

    .right-part.mobile {
        display: block;
        margin-left: 40px;
    }

    /* left part */

    .container {
        background: #fff;
        margin: 40px;
        width: 240px;
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    .footer-block {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 64px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .footer-block div {
        display: flex;
        justify-content: center;
    }

    .footer-block img {
        margin-right: 12px;
    }

    .footer-block h3 {
        font-size: 16px;
    }

    /* I agree that it's govno but it's working  */
    .container.mobile.pc {
        width: 240px;
        margin: 40px 0 40px 40px;
    }
    .container.pc.notvisible {
        display: block;
        width: 240px;
        margin: 40px 0 40px 40px;
    }

    /* here is norm */
    .container.notvisible {
        display: none;
    }

    .container.mobile {
        width: 480px;
        margin-right: 40px;
    }

    .container.mobile .list-item h3, .container.mobile input{
        font-size: 16px;
    }

    .container.pc .list-item h3, .container.pc input{
        font-size: 12px;
    }

    .main-lists_block {
        margin: 12px 0;
    }

    /* styles for list item */
    .list-item {
        cursor: pointer;
        margin: 0 12px;
        width: 216px;
        height: 40px;
        display: flex;
        align-items: center;
        position: relative;
        border-radius: 4px;
        margin-bottom: 4px;
    }

    .list-item:last-child {
        margin-bottom: 12px;
    }

    .list-item:hover{
        background: #eee;
        transition: 0.2s all;
    }

    .list-item img {
        height: 32px;
        width: 32px;
        margin: 0 8px;
    }

    .list-item h3 {
        width: 133px;
        text-align: left;
        font-weight: 600;
    }

    .list-item span {
        margin: 0 8px;
    }

    .counter {
        background: #ECF2FA;
        border-radius: 4px;
        padding: 4px 8px;
        gap: 10px;
        text-align: center;
        font-weight: 700;
    }
    .counter.nocolor {
        opacity: 0.3;
    }

    .counter.color {
        opacity: 1;
        color: #4983DD;
    }

    h3 {
        font-size: 12px;
        line-height: 32px;
        font-style: normal;
        font-weight: 600;
        color: #393939;
    }

    .divider {
        margin-bottom: 12px;
        width: 100%;
        background: #ECF2FA;
        height: 1px;
    }

    .add-list {
        display: flex;
        align-items: center;
        width: 216px;
        height: 40px;
        margin: 0 12px;
        cursor: pointer;
    }

    .add-list h3 {
        font-weight: 600;
        line-height: 32px;
        color: #4983DD;
        font-size: 12px;
    }

    .add-list img {
        height: 32px;
        width: 32px;
        margin: 0 4px 0 8px;
    }

    /* personal lists */

    .input-field_lists {
        margin: 0 12px 4px;
        display: flex;
        align-items: center;
        max-width: 216px;
        height: 32px;
        border: 2px solid rgba(66, 121, 205, 0.2);
        border-radius: 4px;
        background: rgba(66, 121, 205, 0.1);
    }

    .input-field_lists img {
        margin-left: 6px;
        width: 32px;
        height: 32px;
    }

    input{
        outline: 0;
        border: none;
        background: none;
    }
    
    
</style>