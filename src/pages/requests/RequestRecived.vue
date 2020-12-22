<template>
    <div>
        <base-dialog :show="!!errorMessage" title="An error" @close="errorHandler">
            <p>{{errorMessage}}</p>
        </base-dialog>
        <section>
            <base-card>
                <h2>Request recived</h2>
                <div v-if="isLoading">
                    <base-spiner></base-spiner>
                </div>
                <ul v-else-if="hasRequest && !isLoading">
                    <request-item 
                        v-for="request in recivedRequest" 
                        :key="request.id"
                        :email="request.userEmail"
                        :message="request.message"
                    ></request-item>
                </ul>
                <h3 v-else>You haven't any request</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import RequestItem from '../../components/requests/RequesItem.vue'
import BaseDialog from '../../components/ui/BaseDialog.vue';
export default {
    components: {
        RequestItem,
        BaseDialog
    },
    data() {
        return {
            isLoading:false,
            errorMessage:null
        }
    },
    computed:{
        recivedRequest() {
            return this.$store.getters['requests/requests'];
        },
        hasRequest() {
            return this.$store.getters['requests/hasRequest'];
        }
    },
    methods: {
        async loadRequests() {
            this.isLoading =true;
            try {
                await this.$store.dispatch('requests/fetshRquests');
            } catch(err) {
                this.errorMessage = err.message || 'Cant download requests.'
            }
            this.isLoading =false;
        },
        errorHandler() {
            this.errorMessage = null;
        }
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>