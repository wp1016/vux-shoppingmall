import Vue from 'vue'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home');


export default [{
  path: '/',
  name: 'home',
  component: home
}]
