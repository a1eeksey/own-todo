<template>
    <div class="background_authoriz">
        <div class="main-content_authoriz">
            <div class="container_authoriz">
                <div class="header-block_authoriz">
                    <img src="@/images-authoriz/primary-logo.svg">
                    <h2>OwnTodo</h2>
                </div>

                <form :class="this.windowIsSmall === 'mobile' ? 'mobile' : 'pc'" @submit.prevent="handleSubmit()" class="form-box_authoriz">
                    <h1>Login to Account</h1>
                    <!-- INPUTS -->
                    <div class="inputs_authoriz">
                        <div v-if="this.isEmailTouched || this.isPassTouched" @click="this.isBackground = true" class="background"></div>

                        <input @click="this.isBackground = false" class="input_authoriz" :class="{error: this.isEmailError}" @blur="isEmailTouched = true" v-model="userEmail" type="email" placeholder="Email" required>

                        <input @click="this.isBackground = false" class="input_authoriz" :class="{error: this.isPassError}" @blur="isPassTouched = true" v-model="userPass" type="password" placeholder="Password" required>
                    </div>
                    
                    <div class="authoriz-btn" :class="this.userEmail && this.userPass ? 'active' : 'notactive'">
                        <button type="submit">Log In</button>
                    </div>

                    <h3 class="forgot-pass_authoriz">
                        <a href="#">Forgot your password?</a>
                    </h3>
                </form>

                <div class="no-acc">
                    <h3>Don’t have an account?</h3>
                    <router-link :to="{path: `/create-account/${windowIsSmall}`}">
                        <h3><a href="#">Create Now!</a></h3>
                    </router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            /* parameter for different showing on mobile and pc device */
            windowIsSmall: 'pc',
            /* if field was touched */
            isEmailTouched: false,
            isPassTouched: false,
            /* email and password value */
            userEmail: '',
            userPass: '',
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
            return this.userEmail.includes('@') && this.userEmail.includes('.')
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
        // on click on login button
        async handleSubmit() {
            try {
                // post email and password to server
                await axios.post('http://localhost:3000/log_in', {
                        email: this.userEmail,
                        password: this.userPass
                    // if success
                    }).then((res) => {
                        // login state in vuex = true
                        this.$store.commit('loginSuccess')
                        this.$store.commit('setUser', this.userEmail)
                        // if window is large, go to pc version
                        if (this.windowIsSmall === 'pc') {
                            this.$router.push('/your-name/pc')
                        // if window is small, go to mobile version
                        } else {
                            this.$router.push('/your-name/mobile')
                        }
                    })
            } catch (err) {
                // catch message error from server
                alert(err.response.data);
            }
        }
    },
}
</script>

<style>
.background_authoriz {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #ECF2FA;
}

section,
.active-form {
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-content_authoriz {
    margin: 0 auto;
    width: 575px;
    height: 490px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(../../images-authoriz/bg-image.png);
    background-repeat: no-repeat;
}

.container_authoriz {
    max-width: 360px;
    margin: 0 auto;
    padding: 10px;
    background: none;
    height: auto;
}

.header-block_authoriz {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.header-block_authoriz h2 {
    margin: 0 12px;
    font-size: 16px;
    color: #393939;
}


/* FORM BOX */

button,a {
    z-index: 999;
}

.forgot-pass_authoriz {
    text-align: center;
    height: 32px;
    padding-bottom: 24px;
    font-weight: 700;
    font-size: 14px;
}

.form-box_authoriz {
    width: 360px;
    margin: 24px 0;
    background-color: #fff;
    border-radius: 8px;
}

.form-box_authoriz h1 {
    padding-top: 24px;
    font-size: 22px;
    height: 32px;
    text-align: center;
    color: #393939;
}

.inputs_authoriz {
    width: 292px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px 10px 16px;
}

.inputs_authoriz input {
    z-index: 999;
    height: 48px;
    width: 250px;
    cursor: text;
    border: 1px solid #ECF2FA;
    color: #393939;
    padding-left: 40px;
}

.inputs_authoriz input.not-error {
    border: 1px solid #ECF2FA;
    color: #393939;
}

.inputs_authoriz input[type=email] {
    border-radius: 4px 4px 0px 0px;
    background: url(../../images-authoriz/email.svg);
    background-repeat: no-repeat;
    background-position: 4px;
}

.inputs_authoriz input[type=text] {
    border-radius: 4px 4px 0px 0px;
    background: url(../../images-authoriz/email.svg);
    background-repeat: no-repeat;
    background-position: 4px;
}

.inputs_authoriz input[type=password] {
    border-radius: 0px 0px 4px 4px;
    background: url(../../images-authoriz/lock.svg);
    background-repeat: no-repeat;
    background-position: 4px;
    border-top: none;
}

.inputs_authoriz input[type=password].error {
    border-top: none;
}

.inputs_authoriz input:focus {
    background-color: #EDF3FC;
    border: 1px solid #4983DD;
}

.inputs_authoriz input.error {
    background-color: rgba(205, 66, 66, 0.1);
    border: 1px solid rgba(205, 66, 66, 0.5);
}

.authoriz-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
}

.authoriz-btn button {
    width: 296px;
    height: 48px;
    font-weight: 700;
    font-size: 14px;
    border-radius: 4px;
    background: #4983DD;
    color: #fff;
    opacity: 0.5;
    cursor: auto;    
}

.authoriz-btn.active button {
    opacity: 1;
    cursor: pointer;
}

/* IF NO ACCOUNT */

.no-acc {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    font-size: 14px;
}

.no-acc h3 {
    font-weight: 400;
}

.no-acc h3 a {
    margin: 0 8px;
    font-weight: 700;
}

.preheader-text {
    max-width: 280px;
    margin: 0 auto;
    padding-top: 10px;
    height: 24px;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
}

.preheader-text h3 {
    color: rgba(57, 57, 57, 0.8);
}

.preheader-text_step {
    margin: 0 8px;
    font-weight: 700;
}

.form-box_authoriz.mobile input {
    font-size: 16px;
}

</style>