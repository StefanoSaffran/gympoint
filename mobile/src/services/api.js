import axios from 'axios';

/*
  url: {
    ios: localhost
    android: {
      android studio: 10.0.2.2,
      genymotion: 10.0.3.2,
      phone via usb: your ip
    }
  }
*/

const api = axios.create({
  baseURL: 'http://10.0.2.2:3003',
});

export default api;
