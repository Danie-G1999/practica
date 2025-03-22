<template>
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Correo" required />
        <input type="password" v-model="password" placeholder="Contraseña" required />
        <button type="submit" :disabled="loading">
          {{ loading ? 'Cargando...' : 'Entrar' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        loading: false,
        error: null,
      };
    },
    methods: {
      async login() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.post('http://localhost:8080/api/login', {
            email: this.email,
            password: this.password,
          });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userName', response.data.name);
          this.$router.push('/dashboard');
        } catch (err) {
          this.error = 'Credenciales incorrectas';
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    text-align: center;
    margin-top: 50px;
  }
  input {
    display: block;
    margin: 10px auto;
    padding: 8px;
    width: 250px;
  }
  button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  