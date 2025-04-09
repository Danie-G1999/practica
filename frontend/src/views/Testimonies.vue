<template>
    <div>
      <div class="p-6 rounded-lg shadow-lg bg-gray-50">
        <!-- Titulo de seccion -->
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">{{ showForm ? 'Añadir Testimonio' : 'Testimonios' }}</h2>
            <button @click="toggleForm"
                class="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 font-medium shadow-md flex items-center">
                <span v-if="!showForm" class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Añadir
                </span>
                <span v-else>Cancelar</span>
            </button>
        </div>

        <!-- Contenido de testimonio aquí -->
        <div v-if="showForm" class="bg-white p-6 rounded-lg shadow-lg">
          <div class="bg-white max-w-2xl mx-auto p-8">
            <!-- <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Añadir de Testimonio</h2> -->

            <form class="space-y-6">
              <!-- Testigo -->
              <div>
                <label class="block mb-1 text-gray-700 font-medium">Testigo</label>
                <input
                  type="text"
                  placeholder="Nombre del testigo"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <!-- Descripción -->
              <div>
                <label class="block mb-1 text-gray-700 font-medium">Descripción</label>
                <textarea
                  rows="4"
                  placeholder="Escribe aquí la experiencia..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                ></textarea>
              </div>

              <!-- Fecha -->
              <div>
                <label class="block mb-1 text-gray-700 font-medium">Fecha</label>
                <input
                  type="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <!-- Calificación -->
              <div>
                <label class="block mb-1 text-gray-700 font-medium">Calificación</label>
                <select
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option disabled selected>Selecciona una opción</option>
                  <option value="1">1 - Muy Malo</option>
                  <option value="2">2 - Malo</option>
                  <option value="3">3 - Regular</option>
                  <option value="4">4 - Bueno</option>
                  <option value="5">5 - Excelente</option>
                </select>
              </div>

              <!-- Botón -->
              <div class="text-center">
                <button
                  type="submit"
                  class="mr-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                >
                  Enviar
                </button>
                <button type="button" @click="toggleForm"
                    class="cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Sección de tabla donde se listarán los servicios -->
        <div v-if="!showForm" class="overflow-x-auto overflow-y-auto max-h-[700px] rounded-lg shadow-lg border border-gray-200">
          <table class="min-w-full bg-white divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-blue-800 to-blue-600 sticky top-0 z-10">
                <tr>
                    <th class="py-4 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">#
                    </th>
                    <th class="py-4 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Testigo</th>
                    <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Descripción</th>
                    <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Fecha</th>
                    <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">
                      Calificación</th>
                    <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Estado</th>
                    <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Acciones</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <!-- Verificar si hay servicios para mostrar -->
              <tr v-if="testimonies.length === 0">
                  <td colspan="7" class="py-4 px-6 text-center text-sm font-medium text-gray-900">
                      No hay servicios testimonios para mostrar.
                  </td>
              </tr>
              <!-- Iterar a través de los servicios -->
              <tr v-for="testimonies in testimonie" :key="service.id"></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'Testimonies',
    data() {
      return {
        showForm: false,  // Controla el estado del formulario
        testimonies: [],
        newTestimonio: {      // Datos para el nuevo testimonio
          name: '',
          description: '',
          image: '', // Estado predeterminado en 'activo' (true)
          date: '',
          calification: ''
        },
      };
    },
    methods: {
      // Método para alternar la visibilidad del formulario
      toggleForm() {
        this.showForm = !this.showForm;
        // Si se cierra el formulario, reiniciar los campos
        if (!this.showForm) {
            this.newTestimonio = { name: '', description: '', image: ''};
        }
      },
    },
  };
  </script>
  