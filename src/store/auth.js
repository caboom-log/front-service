import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('jwt') || null,
        user: null
    }),
    actions: {
        setToken(token) {
            this.token = token;
            localStorage.setItem('jwt', token);
        },
        setUser(user) {
            this.user = user;
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('jwt');
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token
    }
})