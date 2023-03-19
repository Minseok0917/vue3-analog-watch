import { defineStore } from "pinia";

export const useStoreHello = defineStore("hello", {
  state: () => ({
    message: "아날로그 시계",
  }),
});
