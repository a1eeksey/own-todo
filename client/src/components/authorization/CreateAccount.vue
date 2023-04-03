<template>
    <div class="background_authoriz">
        <div class="main-content_authoriz">
            <div class="container_authoriz">
                <div class="header-block_authoriz">
                    <img src="@/images-authoriz/primary-logo.svg">
                    <h2>OwnTodo</h2>
                </div>

                <form :class="this.windowIsSmall === 'mobile' ? 'mobile' : 'pc'" @submit.prevent="handleSubmit(this.userEmail, this.userPass, this.userPass2)" class="form-box_authoriz">
                    <h1>Create an account</h1>
                    <!-- INPUTS -->
                    <div class="inputs_authoriz">
                        <div v-if="this.isEmailTouched || this.isPassTouched" @click="this.isBackground = true" class="background"></div>
                        <input @click="this.isBackground = false" class="input_authoriz" :class="{error: this.isEmailError}" @blur="isEmailTouched = true" v-model="userEmail" type="email" placeholder="Email" required>

                        <input @click="this.isBackground = false" class="input_authoriz without-top-border" :class="{error: this.isPassError }" @blur="isPassTouched = true" v-model="userPass" type="password" placeholder="Password" required>
                        
                        <input @click="this.isBackground = false" class="input_authoriz without-top-border" :class="{error: passInvalid}" @blur="isPass2Touched = true" v-model="userPass2" type="password" placeholder="Password" required>
                    </div>
                    
                    <div class="authoriz-btn" :class="this.userEmail && this.userPass ? 'active' : 'notactive'">
                        <button type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
        return {
            /* parameter for different showing on mobile and pc device */
            windowIsSmall: 'pc',
            /* if field was touched */
            isEmailTouched: false,
            isPassTouched: false,
            isPass2Touched: false,
            /* email and password value */
            userEmail: '',
            userPass: '',
            userPass2: '',
            // background
            isBackground: false
        }
    },
    /* created and destroyed are for mobile version */
    created() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.onResize)
    },
    computed: {
        /* email validation */
        isEmailValid() {
            return 
        },
        isEmailError() {
          return this.userEmail && !this.isEmailValid && this.isEmailTouched && this.isBackground;
        },
        /* password validation */
        
        isPassValid() {
            return this.userPass.length >= 6
        },
        isPassError() {
          return this.userPass && !this.isPassValid && this.isPassTouched && this.isBackground;
        },
    },
    methods: {
        onResize() {
            this.windowIsSmall = window.innerWidth <= 767 ? 'mobile' : 'pc';
        },
        async handleSubmit(email, pass, pass2) {
            if (pass === pass2) {
                try {
                    await axios.post('http://localhost:3000/sign_up', {
                        email,
                        password: pass
                    }).then((res) => {
                        // login state in vuex = true
                        this.$store.commit('loginSuccess')
                        if (this.windowIsSmall === 'pc') {
                            this.$router.push('/your-name/pc')
                        } else {
                            this.$router.push('/your-name/mobile')
                        }
                    })
                } catch(err) {
                    alert(err.response.data);
                }
            }
        }
    },
}
</script>

<style scoped>
  .authoriz-btn {
    padding-bottom: 16px;
  }
</style>