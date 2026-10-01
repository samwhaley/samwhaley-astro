<template>
    <form @submit="submitForm" class="form" method="POST" action="/send">
        <div class="form__left">
            <div class="form__group">
                <label class="form__label" for="name">Name:</label>
                <input v-model="name" id="name" class="form__input" type="text" name="entry.1448069049" placeholder="Name">
                <transition name="page">
                    <span v-if="nameError" class="form__error">{{ nameError }}</span>
                </transition>
            </div>
            <div class="form__group">
                <label class="form__label" for="email">Email:</label>
                <input v-model="email" id="email" class="form__input" type="email" name="entry.981010524" placeholder="Email">
                <transition name="page">
                    <span v-if="emailError" class="form__error">{{ emailError }}</span>
                </transition>
            </div>
            <div class="form__send">
                <transition name="fade" mode="out-in">
                    <button v-if="submitting === ''" class="button" type="submit">submit</button>
                    <button v-else-if="submitting === 'sending'" class="button" type="submit">loading</button>
                    <button v-else class="button" type="submit">{{ submitting }}</button>
                </transition>
                <transition name="fade" mode="out-in">
                    <p v-show="sendError">Sorry there was an error. Please try again.</p>
                </transition>
            </div>
        </div>
    </form>
</template>

<script>
import axios from 'axios' 

export default {
    name: 'subscribe',

    data: function () {
        return {
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            message: '',
            messageError: '',
            errors: [],
            success: false,
            submitting: '',
            sendError: false
        }
    },

    methods: {
        validateForm() {
            this.errors = []
            var letters = /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/
            if (!this.name) {
                this.nameError = 'Please add your name.';
                this.errors.push('name');
            } 
            if (this.name.match(letters)) {
            } else {
                this.nameError = 'This isn\'t a name';
                this.errors.push('name');              
            }

            if (!this.email) {
                this.emailError = 'Add your email so I can contact you!';
                this.errors.push('email');
            } else if (!this.validEmail(this.email)) {
                this.emailError = 'I don\'t think this is a real email...';
                this.errors.push('email');
            }
        },

        validEmail(email) {
            var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
            return reg.test(email)
        },

        submitForm(e) {
            this.sendError = false
            this.submitting = 'sending'
            e.preventDefault();
            this.validEmail();
            this.validateForm();
            var vm = this;
            let url = 'https://script.google.com/macros/s/AKfycbzhkhtYZZo3PkIkUp47T7A9o1WqqrdCmlBotNhLFddzILkI6YkG/exec?name=' + this.name + '&email=' + this.email;
            if (this.errors.length == 0) {
                return  axios.get(url
                ).then(function (response) {
                    vm.submitting = 'sent!'
                    vm.name = ''
                    vm.email = ''
                }).catch (error => {
                    this.submitting = ''
                    this.sendError = true
                }); 
            } else {
                this.submitting = ''
            }

        }
    },
}
</script>

<style lang="scss" scoped>
	.form {
	    font-family: $fontSecondary;
	    font-size: 1.2rem;
	    width: 100%;

	    &__left {
	        align-items: center;
	        box-sizing: border-box;
	        display: flex;
	        flex-wrap: wrap;
	        justify-content: space-around;
	        padding: 10px 0 10px 0rem;
	        width: 100%;

	        @media #{$phone} {
	            flex-wrap: wrap;
	            padding: 10px 0 10px 0;
	        }

	        @media #{$smallPhone} {
	            margin-left: 0;
	        }
	    }

	    &__group {
	        align-items: flex-start;
	        display: flex;
            flex-wrap: wrap;
	        justify-content: flex-start;
	        margin-bottom: 1.5rem;
	        width: 50%;

	        @media #{$phone} {
	            width: 100%;
	        }
	    }

	    &__input {
	        border: none;
	        border-bottom: 3px solid $primary;
	        box-shadow: none;
	        flex-grow: 2;
	        font-family: $fontPrimary;
	        font-size: 1rem;
	        font-weight: 400;
	        margin-bottom: 0.5rem;
	        margin-right: 2rem;
	        width: auto;

	        @media (max-width: 575px) {
	            // width: 100%;
	        }
	    }

	    &__label {
	        font-size: 1rem;
	        margin-right: 1rem;
            padding-top: 2px;

	    }

	    &__error {
            font-size: 0.8rem;
	        font-style: italic;
	        margin-left: 4rem;
	        min-height: 1rem;
	        padding-right: 10px;
	        text-align: left;
            width: 100%;
	    }

        &__send {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

	    button {
            cursor: pointer;
	        font-size: 1.6rem;
	        margin-left: 2.5rem;
	        margin-top: 0;
	        position: relative;
	        margin: auto;

            transform: scale(0.7);

            &:hover {
                transform: scale(0.7);
            }
	        
	    }
	}
</style>
