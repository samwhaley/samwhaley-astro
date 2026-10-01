<template>
    <div id="mc_embed_signup">
        <form action="https://samwhaley.us20.list-manage.com/subscribe/post?u=c301a25181246c1df9b3f8186&amp;id=9f6a6dc645" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate form" target="_blank" novalidate>
            <div class="form__left" id="mc_embed_signup_scroll form__left">
                <div class="mc-field-group form__group">
                    <label class="form__label" for="mce-EMAIL">Email: </label>
                    <input type="email" value="" name="EMAIL" class="required form__input email" id="mce-EMAIL">
                </div>

                <div class="mc-field-group form__group">
                    <label class="form__label" for="mce-FNAME">Name: </label>
                    <input type="text" value="" name="FNAME" class="required form__input" id="mce-FNAME">
                </div>

                <div id="mce-responses" class="clear">
                    <div class="response" id="mce-error-response" style="display:none"></div>
                    <div class="response" id="mce-success-response" style="display:none"></div>
                </div>    

                <div style="position: absolute; left: -5000px;" aria-hidden="true">
                    <input type="text" name="b_c301a25181246c1df9b3f8186_9f6a6dc645" tabindex="-1" value="">
                </div>
                <div class="clear form__send">
                    <button type="submit" name="subscribe" id="mc-embedded-subscribe" class="button">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
// Mailchimp's embedded signup form; it opens Mailchimp's confirmation page in a new tab.
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
