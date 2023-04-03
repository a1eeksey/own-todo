<template>
     <div class="background_authoriz">
        <div class="main-content_authoriz">
            <div class="container_authoriz">
                <div class="header-block_authoriz">
                    <img src="@/images-authoriz/primary-logo.svg" alt="">
                    <h2>OwnTodo</h2>
                </div>

                <form :class="$route.params.size === 'mobile' ? 'mobile' : 'pc'" class="form-box_authoriz">
                    <h1>Let us know your name</h1>
                    <!-- INPUTS -->
                    <div @click="clearError" class="inputs_authoriz">
                        <input class="input_authoriz" v-model="userName" type="text" placeholder="My name..." required>
                    </div>
                    
                    <div class="authoriz-btn" :class="this.userName ? 'active' : 'notactive'">
                        <router-link :to="{path: `/todos/${this.userName}`}">
                            <button :disabled="!this.userName">Continue</button>
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: ''
        }
    }
}
</script>

<style scoped>
    .authoriz-btn {
        padding-bottom: 32px;
    }

</style>