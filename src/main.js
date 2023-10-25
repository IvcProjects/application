import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueNativeNotification from 'vue-native-notification'
import QuestionHub from "@/task-hub"
import './theme'

import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BASE_URL_API } from "@/config"

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(ElementUI, {locale})

Vue.use(VueNativeNotification, {
    // Automatic permission request before
    // showing notification (default: true)
    requestOnNotify: true
  });
Vue.notification.requestPermission()
  .then(console.log);
Vue.use(QuestionHub);

// Следим за изменением токена в Vuex
store.subscribe(({ type, payload }) => {
    if (type !== 'setAccountToken') return;

    if (payload != null && typeof payload != 'undefined') {
        localStorage.setItem('token', payload);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('token');
    }
});

if (localStorage.getItem('token') === 'null') localStorage.removeItem('token');

// Инициализируем токен
if (localStorage.getItem('token')) store.commit('setAccountToken', localStorage.getItem('token'));

// Следим за изменением токена в Storage
window.addEventListener('storage', ({ key, newValue }) => {
    if (key !== 'accountToken') return;
    store.commit('setAccountToken', newValue);
});

// Изменение размеров окна, перестраиваем размер таблицы
window.addEventListener('resize', ResizeTable);

function ResizeTable() {
    store.commit('setSystemHeightWindow', window.innerHeight);
}

ResizeTable();

axios.defaults.baseURL = BASE_URL_API;

// Добавляем обработчики результата запроса
let isTokenFetching = false;
let requestCallbacks = [];

axios.interceptors.response.use(
    // В случае успешного запроса
    response => {
        // Если в ответе есть поле tokenAccess, то изменяем токен в Storage
        if (Object.prototype.hasOwnProperty.call(response.data.hasOwnProperty, "tokenAccess")) {
            store.commit('setAccountToken', response.data.tokenAccess);
        }

        // Возвращаем только данные
        return Promise.resolve(response);
    },
    // В случае ошибки
    error => {
        // Получаем параметры запроса
        let requestConfig = error.config;

        if (requestConfig.headers.Authorization && error.response && error.response.status === 403) {
            store.commit('setAccountToken', null);
            router.push('/login');
        }
        if (requestConfig.headers.Authorization && error.response && error.response.status === 404) {
            router.push('/');
        }

        // Если в загловках запроса был токен авторизации и...
        // Если вернулся статус 401, то пробуем запросить новый токен
        if (requestConfig.headers.Authorization && error.response && error.response.status === 401) {

            // Если в заголовках запроса был старый токен, а в хранилище уже записан новый
            if (requestConfig.headers.Authorization !== axios.defaults.headers.common.Authorization) {
                // То заменяем токен на новый и посылаем запрос заново
                requestConfig.headers.Authorization = axios.defaults.headers.common.Authorization;
                return axios(requestConfig);
            }

            // Если запрос на обновление токена сейчас не идет, то посылаем его
            if (!isTokenFetching) {
                isTokenFetching = true;
                store.dispatch('accountTokenRefresh')
                    .then(() => {
                        // Запускаем все отложенные запросы с новым токеном
                        let token = localStorage.getItem('token');
                        requestCallbacks = requestCallbacks.filter(requestCallback => requestCallback(token));
                        // Сбрасываем флаг запроса токена
                        isTokenFetching = false;
                    })
                    .catch(error => {
                        console.log(error);
                        requestCallbacks = [];
                        isTokenFetching = false;
                        store.commit('setAccountToken', null);
                        router.push('/login');
                        // Очищаем массив отложенных запросов            
                        // Сбрасываем флаг запроса токена            
                    });
            }

            // Откладываем запрос, чтобы послать его позже с новым токеном
            return new Promise(resolve => {
                requestCallbacks.push(newToken => {
                    requestConfig.headers.Authorization = 'Bearer ' + newToken;
                    resolve(axios(requestConfig));
                });
            });
        }
        return Promise.reject(error)
    }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
