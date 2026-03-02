import { store } from "./store.js";

export const auth = {

    isLogged() {
        return !!store.user.get();
    },

    getUser() {
        return store.user.get();
    },

    login(user) {
        store.user.set(user);
        window.dispatchEvent(new Event("authChange"));
    },

    logout() {
        store.user.remove();
        window.dispatchEvent(new Event("authChange"));
    }

};