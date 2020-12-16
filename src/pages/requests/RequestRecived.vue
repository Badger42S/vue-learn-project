<template>
    <section>
        <base-card>
            <h2>Request recived</h2>
            <ul v-if="hasRequest">
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
</template>

<script>
import RequestItem from '../../components/requests/RequesItem.vue'
export default {
    components: {
        RequestItem
    },
    computed:{
        recivedRequest() {
            return this.$store.getters['requests/requests'];
        },
        hasRequest() {
            return this.$store.getters['requests/hasRequest'];
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