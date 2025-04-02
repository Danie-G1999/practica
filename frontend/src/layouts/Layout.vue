<template>
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-[#37383A] text-[#BCC1C7] p-5 space-y-6 fixed inset-y-0 left-0 transform md:translate-x-0 md:w-64">
        <h2 class="text-xl font-bold text-center">Dashboard</h2>
        <nav>
          <ul class="space-y-4">
            <li>
              <router-link to="/dashboard" class="block p-3 rounded-lg hover:bg-gray-700">Títulos</router-link>
            </li>
            <li>
              <router-link to="/testimonies" class="block p-3 rounded-lg hover:bg-gray-700">Testimonios</router-link>
            </li>
            <li>
              <router-link to="/settings" class="block p-3 rounded-lg hover:bg-gray-700">Configuración</router-link>
            </li>
          </ul>
        </nav>
        <button @click="logout" class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
          Cerrar Sesión
        </button>
      </aside>
  
      <!-- Contenido dinámico -->
      <main class="flex-1 p-10 bg-gray-100 mx-6 my-6 rounded-lg shadow-lg ml-72">
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        localStorage.clear();
        this.$router.push('/');
      },
    },
  };
  </script>
  