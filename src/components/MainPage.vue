<template>
  <div class="container">
    <p v-if="isLoading" class="loading">Загрузка...</p>
    <form v-on:submit="search">
      <MyInput
        title="Запрос: "
        placeholder="что найти"
        class="input"
        v-model="query"
        :required="true"
      />
      <MyInput
        title="Бренд: "
        placeholder="введите имя бренда"
        class="input"
        v-model="brand"
      />
      <button class="button" type="submit">Найти</button>
    </form>
    <div v-if="!isLoading">
      <h2 v-if="query" class="text">Ответ на запрос "{{ query }}"</h2>
      <h2 v-if="brand" class="text">
        Поиск бренда "{{ brand }}"
        <i v-if="brandIsExist" class="p-active">(найдено)</i>
        <i v-else class="p-active">(не найдено)</i>
      </h2>
      <ol>
        <li
          v-for="productBrand in productBrands"
          :key="productBrand"
          class="brand-item"
        >
          <p
            v-if="productBrand?.toLowerCase() === brand?.toLowerCase()"
            class="p-active"
          >
            {{ productBrand }}
          </p>
          <p v-else>
            {{ productBrand }}
          </p>
        </li>
      </ol>
    </div>
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
      productBrands: [],
      brandIsExist: false,
      isLoading: false,
    };
  },
  components: {
    MyInput,
  },
  methods: {
    search(e) {
      e.preventDefault();
      this.isLoading = true;
      $api.get("", { params: { query: this.query } }).then((response) => {
        this.isLoading = false;
        const brands = response.data.data.products
          .map((el) => el.brand)
          .filter((el) => el !== undefined)
          .filter((el) => el !== "");
        const prodsSet = new Set(brands);
        this.productBrands = Array.from(prodsSet);

        if (
          [...this.productBrands].findIndex(
            (el) => el.toLowerCase() === this.brand?.toLowerCase()
          ) !== -1
        )
          this.brandIsExist = true;
        else this.brandIsExist = false;
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

.loading {
  background: blue;
  color: white;
  padding: 10px;
  border-radius: 10px;
}
</style>
