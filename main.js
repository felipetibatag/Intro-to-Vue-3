const product = 'Socks'
const app=Vue.createApp({
    data(){
        return{
            cart:[],
            premium:false, //este vendría siendo el valor que voy a enviar al hijo
        }
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        },
        removeFromCart(id){
            const index=this.cart.indexOf(id)
            if(index>-1){
                this.cart.splice(index,1)
            }
        }
    }  
})