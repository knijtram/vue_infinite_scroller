<template>
  <div class="container">
    <section class="section">
      <h2>People</h2>
      <hr>
      <InfiniteScroller :items="people" :initial-count="25" :emit-options="{ topThreshold: 0, bottomThreshold: 100 }" class="scroll-container">
        <template #default="{ item }">
          <div class="item-card">
            <h3>{{ item.name }}</h3>
            <p>Age: {{ item.age }}</p>
          </div>
        </template>
      </InfiniteScroller>
    </section>

    <section class="section">
      <h2>Businesses</h2>
      <input type="text" v-model="searchQuery" placeholder="Search by industry" />
      <hr>
      <InfiniteScroller :items="filteredBusinesses" :initial-count="25" class="scroll-container">
        <template #default="{ item }">
          <div class="item-card">
            <h3>{{ item.name }}</h3>
            <p>Industry: {{ item.industry }}</p>
          </div>
        </template>
      </InfiniteScroller>
    </section>

    <section class="section">
      <h2>Locations</h2>
      <hr>
      <InfiniteScroller :items="locations" :initial-count="25" class="scroll-container">
        <template #default="{ item }">
          <div class="item-card">
            <h3>{{ item.city }}</h3>
            <p>Country: {{ item.country }}</p>
          </div>
        </template>
      </InfiniteScroller>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import InfiniteScroller from '../node_modules/vue-infinite-scroller/src/components/InfiniteScroller.vue';

const searchQuery = ref('');

const people = computed(() =>
  Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Person ${i}`,
    age: 20 + (i % 50)
  }))
);

const businesses = computed(() =>
  Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Business ${i}`,
    industry: ["Tech", "Retail", "Finance", "Healthcare"][i % 4]
  }))
);
const filteredBusinesses = computed(() => {
  if (!searchQuery.value) {
    return businesses.value;
  }
  return businesses.value.filter(business =>
    business.industry.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const locations = computed(() =>
  Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    city: `City ${i}`,
    country: ["USA", "Canada", "UK", "Australia"][i % 4]
  }))
);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100vw;
}

.section {
  border: 4px solid #ddd;
  padding: 1rem;
  border-radius: 12px;
  min-width: 320px;
}

.section h2 {
  margin: 4px 0;
}

.section input {
  width: 95%;
  padding: 0.2rem;
}

.scroll-container {
  max-height: 500px;
  height: 80vh;
  overflow-y: auto;
  border-radius: 4px;
}

.item-card {
  padding: 4px 0;
  margin-bottom: 8px;
}

.item-card h3 {
  margin: 0;
}

.item-card p {
  margin: 0;
}
</style>
