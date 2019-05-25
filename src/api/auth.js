import api from "./index";

export function login(phone, pw) {
    return api.post("/auth/login", { phone, pw });
}

export function getUserInfo() {
    return api.post("/auth/getUserInfo");
}