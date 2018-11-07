import Vue from 'vue'
import 'document-register-element/build/document-register-element';
import vueCustomElement from 'vue-custom-element'
import DateCountdown from './components/DateCountdown.vue'

Vue.use(vueCustomElement);

Vue.customElement('date-countdown', DateCountdown);

