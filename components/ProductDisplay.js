app.component('product-display',{
    props:{//acá en props, espero lo que se envíe desde el padre, puedo poner  una validacion de dato,  para validar que lo que envién sea lo correcto
        premium:{ //está es la propiedad que pongo en el hijo, se llamó de la misma forma solo por el ejercicio pero se puede llamar como uno quiera...
            type:Boolean,
            required:true
        }
    },
    template:
    /*html*/
        `<div class="product-display">
        <div class="product-container">
          <div class="product-image" >
            <img :src="image" :alt="description" :class="{'out-of-stock-img':!inStock}">
          </div>
          <div class="product-info">
            <h1>{{title}}</h1>
            <h1>{{title2}}</h1>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10  && inventory >0">Almost sold out</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <p v-if="onSale">on Sale</p>
            <ul v-for="item in details">
              <li>{{item}}</li>
            </ul>
            <div 
              v-for="variant,index in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)"
              class="color-circle"
              :style="{backgroundColor:variant.color}"
              >
            </div>
            <button 
              class="button" 
              :class="{disabledButton:!inStock}"
              @click="addToCart"
              :disabled="!inStock"
              >
              +
            </button>
            <button 
              class="button" 
              :class="{disabledButton:!inStock}"
              @click="removeFromCart"
              :disabled="!inStock"
              >
              -
            </button>
          </div>
        </div>
        <review-list :reviews="reviews" v-if="reviews.length"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>`,
        data(){
            return{
                product : 'Socks',
                brand:'Vue Mastery',
                description:"Descripcion del producto",
                selectVariant:0,
                url:'https://www.google.com.co',
                inventory:8,
                details:['50% cotton','30% Wool','20% Polyester'],
                variants:[{id:2234,color:'green',image:'./assets/images/socks_green.jpg',quantity:50},
                        {id:2235,color:'blue',image:'./assets/images/socks_blue.jpg',quantity:100}
                ],
                sizes:['S','M','X','XXL'],
                onSale:false,
                reviews:[]
            }
        },
        methods:{
            addToCart(){
                this.inventory--
                this.$emit('add-to-cart',this.variants[this.selectVariant].id)
            },
            removeFromCart(){
                this.$emit('remove-from-cart',this.variants[this.selectVariant].id)
            },
            updateVariant(index){
                this.selectVariant=index
            },
            addReview(review){
                this.reviews.push(review)
            }
        },
        computed:{
            title(){
                return this.brand + ' ' + this.product
            },
            image(){
                return this.variants[this.selectVariant].image
            },
            inStock(){
                return this.variants[this.selectVariant].quantity
            },
            title2(){
                if(this.onSale){
                    return this.brand + ' ' + this.product
                }
            },
            shipping(){
                if (this.premium){
                    return 'Free'
                }else{
                    return 2.99
                }
            }
        }
})