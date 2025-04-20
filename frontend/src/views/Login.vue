<template>
  <div class="flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-96">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
      
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold">Correo electrónico</label>
          <input 
            type="email" 
            id="email" 
            v-model="email"
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-semibold">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="password"
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <button 
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
        >
          Iniciar sesión
        </button>
      </form>

      <p v-if="error" class="mt-4 text-red-500 text-sm text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log('API URL:', apiUrl);
      try {
        const response = await fetch(`${apiUrl}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Credenciales incorrectas");
        }

        localStorage.setItem("token", data.token);
        this.$router.push("/dashboard");
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>
