<template>
  <div class="p-6 bg-gray-50 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Contactos</h2>

    <!-- Tabla de contactos -->
    <div class="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
      <table class="min-w-full bg-white divide-y divide-gray-200">
        <thead class="bg-gradient-to-r from-blue-800 to-blue-600">
          <tr>
            <th class="py-4 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">#</th>
            <th class="py-4 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
            <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">Teléfono</th>
            <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">Email</th>
            <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">Mensaje</th>
            <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">Estado</th>
            <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(contact, index) in contacts" :key="contact.id" class="hover:bg-blue-50 transition-colors duration-200">
            <td class="py-4 px-6 text-sm font-medium text-gray-900">{{ index + 1 }}</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-800">{{ contact.name }}</td>
            <td class="py-4 px-6 text-sm font-medium text-center text-gray-800">{{ contact.phone }}</td>
            <td class="py-4 px-6 text-sm font-medium text-center text-gray-800">{{ contact.email }}</td>
            <td class="py-4 px-6 text-sm font-medium text-center text-gray-800">{{ contact.message }}</td>
            <td class="py-4 px-6 text-sm font-medium text-center text-gray-800">
              {{ contact.status ? 'Por contactar' : 'Contactado' }}
            </td>
            <td class="py-4 px-6 text-sm font-medium text-center text-gray-800">
              <div class="relative group">
                    <!-- Botón para desactivar o activar servicio -->
                    <button @click="contactService(contact.id)" :class="{
                        'bg-red-500 hover:bg-red-600': contact.status === true,  // Si está activo
                        'bg-green-500 hover:bg-green-600': contact.status === false  // Si está inactivo
                    }"
                        class="cursor-pointer px-4 py-2 text-white rounded-md transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <span class="flex items-center justify-center">
                            <!-- Si el servicio está activo (status === true) muestra una X -->
                            <svg v-if="contact.status === true" xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            <!-- Si el servicio está inactivo (status === false) muestra un check -->
                            <svg v-if="contact.status === false" xmlns="http://www.w3.org/2000/svg"
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
                        {{ contact.status === true ? 'Por contactar' : 'contactado' }}
                        
                        <!-- Flechita -->
                        <div class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rotate-45 z-[-1]"></div>
                    </div>
                </div>
            </td>
          </tr>

          <!-- Mensaje si no hay contactos -->
          <tr v-if="contacts.length === 0">
            <td colspan="6" class="py-8 px-6 text-center text-gray-500 italic">No hay contactos disponibles</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contacts: [],
    };
  },
  mounted() {
    this.getContacts();
  },
  methods: {
    async getContacts() {
      try {
        const response = await axios.get("http://localhost:8080/api/contacts");
        if (response.data.status === 200) {
          this.contacts = response.data.contacts;
        }
      } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los contactos'); // O usa algún sistema de notificación si tienes uno
      }
    },
    async contactService(idContact){
      try {
          const response = await axios.put(`http://localhost:8080/api/contacts/${idContact}/deactivate`);
          if (response.status === 200) {
              this.getContacts();
              this.$notifier.success('Cambio de estado correctamente');
          } else {
              this.$notifier.alert('Error al cambiar de estado');
          }
      } catch (error) {
          console.error('Error al cambiar de estado:', error);
      }
    }
  }
};
</script>
