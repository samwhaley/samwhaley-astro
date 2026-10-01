<template>
    <form @submit="submitForm" class="form" method="POST" action="/sent">
        <div class="form__left">
            <div class="form__group">
                <label class="form__label" for="name">Name:</label>
                <input v-model="name" class="form__input" type="text" name="name" placeholder="Name">
                <transition name="fade">
                    <span v-if="nameError" class="form__error">{{ nameError }}</span>
                </transition>
            </div>
            <div class="form__group">
                <label class="form__label" for="email">Email:</label>
                <input v-model="email" class="form__input" type="email" name="email" placeholder="Email">
                <transition name="fade">
                    <span v-if="emailError" class="form__error">{{ emailError }}</span>
                </transition>
            </div>
            <div class="form__group">
                <label class="form__label" for="message">Message:</label>
                <textarea v-model="message" class="form__textarea" name="message" id="message" placeholder="<!--Insert message here -->" @keydown='textAreaResize()'></textarea>
                <transition name="fade">
                    <span v-if="messageError" class="form__error">{{ messageError }}</span>
                </transition>
            </div>
            <button class="button" type="submit">{{ sendProcess }}</button>                          
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
            sendProcess: 'submit'
        }
    },

    methods: {
        textAreaResize() {
            const message = document.getElementById('message')
            message.style.height = ""; 
            message.style.height = message.scrollHeight + "px";
        },
        validateForm() {
            this.success = false
            this.errors = []
            if (!this.name) {
                this.nameError = 'Please add your name.';
                this.errors.push('name');
            }
            if (!this.email) {
                this.emailError = 'Add your email so I can contact you!';
                this.errors.push('email');
            } else if (!this.validEmail(this.email)) {
                this.emailError = 'I don\'t think this is a real email...';
                this.errors.push('email');
            }
            if (!this.message) {
                this.messageError = 'What\'s your cool idea?'
                this.errors.push('message');
            }
        },

        validEmail(email) {
            var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
            return reg.test(email)
        },

        submitForm(e) {
            this.sendProcess = 'sending'
            e.preventDefault();
            this.validEmail();
            this.validateForm();
            var vm = this;
            if (this.errors.length == 0) {
                return  axios.post('/api/contact', {
                    'name': this.name,
                    'email': this.email,
                    'message': this.message
                }).then(function (response) {
                    vm.sendProcess = 'sent!'
                    vm.name = ''
                    vm.email = ''
                    vm.message = ''
                }).catch (error => {
                    var errors = error.response.data.errors
                }); 
            } else {
                console.log(this.errors);
                console.log('no');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
	.form {
	    font-family: $fontSecondary;
	    font-size: 1.2rem;
	    width: 100%;

	    &__left {
	        box-sizing: border-box;
	        display: flex;
            flex-direction: column;
	        flex-wrap: wrap;
	        justify-content: flex-start;
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
            flex-direction: column;
	        justify-content: flex-start;
	        margin-bottom: 1.5rem;
	        width: 100%;

	        @media #{$phone} {
	            width: 100%;
	        }
	    }

	    &__input {
	        border: none;
	        border-bottom: 3px solid $primary;
	        box-shadow: none;
	        font-family: $fontPrimary;
	        font-size: 1rem;
	        font-weight: 400;
	        margin-bottom: 0.5rem;
	        margin-right: 2rem;
	        width: 100%;

	        @media (max-width: 575px) {
	            // width: 100%;
	        }
	    }

	    &__label {
            font-family: $fontPrimary;
	        font-size: 1.5rem;
	        margin-right: 1rem;
            padding-top: 2px;
	    }

        &__textarea {
            border: none;
            border-bottom: 3px solid $primary;
            box-shadow: none;
            font-family: $fontPrimary;
            font-size: 1rem;
            font-weight: 400;
            margin-bottom: 0.5rem;
            margin-right: 2rem;
            min-height: 9.7rem;
            width: 100%;
        }

	    &__error {
	        font-style: italic;
	        margin-top: 0.5rem;
	        min-height: 1.2rem;
	        padding-right: 10px;
	        text-align: left;
	    }

	    button {
            cursor: pointer;
	        margin: 0 auto 0 0 ;	        
	    }
	}
</style>
