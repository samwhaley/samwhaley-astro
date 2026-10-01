<template>
<div>
  <i id="like-button" @click="like"><fa :icon="['fa', 'heart']"/></i>
  <p>{{ likes }} likes</p>
</div>
</template>

<script>

import axios from 'axios'

export default {
	props: {
		likes: Number,
		id: String
	},

	data: function() {
		return {
			liked: false
		}
	},

	methods: {
		like: function() {
			const button = document.getElementById('like-button')
			button.classList.toggle('press');

            if(!this.liked) {
                let apiUrl = process.env.API_URL + '/blog-items/' + this.id

                axios({
                    method: 'PUT',
                    url: apiUrl,
                    data: {
                        likes: this.likes
                    }
                }).then(response => {});

                this.likes ++
                this.liked = true            
            }
        }
	} 
}
</script>

<style lang="scss" scoped>
	body {
	  margin:0;
	  text-align:center;
	  padding-top:120px;
	  font-family:'open sans',sans-serif;
	  background:#ddd;
	  height:100%;
	}

	div {
	  display: flex;
	  margin:0 auto;
	  position: relative;
	}

	i {
	  box-shadow: 0px 0px 5px lightgrey;
	  cursor:pointer;
	  padding:10px 12px 8px;
	  background:#fff;
	  border-radius:50%;
	  display:inline-block;
	  margin:0 1rem 3rem 0;
	  color:#aaa;
	  transition:.2s;
	}

	i:hover {
	  color:#666;
	}

	i.press {
	  animation: size .4s;
	  color:$primary;
	}

	@keyframes fade {
	  0% {color:#transparent;}
	  50% {color:#e23b3b;}
	  100% {color:#transparent;}
	}

	@keyframes size {
	  0% {transform: scale(1)}
	  50% {transform: scale(1.2)}
	  100% {transform: scale(1)}
	}
</style>