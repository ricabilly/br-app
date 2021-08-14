import { createStore } from "vuex";
import VuexPersistence from 'vuex-persist';
import { userModule } from "./modules/user";
import { bouldersModule } from "./modules/boulders";

export const API_URL = "localhost:8084/api";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default createStore({
  modules: {
    user: userModule,
    boulders: bouldersModule
  },
  plugins: [vuexLocal.plugin],
});
