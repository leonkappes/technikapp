import { dev } from "$app/env";

export function getFullURL() {
    if(dev) {
        return `http://localhost:3000`;
    } else {
        return `https://${import.meta.env.VITE_FULL_URL}`;
    }
}

export function getApiURL() {
    if(dev) {
        return `http://localhost:1337`;
    } else {
        return `https://${import.meta.env.VITE_API_URL}`;
    }
}