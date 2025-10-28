import { createApp } from 'vue';
import App from './App.vue';
import './styles/main.css';

const app = createApp(App);

// Global error handler for better error reporting
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err);
  console.error('Error info:', info);
  // In production, you might want to send this to an error tracking service
};

// Global warning handler
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Warning:', msg);
  console.warn('Trace:', trace);
};

app.mount('#app');

