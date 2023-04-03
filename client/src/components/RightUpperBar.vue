<template>
  <div :class="windowIsSmall ? 'mobile' : 'pc'" class="upper-bar">
    <div class="lists-navigation">
        <div @click="goToLists" v-if="windowIsSmall" class="back-to-lists"><img src="../icons/enter.svg" alt=""></div>
        <!-- slice text if there are more than (window.innerWidth / 100%) * 5% characters -->
        <h1 class="list-name">{{ this.$store.state.selectedList.title ?.length > (this.windowWidth * 0.05) ? `${this.$store.state.selectedList.title.slice(0, this.windowWidth * 0.05)}...` : this.$store.state.selectedList.title }}</h1>
        <input @click="removeList(this.$store.state.selectedList)" v-if="this.$store.state.selectedList.title != 'All notes'" readonly class="delete-checkbox-upper-bar">
    </div>
    <div class="user-navigation">
        <div class="user-name">
            <img src="../icons/user.svg">
            <h3>{{ userName }}</h3>
        </div>
        <button @click="logout">LOG OUT</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['userName', 'windowIsSmall'],
    data() {
        return {
            windowWidth: window.innerWidth,
            showLeftPart: false,
        }
    },

    methods: {
        async removeList(list) {
            console.log(list._id);
            await axios.delete(`http://localhost:3000/lists/${list._id}`, list._id)
            this.$store.commit('deleteList', list._id)
            this.$store.commit('setSelectedList', { title: 'All notes',
            id: Math.random() })
        },
        goToLists() {
            this.showLeftPart = true
            this.$emit('updateParentShowing', {
                showLeftPart: this.showLeftPart
            })
        },
        logout() {
            this.$store.commit('logout')
            this.$router.push('/')
        }
    },  

    mounted() {
        window.addEventListener('resize', function() {
            this.windowWidth = window.innerWidth;
            console.log(windowWidth * 0.05);
        })
    },
}
</script>

<style>

    .delete-checkbox-upper-bar {
        margin: 0 8px;
        background: url("@/icons/blue-remove.svg") no-repeat;
        background-size: 24px;
    }
    .delete-checkbox-upper-bar:hover {
        margin: 0 8px;
        background: url("@/icons/remove-red.svg") no-repeat;
        background-size: 24px;
    }
    
    .upper-bar {
        height: 32px;
        margin: 40px 40px 24px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .lists-navigation {
        display: flex;
        align-items: center;
    }

    .lists-navigation div {
        margin-right: 4px;
    }

    .user-name h3 {
        font-weight: 700;
        font-size: 12px;
    }

    .user-navigation {
        display: flex;
        align-items: center
    }

    .list-name {
        font-weight: 700;
        font-size: 22px;
    }

    .user-name {
        display: flex;
        align-items: center;
        margin-right: 24px;
    }

    .upper-bar.mobile .user-name {
        margin-right: 12px;
    }

    .upper-bar.mobile .user-name h3 {
        font-size: 16px;
    }

    .user-name img {
        margin-right: 4px;
    }

    button {
        border: none;
        width: 78px;
        background: #4279CD;
        border-radius: 4px;
        height: 32px;
        color: #fff;
        font-weight: 700;
        font-size: 12px;
    }
</style>