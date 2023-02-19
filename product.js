import userProductModal from "./userProductModal.js"

const baseUrl = "https://vue3-course-api.hexschool.io";
const apiPath = "duej123456"

Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
    });

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
VeeValidate.configure({
generateMessage: VeeValidateI18n.localize('zh_TW'),
validateOnInput: true, 
});


const app = Vue.createApp({
    data(){
        return{
            productData:[],
            productCart:[],
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    add:''
                },
                message:'',
                cart:{}
            },
            loadingStatus: {
                loadingItem: '',
                cartItem:''
            },
            fullPage: false
        }
    },
    methods:{
        getProduct(){
            axios
                .get(`${baseUrl}/v2/api/${apiPath}/products/all`)
                .then(res => {
                    this.productData = res.data.products
                    console.log("產品資料是" ,res.data.products)
                })
        },

        addCart(id,qty = 1){
            this.loadingStatus.loadingItem=id
            const data = {
                "product_id": id,
                "qty": qty
            }            
            axios
                .post(`${baseUrl}/v2/api/${apiPath}/cart`,{data})
                .then(res => {
                    console.log('已加入購物車')
                    this.loadingStatus.loadingItem=
                    this.getCart()
                })
        },

        openModal(id){
            this.$refs.openModal.showModal(id)
        },

        getCart(){
            axios.get(`${baseUrl}/v2/api/${apiPath}/cart`)
                .then(res => {
                    this.productCart = res.data.data;
                    console.log("購物車的資料是", this.productCart)
                })
        },

        editCart(item,qty){
            console.log(item)
            this.loadingStatus.cartItem = item.id
            const data = {
                "product_id": item.product_id,
                "qty": qty
            }            
            axios
                .put(`${baseUrl}/v2/api/${apiPath}/cart/${item.id}`,{data})
                .then(res => {
                    console.log('已修改數量')
                    this.getCart()
                    this.loadingStatus.cartItem = ""
                    this.getCart()
                })
                .catch(err => console.log(err))
        },

        deleteItem(id){
            console.log(id)
            alert("確定要刪除嗎");
            axios
                .delete(`${baseUrl}/v2/api/${apiPath}/cart/${id}`)
                .then(res => {
                    console.log(res)
                    this.getCart()
                })
        },

        deleteAll(){
            alert("確定要刪除嗎");
            axios
                .delete(`${baseUrl}/v2/api/${apiPath}/carts`)
                .then(res => {
                    console.log("res")
                    this.getCart()
                })
        },
        submitCart(value){
            axios
                .post(`${baseUrl}/v2/api/${apiPath}/order`,{data:this.form})
                .then(res => {
                    console.log("res")
                    this.getCart()
                    alert('建立成功')
                })
                .catch(err => console.log(err))
        }
    },    
    mounted(){
        this.getProduct();
        this.getCart()
    }
})


app.component('userProductModal',userProductModal)
app.component('VForm',VeeValidate.Form)
app.component('VField',VeeValidate.Field)
app.component('ErrorMessage',VeeValidate.ErrorMessage)
app.mount("#app");

