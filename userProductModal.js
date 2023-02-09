export default {
    template:"#userProductModal",
    props:["productData"],
    data(){
        return {
            tempData:{},
            tempId:"",
            qty:1
        }
    },
    methods:{
        showModal(id){
            this.userProductModal.show();
            this.tempId = id
            console.log("產品細節為", this.tempId)
            this.tempData = this.productData.filter(item => item.id === this.tempId)
            this.tempData = this.tempData[0]
        },
        addQty(){
            console.log(this.qty)
            this.$emit('addCart',this.tempId,this.qty);
            this.userProductModal.hide()
            this.qty = 1
        }
    },
    mounted(){
        this.userProductModal = new bootstrap.Modal(this.$refs.userProductModal);
    }
}