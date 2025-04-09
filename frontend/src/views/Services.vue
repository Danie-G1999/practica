<template>
    <div>
        <div class="p-6 rounded-lg shadow-lg bg-gray-50">
            <!-- Titulo de seccion -->
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">{{ showForm ? 'Editar Servicio' : 'Servicios' }}</h2>
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

            <!-- Formulario para añadir servicio -->
            <div v-if="showForm" class="bg-white p-6 rounded-lg shadow-lg">
                <!-- <h3 class="text-2xl font-bold mb-4">Nuevo Servicio</h3> -->

                <form class="max-w-md mx-auto" @submit.prevent="editingService ? serviceEditing() : addService()">
                    <!-- Campo para el Nombre del Servicio -->
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="service_name" id="service_name" v-model="newService.name"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required />
                        <label for="service_name"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre
                            del Servicio</label>
                    </div>

                    <!-- Campo para el Precio -->
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="number" name="service_price" id="service_price" v-model="newService.price"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required />
                        <label for="service_price"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Precio</label>
                    </div>

                    <!-- Campo para la Descripción -->
                    <div class="relative z-0 w-full mb-5 group">
                        <textarea name="service_description" id="service_description" v-model="newService.descripcion"
                            rows="4"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required></textarea>
                        <label for="service_description"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripción</label>
                    </div>

                    <!-- Toggle para el estado del servicio (activo / inactivo) -->
                    <div class="relative z-0 w-full mb-5 group">
                        <label class="inline-flex items-center mb-5 cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" v-model="newService.status">
                            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">Inactivo</span>
                            <div
                                class="mx-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
                            </div>
                        </label>
                        <label class="inline-flex items-center mb-5 cursor-pointer">
                            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">Activo</span>
                        </label>
                    </div>

                    <!-- Botón para enviar el formulario -->
                    <div class="flex">

                        <button type="submit"
                            class="mr-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {{ editingService ? 'Actualizar Servicio' : 'Guardar Servicio' }}
                        </button>
                        <button type="button" @click="toggleForm"
                            class="cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

            <!-- Sección de tabla donde se listarán los servicios -->
            <div v-if="!showForm" class="overflow-x-auto overflow-y-auto max-h-[700px] rounded-lg shadow-lg border border-gray-200">
                <table class="min-w-full bg-white divide-y divide-gray-200">
                    <thead class="bg-gradient-to-r from-blue-800 to-blue-600 sticky top-0 z-10">
                        <tr>
                            <th class="py-4 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">#
                            </th>
                            <th class="py-4 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Servicio</th>
                            <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">
                                Descripción</th>
                            <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">
                                Precio</th>
                            <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">
                                Estado</th>
                            <th class="py-4 px-6 text-center text-xs font-medium text-white uppercase tracking-wider">
                                Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <!-- Verificar si hay servicios para mostrar -->
                        <tr v-if="services.length === 0">
                            <td colspan="6" class="py-4 px-6 text-center text-sm font-medium text-gray-900">
                                No hay servicios disponibles para mostrar.
                            </td>
                        </tr>
                        <!-- Iterar a través de los servicios -->
                        <tr v-for="service in services" :key="service.id">
                            <td class="py-4 px-6 text-sm font-medium text-gray-900">{{ service.id }}</td>
                            <td class="py-4 px-6 text-sm font-medium text-gray-900">{{ service.name }}</td>
                            <td class="py-4 px-6 text-sm font-medium text-center text-gray-900">{{ service.descripcion
                            }}</td>
                            <td class="py-4 px-6 text-sm font-medium text-center text-gray-900">
                                {{ Number(service.price).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
                            </td>
                            <td class="py-4 px-6 text-sm font-medium text-center text-gray-900">{{ service.status ?
                                'Activo'
                                : 'Inactivo' }}</td>
                            <td class="py-4 px-6 text-sm text-center flex justify-center">
                                <div class="relative group">
                                    <!-- Botón -->
                                    <button @click="editService(service)" class="mr-2 cursor-pointer px-4 py-2 bg-amber-500 text-white rounded-md 
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
                                        Editar servicio
                                        <!-- Flechita -->
                                        <div class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rotate-45 z-[-1]"></div>
                                    </div>
                                </div>


                                <div class="relative group">
                                    <!-- Botón para desactivar o activar servicio -->
                                    <button @click="deactivateService(service.id)" :class="{
                                        'bg-red-500 hover:bg-red-600': service.status === true,  // Si está activo
                                        'bg-green-500 hover:bg-green-600': service.status === false  // Si está inactivo
                                    }"
                                        class="cursor-pointer px-4 py-2 text-white rounded-md transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        <span class="flex items-center justify-center">
                                            <!-- Si el servicio está activo (status === true) muestra una X -->
                                            <svg v-if="service.status === true" xmlns="http://www.w3.org/2000/svg"
                                                class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>

                                            <!-- Si el servicio está inactivo (status === false) muestra un check -->
                                            <svg v-if="service.status === false" xmlns="http://www.w3.org/2000/svg"
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
                                        {{ service.status === true ? 'Desactivar servicio' : 'Activar servicio' }}
                                        
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
    name: 'Services',
    data() {
        return {
            showForm: false,  // Controla el estado del formulario
            services: [],      // Almacenará los servicios
            editingService: false,
            newService: {      // Datos para el nuevo servicio
                name: '',
                descripcion: '',
                price: '',
                status: true  // Estado predeterminado en 'activo' (true)
            },
        };
    },
    methods: {
        // Método para alternar la visibilidad del formulario
        toggleForm() {
            this.showForm = !this.showForm;
            // Si se cierra el formulario, reiniciar los campos
            if (!this.showForm) {
                this.newService = { name: '', description: '', price: '', status: true };
            }
        },
        // Método para cargar los servicios desde la API
        async loadServices() {
            try {
                const response = await axios.get('http://localhost:8080/api/services');
                if (response.data.services && response.data.services.length > 0) {
                    this.services = response.data.services;
                } else {
                    this.services = [];
                }
            } catch (error) {
                console.error('Error al cargar los servicios:', error);
                this.services = [];
            }
        },
        // Método para agregar un nuevo servicio
        async addService() {
            try {
                const response = await axios.post('http://localhost:8080/api/createService', this.newService);
                this.services.push(response.data.service);  // Añadir el nuevo servicio a la lista
                console.log(response.data)
                if (response.data.status === 200) {
                    this.$notifier.success('Servicio agregado correctamente');
                } else {
                    this.$notifier.alert('Error al agregar el servicio');
                }
                this.toggleForm();  // Cerrar el formulario
            } catch (error) {
                console.error('Error al añadir el servicio:', error);
            }
        },
        // Método para manejar la edición de un servicio y cambiar la vista
        editService(service) {
            this.showForm = true;
            this.editingService = true;
            this.newService = { ...service };
            // Aquí podrías agregar lógica para abrir un formulario de edición
        },
        async serviceEditing() {
            try {

                // Realizar la petición PUT para actualizar el servicio
                const response = await axios.put(`http://localhost:8080/api/EditServices/${this.newService.id}`, this.newService);

                console.log(response.data)
                // Actualizamos la lista de una vez
                const index = this.services.findIndex(service => service.id === this.newService.id);
                if (index !== -1) {
                    this.services[index] = response.data.service;
                }
                if (response.data.status === 200) {
                    this.$notifier.success('Servicio actualizado correctamente');
                } else {
                    this.$notifier.alert('Error al actualizar el servicio');
                }

                // Resetear el formulario después de la actualización
                this.resetForm();
            } catch (error) {
                console.error("Error al actualizar el servicio:", error);
            }
        },
        // Resetear el formulario y volver a modo de agregar
        resetForm() {
            this.newService = { id: null, name: '', descripcion: '', price: '', status: true };
            this.editingService = false;
            this.showForm = false;
        },
        // Método para desactivar un servicio
        async deactivateService(serviceId) {
            try {
                const response = await axios.put(`http://localhost:8080/api/services/${serviceId}/deactivate`);
                if (response.status === 200) {
                    this.loadServices();
                    this.$notifier.success('Servicio desactivado correctamente');
                } else {
                    this.$notifier.alert('Error al desactivar el servicio');
                }
            } catch (error) {
                console.error('Error al desactivar el servicio:', error);
            }
        },
    },
    created() {
        this.loadServices();
    },
    filters: {
        currency(value) {
            if (!value) return '$0.00';
            return '$' + parseFloat(value).toFixed(2);
        }
    }
};
</script>

<style scoped>
/* No se necesitan estilos adicionales para el toggle, ya que estamos usando un diseño estándar */
</style>