import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import router from '@/router'
import { Message } from "element-ui"
import { BASE_URL } from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //account state
    accountToken: null, //токен авторизации
    accountProfile: null, //профиль авторизованного пользователя
    
    //system state
    systemOperation: '', //код операции в системе
    systemPreloader: false, //включение прелоадера в приложении
    systemHeightWindow: 0, //высота экрана браузера
    systemVisibleDialog: false, //отображение диалогового окна
    systemCheckBeforeDelete: false, //результат проверки перед удаление сущности
    systemBusinessComponent: '', //номер бизнес-компоненты
    systemDirectory: null, //запись сущности из бд для редактирования на панели администратора
    systemNotify: false, //системное уведомление (флаг окраски колокольчика)
    systemUserAgenMobile: false, //флаг - пользовтаель зашел с мобильного устройства

    //organizational structure of the company
    controls: [], //коллекция управлений
    control: null,
    departments: [], //коллекция отделов
    department: null,
    sectors: [], //коллекция секторов
    sector: null,
    addresses: [], //коллекция адресов
    address: null,

    //application directories
    users: [], //коллекция пользователей
    userRoles: [], //коллекция пользовательских ролей
    userTypes: [], //коллекция пользовательских типов
    taskTypes: [], //коллекция типов заявки
    taskTypeRefs: [], //коллекция типов заявки (уточнение)
    taskStatuses: [], //коллекция статусов заявки
    taskBusinessStatuses: [], //коллекция бизнес-статусов заявки

    //requests
    requests: [], //коллекция завок
    request: null, //сущность записи заявки
    requestHistories: [], //коллекция записей - история операций над заявкой
    requestCountNotify: 0, //счетчик уведомлений по заявкам (количество непросмотренных заявок с обновлениями от исполнителей)
    requestVisibleMode: 0, //Режим отображения заявок (0 - мои/ 1 - всего кабинета)

    //tasks
    tasks: [], //коллекция заданий
    task: null, //сущность записи задания
    taskHistories: [], //коллекиця записей - историz операций по заданию
    taskCountNotify: 0, //счетчик уведомлений по заданиям (количество новых непросмотренных заданий от клиентов)
    taskVisibleMode: 0, //режим отображения задач (0 - мои/1 - все задачи, мои не взятые в работу с возможностью взять в работу и взятые - недоступные для редактирования, только просмотр)
  },
  mutations: {
    //account mutations
    setAccountToken(state, value) {
        state.accountToken = value;
    },
    setAccountProfile(state, value) {
      state.accountProfile = value;
    },
    
    //system mutations
    setSystemOperations(state, value) {
        if (value != null && typeof(value) !== 'undefined' && value !== '') {
            state.systemOperation = value;
        } else {
            state.systemOperation = '';
        }
    },
    setSystemPreloader(state, value) {
        state.systemPreloader = value;
    },
    setSystemHeightWindow(state, value) {
        state.systemHeightWindow = value;
    },
    setSystemVisibleDialog(state, value) {
      state.systemVisibleDialog = value;
    },
    setSystemCheckBeforeDelete(state, value) {
      state.systemCheckBeforeDelete = value;
    },
    setBuinessComponent(state, value) {
      if(value !== null && typeof(value) !== 'undefined') {
        state.systemBusinessComponent = value;
      }
      else {
        state.systemBusinessComponent = '';
      }
    },
    setSystemDirectory(state, value) {
      state.systemDirectory = value;
    },
    setSystemNotify(state, value) {
      state.systemNotify = value;
    },
    setSystemUserAgentMobile(state, value) {
      state.systemUserAgenMobile = value;
    },

    //Generic universal mutation
    setEntities(state, mutationOptions) {
      let value = mutationOptions.payload;

      switch(mutationOptions.componentType) {
        case 'control':
          state.controls = value;
        break;
        case 'department':
          state.departments = value;
        break;
        case 'sector':
          state.sectors = value;
        break;
        case 'address':
          state.addresses = value;
        break;
        case 'task':
          state.tasks = value;
        break;
        case 'taskHistory':
          state.taskHistories = value;
        break;
        case 'taskType':
          state.taskTypes = value;
        break;
        case 'taskTypeRef':
          state.taskTypeRefs = value;
        break;
        case 'taskStatus':
          state.taskStatuses = value;
        break;
        case 'taskBusinessStatus':
          state.taskBusinessStatuses = value;
        break;
        case 'user':
          state.users = value;
        break;
        case 'userType':
          state.userTypes = value;
        break;
        case 'userRole':
          state.userRoles = value;
        break;
        case 'request':
          state.requests = value;
        break;
      }
    },
    setEntity(state, mutationOptions) {
      let value = mutationOptions.payload;

      switch(mutationOptions.componentType) {        
        case 'request':
          state.request = value;
        break;
        case 'requestVisibleMode':
          state.requestVisibleMode = value;
        break;
        case 'task':
          state.task = value;
        break;
        case 'taskVisibleMode':
          state.taskVisibleMode = value;
        break;        
      }
    },
  },
  actions: {
    //account actions
    accountLogin(context, data) {
      return axios.post("/api/account/v1.0/login", data)
        .then(function(response) {
          context.commit('setAccountToken', response.data.payload);
          window.location.href = BASE_URL;
        })
        .catch(function(error) {
            context.commit("setSystemPreloader", false);
            
            Message({
              showClose: true,
              message: error.response.data.exceptionString,
              type: "error"
            });
        });
    },
    accountRegistration(context, data) {
      return axios.post("/api/account/v1.0/register", data)
        .then(function(response) {
          context.commit('setAccountToken', response.data.payload);
          window.location.href = BASE_URL;
        })
        .catch(function(error) {
            context.commit("setSystemPreloader", false);
            
            Message({
              showClose: true,
              message: error.response.data.exceptionString,
              type: "error"
            });
        });
    },
    accountLogout(context) {
      return axios.post("/api/account/v1.0/logout")
        .then(function() {
          context.commit('setAccountProfile', null);
          context.commit("setAccountToken", null);
          router.push("/login");
        })
        .catch(function(error) {
          context.commit("setSystemPreloader", false);
            
          Message({
            showClose: true,
            message: error.response.data.exceptionString,
            type: "error"
          });
        });
    },
    accountTokenRefresh(context) {
      return axios.post("/api/account/v1.0/refresh")
        .then(function(response) {
          context.commit("setAccountToken", response.data.payload);

          return response.data.payload;
        })
        .catch(function(error) {
          console.log(error.response.data);
        });
    },
    getAccount(context) {
      return axios.get("/api/account/v1.0/get")
        .then(response => {
          context.commit("setAccountProfile", response.data.payload);
          context.commit("setSystemPreloader", false);
        })
        .catch(function(error) {
          context.commit("setSystemPreloader", false);
        
          Message({
            showClose: true,
            message: error.response.data.exceptionString,
            type: "error"
          });
        });
    },

    //business environment actions
    async getEntities(context, actionOptions) {
      let urlApi = "/api/environment/v1.0/get/" 
        + getCodeBusinessComponentType(actionOptions.componentType)
        + "/79a8af08-fff7-11eb-9a03-0242ac130003";
      let mutationName = "setEntities";

      if(typeof(actionOptions.params) !== 'undefined' && actionOptions.params !== "") {
        urlApi = urlApi + "?" + actionOptions.params;
      }

      return axios.post(urlApi, actionOptions.options)
        .then(response => {
          let mutationOptions = {
            componentType: actionOptions.componentType,
            payload: response.data.payload
          };

          context.commit(mutationName, mutationOptions);
          context.commit("setSystemPreloader", false);
        })
        .catch(function(error) {
          context.commit("setSystemPreloader", false);
          console.log(error.response.data);

          Message({
            showClose: true,
            message: error.response.data,
            type: "error"
          });
        });
    },
    async getEntity(context, actionOptions) {
      let mutationName = "setEntity";
      let urlApi = "/api/environment/v1.0/get/" 
        + getCodeBusinessComponentType(actionOptions.componentType);

      return axios.get(urlApi + "/" + actionOptions.id)
        .then(response => {
          let mutationOptions = {
            componentType: actionOptions.componentType,
            payload: response.data.payload
          };

          context.commit(mutationName, mutationOptions);
          
          return response;
        })
        .catch(function(error) {
          context.commit("setSystemPreloader", false);
          console.log(error.response.data);

          Message({
            showClose: true,
            message: error.response.data,
            type: "error"
          });

          return error;
        });
    },
    async checkEntity(context, actionOptions) {
      let urlApi = "/api/environment/v1.0/check/" 
        + getCodeBusinessComponentType(actionOptions.componentType);

      return axios.get(urlApi + "/" + actionOptions.id)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          context.commit("setSystemPreloader", false);
          console.log(error.response.data);

          Message({
            showClose: true,
            message: error.response.data,
            type: "error"
          });

          return error;
        });
    },
    async createEntity(context, actionOptions) {
      let urlApi = "/api/environment/v1.0/create/" 
        + getCodeBusinessComponentType(actionOptions.componentType);
      let mutationName = "setEntities";

      if(typeof(actionOptions.params) !== 'undefined' && actionOptions.params !== "") {
        urlApi = urlApi + "?" + actionOptions.params;
      }

      return axios.post(urlApi, actionOptions.options)
        .then(response => {
          let mutationOptions = {
            componentType: actionOptions.componentType,
            payload: response.data.payload
          };

          context.commit(mutationName, mutationOptions);

          Message({
            showClose: true,
            message: "Запись успешно добавлена.",
            type: "success"
          });

          context.commit("setSystemPreloader", false);

          return response;
        })
        .catch(function(error) {
          context.commit("setSystemPreloader", false);

          Message({
            showClose: true,
            message: error.response.data,
            type: "error"
          });

          return error;
        });
    },
    async updateEntity(context, actionOptions) {
      let urlApi = "/api/environment/v1.0/update/" 
        + getCodeBusinessComponentType(actionOptions.componentType);
      let mutationName = "setEntities";

      if(typeof(actionOptions.params) !== 'undefined' && actionOptions.params !== "") {
        urlApi = urlApi + "?" + actionOptions.params;
      }

      return axios.post(urlApi, actionOptions.options)
        .then(response => {
          let mutationOptions = {
            componentType: actionOptions.componentType,
            payload: response.data.payload
          };

          context.commit(mutationName, mutationOptions);

          Message({
            showClose: true,
            message: "Запись успешно обновлена.",
            type: "success"
          });

          context.commit("setSystemPreloader", false);

          return response;
        })
        .catch(function(error) {
          context.commit("setSystemPreloader", false);

          Message({
            showClose: true,
            message: error.response.data,
            type: "error"
          });

          return error;
        });
    },
    async deleteEntity(context, actionOptions) {
      let urlApi = "/api/environment/v1.0/delete/" 
        + getCodeBusinessComponentType(actionOptions.componentType);
      let mutationName = "setEntities";

      if(typeof(actionOptions.params) !== 'undefined' && actionOptions.params !== "") {
        urlApi = urlApi + "?" + actionOptions.params;
      }

      return axios.post(urlApi, actionOptions.options)
        .then(response => {
          let mutationOptions = {
            componentType: actionOptions.componentType,
            payload: response.data.payload
          };

          context.commit(mutationName, mutationOptions);

          Message({
            showClose: true,
            message: "Запись успешно удалена.",
            type: "success"
          });

          context.commit("setSystemPreloader", false);

          return response;
        })
        .catch(function(error) {
          context.commit("setSystemPreloader", false);

          Message({
            showClose: true,
            message: error.response.data,
            type: "error"
          });

          return error;
        });
    },
    async getDirectory(context, actionOptions) {
      let mutationName = "setSystemDirectory";
      let urlApi = "/api/environment/v1.0/get/" 
        + getCodeBusinessComponentType(actionOptions.componentType);

      return axios.get(urlApi + "/" + actionOptions.id)
        .then(response => {
          context.commit("setSystemPreloader", false);
          context.commit(mutationName, response.data.payload);
        })
        .catch(function(error) {
          context.commit("setSystemPreloader", false);
          console.log(error.response.data);

          Message({
            showClose: true,
            message: error.response.data,
            type: "error"
          });
        });
    },
  },
  modules: {
  }
})

function getCodeBusinessComponentType(componentType) {
  let code = "";

  switch(componentType) {
    case 'control':
      code = "100";
    break;
    case 'department':
      code = "101";
    break;
    case 'sector':
      code = "102";
    break;
    case 'address':
      code = "103";
    break;
    case 'task':
      code = "200";
    break;
    case 'taskHistory':
      code = "201";
    break;
    case 'taskType':
      code = "202";
    break;
    case 'taskTypeRef':
      code = "203";
    break;
    case 'taskStatus':
      code = "204";
    break;
    case 'taskBusinessStatus':
      code = "205";
    break;
    case 'user':
      code = "406";
    break;
    case 'userType':
      code = "408";
    break;
    case 'userRole':
      code = "410";
      break;
    case 'userProfile':
      code = "411";
      break;
    case 'request':
      code = "300";
    break;
  }

  return code;
}
