<template>
    <div class="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Títulos</h2>
  
      <!-- Botón para alternar entre la tabla y el formulario -->
      <button 
        @click="toggleForm"
        class="mb-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 font-medium shadow-md flex items-center">
        <span v-if="!showForm" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Añadir Título
        </span>
        <span v-else>Cancelar</span>
      </button>
  
      <!-- Tabla de títulos -->
      <div v-if="!showForm" class="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table class="min-w-full bg-white divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-blue-800 to-blue-600">
            <tr>
              <th class="py-4 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
              <th class="py-4 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">Título</th>
              <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="titulo in titulos" :key="titulo.id" class="hover:bg-blue-50 transition-colors duration-200">
              <td class="py-4 px-6 text-sm font-medium text-gray-900 cursor-pointer">{{ titulo.id }}</td>
              <td class="py-4 px-6 text-sm text-gray-800 cursor-pointer">{{ titulo.nombre }}</td>
              <td class="py-4 px-6 text-center space-x-2">
                <button class="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  <span class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Editar
                  </span>
                </button>
                <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <span class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </span>
                </button>
              </td>
            </tr>
            <!-- Filas vacías para demostración cuando no hay datos -->
            <tr v-if="titulos.length === 0">
              <td colspan="3" class="py-8 px-6 text-center text-gray-500 italic">No hay títulos disponibles</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Formulario para añadir un título -->
      <div v-else class="mt-4 p-6 bg-white rounded-md shadow-lg border border-gray-200">
        <h3 class="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Añadir Nuevo Título</h3>
        <form @submit.prevent="agregarTitulo">
          <div class="mb-4">
            <label class="block mb-2 text-gray-700 font-semibold">Título:</label>
            <input 
              v-model="nuevoTitulo" 
              type="text" 
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              placeholder="Ingrese el título profesional"
              required
            />
          </div>
          <div class="flex justify-end space-x-2 mt-6">
            <button 
              type="button" 
              @click="toggleForm"
              class="px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all duration-300 shadow-sm">
              Cancelar
            </button>
            <button 
              type="submit" 
              class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300 shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showForm: false,
        titulos: [
          { id: 1, nombre: 'Doctor en Medicina' },
          { id: 2, nombre: 'Licenciado en Enfermería' },
          { id: 3, nombre: 'Magíster en Salud Pública' },
          { id: 4, nombre: 'Especialista en Pediatría' },
        ],
        nuevoTitulo: ''
      };
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm) {
          this.nuevoTitulo = '';
        }
      },
      agregarTitulo() {
        if (this.nuevoTitulo.trim() === '') return;
        const nuevoId = this.titulos.length > 0 ? Math.max(...this.titulos.map(t => t.id)) + 1 : 1;
        this.titulos.push({ id: nuevoId, nombre: this.nuevoTitulo });
        this.nuevoTitulo = '';
        this.showForm = false;
      }
    }
  };
  </script>