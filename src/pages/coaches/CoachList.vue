<template>
    <base-dialog :show="!!isError" title="An error" @close="errorHandler">
        <p>{{isError}}</p>
    </base-dialog>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
                <base-button link to="/register" v-if="!isCoach && !isLoading">Register as coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spiner></base-spiner>
            </div>
            <ul v-else-if="hasCoaches">
                <coach-item v-for="coach in filteredCoaches" 
                    :key="coach.id"
                    :id="coach.id"
                    :first-nmae="coach.firstName"
                    :last-name='coach.lastName'
                    :rate="coach.hourlyRate"
                    :areas="coach.areas"
                ></coach-item>
            </ul>
            <h3 v-else>No coaches</h3>
        </base-card>
    </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'

export default {
    components:{CoachItem, CoachFilter},
    data() {
        return {
            activeFilters: {
                frontend:true,
                backend:true,
                career:true
            }
            ,
            isLoading:false,
            isError:null
        }
    },
    computed:{
        filteredCoaches() {
            const coaches =  this.$store.getters['coaches/coaches'];
            return coaches.filter(coach => {
                if(this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if(this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if(this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
        },
        hasCoaches() {
            return !this.isLoadig && this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        }
    },
    methods: {
        setFilters(updatedFilters){
            this.activeFilters =updatedFilters;
        },
        async loadCoaches() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches');
            } catch(error) {
                this.isError =error.message || 'Somthing went wrong.';
            }
            this.isLoading = false;
        }
    },
    errorHandler() {
        this.isError = null;
    },
    created() {
        this.loadCoaches();
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>