import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import { BASE_URL_API } from "@/config"
import { BASE_URL } from "@/config"


export default {
  install(Vue) {
    let tokenAccess = localStorage.getItem("token");
    const connection = new HubConnectionBuilder() 
      .withUrl(`${BASE_URL_API}/task-hub`, { accessTokenFactory: () => tokenAccess })
      .configureLogging(LogLevel.Information)
      .build()
  
    // use new Vue instance as an event bus
    const taskHub = new Vue() 
    // every component will use this.$taskHub to access the event bus
    Vue.prototype.$taskHub = taskHub
    // Forward server side SignalR events through $taskHub, where components will listen to them
    connection.on('NotifyTask', (message) => {
      taskHub.$emit('score-changed', { message })
    });

    let startedPromise = null;

    function start() {
      if (window.location.href !== `${BASE_URL}/login` &&
            window.location.href !== `${BASE_URL}/register` &&
            window.location.href !== `${BASE_URL}/administrator` &&
            tokenAccess !== null
        && typeof (tokenAccess) !== 'undefined') {
          startedPromise = connection.start()
          .catch(err => {
            console.error('Failed to connect with hub', err);
            return new Promise((resolve, reject) => {
                if (typeof (tokenAccess) !== 'undefined' && tokenAccess !== '' && tokenAccess !== null) {
                  setTimeout(() => start().then(resolve).catch(reject), 5000);
                }
              })  
          });

        return startedPromise;            
      }
    }

    connection.onclose(() => start());
    window.onload = start();      
  }
}