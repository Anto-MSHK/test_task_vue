<template>
  <div class="container">
    <form v-on:submit="search">
      <MyInput
        title="Запрос: "
        placeholder="что найти"
        class="input"
        v-model="query"
      />
      <MyInput
        title="Бренд: "
        placeholder="введите имя бренда"
        class="input"
        v-model="brand"
      />
      <button class="button" type="submit">Найти</button>
    </form>
    <h2 v-if="queryTitle" class="text">Ответ на запрос "{{ queryTitle }}"</h2>
    <h2 v-if="brandTitle" class="text">Поиск бренда "{{ brandTitle }}"</h2>
    <ol>
      <li v-for="product in products" :key="product" class="brand-item">
        <p
          v-if="product.toLowerCase() === brandTitle.toLowerCase()"
          class="p-active"
        >
          {{ product }}
        </p>
        <p v-else class="p-normal">
          {{ product }}
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
import { $api } from "@/https";
import MyInput from "./MyInput.vue";

export default {
  name: "MainPage",
  query: "",
  brand: "",
  data() {
    return {
      products: [],
      queryTitle: "",
      brandTitle: "",
    };
  },
  components: {
    MyInput,
  },
  methods: {
    search(e) {
      e.preventDefault();
      console.log(this);
      $api.get("", { params: { query: this.query } }).then((response) => {
        this.queryTitle = this.query;
        this.brandTitle = this.brand;
        const brands = response.data.data.products
          .map((el) => el.brand)
          .filter((el) => el !== undefined)
          .filter((el) => el !== "");
        const prodsSet = new Set(brands);
        this.products = Array.from(prodsSet);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: inline-flex;
  flex-direction: column;
}
.input {
  display: block;
  margin: 0 0 10px 0;
}
.button {
  margin: 10px 0 15px 0;
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  padding: 2px 0;
}
.brand-item {
  text-align: left;
}
.text {
  margin: 5px 0;
  margin: 0;
}

.p-active {
  color: red;
  font-size: 24px;
  margin: 0;
}
</style>
