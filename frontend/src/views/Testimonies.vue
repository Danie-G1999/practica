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

            <form class="space-y-6" @submit.prevent="editingTestimonies ? testimonieEdit() : addTestimonio()">
              <!-- Testigo -->
              <div>
                <label class="block mb-1 text-gray-700 font-medium">Testigo</label>
                <input
                  required
                  v-model="newTestimonio.name"
                  type="text"
                  placeholder="Nombre del testigo"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <!-- Descripción -->
              <div>
                <label class="block mb-1 text-gray-700 font-medium">Descripción</label>
                <textarea
                  required
                  v-model="newTestimonio.descripcion"
                  rows="4"
                  placeholder="Escribe aquí la experiencia..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <!-- Fecha -->
              <div>
                <label class="block mb-1 text-gray-700 font-medium">Fecha</label>
                <input
                  required
                  v-model="newTestimonio.date"
                  type="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <!-- Calificación -->
              <div>
                <label class="block mb-1 text-gray-700 font-medium">Calificación</label>
                <select
                  v-model="newTestimonio.calification"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option disabled value="">Selecciona una opción</option>
                  <option value="1">1 - Muy Malo</option>
                  <option value="2">2 - Malo</option>
                  <option value="3">3 - Regular</option>
                  <option value="4">4 - Bueno</option>
                  <option value="5">5 - Excelente</option>
                </select>
              </div>

              <!-- Imagen -->
              <div>
                <label class="block mb-1 text-gray-700 font-medium">Foto (opcional)</label>
                <input
                  type="file"
                  accept="image/*"
                  @change="convertImageToBase64"
                  class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
                <div v-if="newTestimonio.image" class="mt-2">
                  <img :src="newTestimonio.image" alt="Preview" class="w-24 h-24 object-cover rounded-lg border" />
                </div>
              </div>

              <!-- Botones -->
              <div class="flex justify-center gap-4">
                <button
                  type="submit"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                >
                  Enviar
                </button>
                <button
                  type="button"
                  @click="toggleForm"
                  class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                >
                  Cancelar
                </button>
              </div>
          </form>

          </div>
        </div>

        <!-- Sección de tabla donde se listarán los testimonios -->
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
                    <!-- <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Estado</th> -->
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
              <tr v-for="testimonie in testimonies" :key="testimonie.id">
                <td class="py-4 px-6 text-sm font-medium text-gray-900">{{ testimonie.id }}</td>
                <td class="py-4 px-6 text-sm font-medium text-gray-900">{{ testimonie.name }}</td>
                <td 
                  class="py-4 px-6 text-sm font-medium text-center text-gray-900 max-w-[250px] max-h-[100px] overflow-hidden text-ellipsis break-words"
                >
                  {{ testimonie.descripcion }}
                </td>
                <td class="py-4 px-6 text-sm font-medium text-center text-gray-900">
                  {{ new Date(testimonie.date).toLocaleDateString('es-ES') }}
                </td>
                <td class="py-4 px-6 text-sm font-medium text-center text-gray-900">{{ testimonie.calification}}/5</td>
                <td class="py-4 px-6 text-sm text-center flex justify-center">
                  <div class="relative group">
                    <!-- Botón -->
                    <button @click="editTestimonies(testimonie)" class="mr-2 cursor-pointer px-4 py-2 bg-amber-500 text-white rounded-md 
                        hover:bg-amber-600 hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                        <span class="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </span>
                    </button>
                    <!-- Tooltip -->
                    <div class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs font-bold py-1 px-2 rounded shadow-lg transition-opacity duration-300 pointer-events-none z-50">
                        Editar
                        <!-- Flechita -->
                        <div class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rotate-45 z-[-1]"></div>
                    </div>
                  </div>
                  <div class="relative group">
                    <!-- Botón para desactivar o activar servicio -->
                    <button @click="deactivateTestimonie(testimonie.id)" :class="{
                        'bg-red-500 hover:bg-red-600': testimonie.status === true,  // Si está activo
                        'bg-green-500 hover:bg-green-600': testimonie.status === false  // Si está inactivo
                    }"
                        class="cursor-pointer px-4 py-2 text-white rounded-md transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <span class="flex items-center justify-center">
                            <!-- Si el servicio está activo (status === true) muestra una X -->
                            <svg v-if="testimonie.status === true" xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            <!-- Si el servicio está inactivo (status === false) muestra un check -->
                            <svg v-if="testimonie.status === false" xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                    </button>

                    <!-- Tooltip -->
                    <div
                        class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs font-bold py-1 px-2 rounded shadow-lg transition-opacity duration-300 pointer-events-none z-50"
                    >
                        {{ testimonie.status === true ? 'Desactivar' : 'Activar' }}
                        
                        <!-- Flechita -->
                        <div class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rotate-45 z-[-1]"></div>
                    </div>
                </div>
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>


<script>
import axios from 'axios';

  export default {
    name: 'Testimonies',
    data() {
      return {
        showForm: false,  // Controla el estado del formulario
        testimonies: [],
        editingTestimonies: false,
        newTestimonio: {      // Datos para el nuevo testimonio
          name: '',
          descripcion: '',
          image: '',
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
            this.newTestimonio = { name: '', descripcion: '', image: '', date: '', calification: ''};
        }
      },
      editTestimonies(testimonie) {
        this.showForm = true;
        this.editingTestimonies = true;
        const formattedDate = new Date(testimonie.date).toISOString().split('T')[0];
        this.newTestimonio = {
          ...testimonie,
          date: formattedDate
        };
      },
      async deactivateTestimonie(TestimonieID){
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
          const response = await axios.put(`${apiUrl}/testimonials/${TestimonieID}/deactivate`);
          
          if (response.status === 200) {
            this.loadTestimonies(); // Recarga la lista de testimonios
            this.$notifier.success('Testimonio desactivado correctamente');
          } else {
            this.$notifier.alert('Error al desactivar el testimonio');
          }
        } catch (error) {
          console.error('Error al desactivar el testimonio:', error);
          this.$notifier.alert('Error al desactivar el testimonio');
        }
      },
      async testimonieEdit(){
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
          // Realizar la petición PUT para actualizar el testimonio
          const response = await axios.put(
            `${apiUrl}/api/testimonials/${this.newTestimonio.id}`,
            this.newTestimonio
          );

          // Actualizamos la lista local de testimonios
          const index = this.testimonies.findIndex(t => t.id === this.newTestimonio.id);
          if (index !== -1) {
            this.testimonies[index] = response.data.testimonial;
          }

          // Mostrar notificación según respuesta
          if (response.data.status === 200) {
            this.$notifier.success('Testimonio actualizado correctamente');
          } else {
            this.$notifier.alert('Error al actualizar el testimonio');
          }

          // Limpiar el formulario y salir del modo de edición
          this.resetForm();
        } catch (error) {
          console.error("Error al actualizar el testimonio:", error);
          this.$notifier.alert('Error al actualizar el testimonio');
        }
      },
      resetForm() {
            this.newTestimonio = { id: null, name: '', descripcion: '', price: '', status: true };
            this.editingTestimonies = false;
            this.showForm = false;
        },
      async loadTestimonies() {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
          const response = await axios.get(`${apiUrl}/api/testimonials`);

          if (response.data.status === 200) {
            this.testimonies = response.data.testimonies;
          } else {
            this.$notifier.alert('Error al cargar los testimonios');
          }
        } catch (error) {
          console.error('Error al cargar testimonios:', error);
          this.$notifier.alert('No se pudieron cargar los testimonios');
        }
      },
      async addTestimonio() {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
          const response = await axios.post(`${apiUrl}/api/testimonials`, this.newTestimonio);

          // Si tu backend responde con el testimonio guardado:
          if (response.status === 200 || response.status === 201) {
            this.testimonies.push(response.data.testimonial);
            console.log(this.testimonies)
            this.$notifier.success('Testimonio agregado correctamente');
            this.toggleForm();
          } else {
            this.$notifier.alert('Error al agregar el testimonio');
          }
        } catch (error) {
          console.error(error);
          this.$notifier.alert('Error al agregar testimonio');
        }
      },
      convertImageToBase64(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          this.newTestimonio.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
    },
    created() {
        this.loadTestimonies();
    },
  };
  </script>
  