<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#37383A] text-[#BCC1C7] p-5 space-y-6 transition-transform duration-300 md:translate-x-0 fixed inset-y-0 left-0 transform -translate-x-full md:relative md:w-64 md:block">
      <h2 class="text-xl font-bold text-center">Dashboard</h2>
      <nav>
        <ul class="space-y-4">
          <li>
            <router-link to="/dashboard" class="block p-3 rounded-lg hover:bg-gray-700">Titulos</router-link>
          </li>
          <li>
            <router-link to="/testimonies" class="block p-3 rounded-lg hover:bg-gray-700">Testimonios</router-link>
          </li>
          <li>
            <router-link to="/settings" class="block p-3 rounded-lg hover:bg-gray-700">Configuración</router-link>
          </li>
        </ul>
      </nav>
      <button @click="logout" class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">
        Cerrar Sesión
      </button>
    </aside>

    <!-- Contenido principal con márgenes y sombreado -->
    <main class="flex-1 p-10 bg-gray-100 mx-6 my-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <router-view></router-view> <!-- Aquí se carga el contenido según la ruta -->
    </main>
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
