
<!-- this component isn't in use!! -->

<template>
    <div class="background_authoriz">
        <div class="main-content_authoriz">
            <div class="container_authoriz">
                <div class="header-block_authoriz">
                    <img src="@/images-authoriz/primary-logo.svg" alt="">
                    <h2>OwnTodo</h2>
                </div>

                <form @submit.prevent="checkError" :class="$route.params.size === 'mobile' ? 'mobile' : 'pc'" class="form-box_authoriz">
                    <h1>Create an Account</h1>
                    <div class="preheader-text">
                        <h3 class="preheader-text_step">Step 2/3:</h3>
                        <h3>Type in a pin code from mail box</h3>
                    </div>
                    <!-- INPUTS -->
                    <div class="inputs_authoriz">
                        <div v-if="this.isCodeTouched" @click="this.isBackground = true" class="background"></div>
                        <input @click="this.isBackground = false" v-model="userCode" :class="{error: this.userCodeError}" @blur="isCodeTouched = true" type="text" placeholder="Pin Code">
                    </div>

                    <div :class="this.userCode ? 'active' : 'notactive'" class="authoriz-btn">
                        <button type="submit">Next</button>
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
            userCode: '',
            isCodeTouched: false,
            // background
            isBackground: false
        }
    },
    methods: {
        checkError() {
            if (!this.userCodeValid) {
                return;
            }
            if (this.$route.params.size === 'pc') {
                this.$router.push('/your-name/pc')
            } else {
                this.$router.push('/your-name/mobile')
            }
        }
    },
    computed: {
        /* code validation */

        userCodeValid() {
            return this.userCode.length > 0
        },
        userCodeError() {
        // have to add a property to show error
          return this.isBackground && !this.userCodeValid && this.isCodTouched;
        },
    }
}
</script>

<style scoped>
.form-box_authoriz {
    height: 256px;
}
.authoriz-btn {
    padding-bottom: 32px;
 }
</style>