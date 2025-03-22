<template>
    <div class="dashboard-container">
      <h2>Bienvenido, {{ userName }}</h2>
      <button @click="logout">Cerrar Sesión</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userName: '',
      };
    },
    created() {
      this.userName = localStorage.getItem('userName') || 'Usuario';
    },
    methods: {
      logout() {
        localStorage.clear();
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    text-align: center;
    margin-top: 50px;
  }
  button {
    padding: 10px 15px;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  