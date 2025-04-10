<template>
    <div class="bg-[#F8F0E6]">
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-[#37383A] shadow p-4 text-white">
            <div class="container mx-auto flex items-center justify-between">
                <!-- Logo -->
                <div>
                    <img src="@/assets/logo/LOGO_AXAN.png" alt="MiLogo" class="h-10 w-auto" />
                </div>

                <!-- 🔥 Botón Hamburguesa (solo en móviles) -->
                <button @click="showMenu = !showMenu" class="md:hidden text-white text-2xl focus:outline-none">
                    <i class="fas" :class="showMenu ? 'fa-times' : 'fa-bars'"></i>
                </button>

                <!-- 🔥 Navegación (Desktop) -->
                <nav class="hidden md:flex space-x-6">
                    <a href="#nosotros" class="text-[#BCC1C7] hover:text-white font-medium">Nosotros</a>
                    <a href="#servicios" class="text-[#BCC1C7] hover:text-white font-medium">Servicios</a>
                    <a href="#testimonios" class="text-[#BCC1C7] hover:text-white font-medium">Testimonios</a>
                    <a href="#contacto" class="text-[#BCC1C7] hover:text-white font-medium">Contacto</a>
                </nav>

                <!-- Botón de búsqueda -->
                <button
                    class="cursor-pointer hidden md:block bg-white text-[#37383A] px-4 py-2 rounded hover:bg-[#F8F0E6]">
                    Buscar
                </button>
            </div>

            <!-- Menú Móvil -->
            <div v-if="showMenu" class="md:hidden mt-4 px-4 space-y-3">
                <a href="#nosotros" @click="showMenu = false"
                    class="block text-[#BCC1C7] hover:text-white font-medium">Nosotros</a>
                <a href="#servicios" @click="showMenu = false"
                    class="block text-[#BCC1C7] hover:text-white font-medium">Servicios</a>
                <a href="#testimonios" @click="showMenu = false"
                    class="block text-[#BCC1C7] hover:text-white font-medium">Testimonios</a>
                <a href="#contacto" @click="showMenu = false"
                    class="block text-[#BCC1C7] hover:text-white font-medium">Contacto</a>
                <button class="w-full bg-white text-[#37383A] px-4 py-2 rounded hover:bg-[#F8F0E6]">
                    🔍 Buscar
                </button>
            </div>
        </header>

        <!-- Imagen sobre la sección de Nosotros -->
        <div class="relative">
            <img src="@/assets/images/banner.jpg" alt="Construcción de techo"
                class="w-full h-90 object-cover rounded-b-2xl shadow-lg" />
        </div>

        <!-- Sección: Nosotros -->
        <section id="nosotros" class="py-16 bg-gray-50">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-4">Sobre Nosotros</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    Somos un equipo apasionado por brindar soluciones personalizadas y de alta calidad para ayudarte a
                    alcanzar tus metas.
                </p>
            </div>
        </section>

        <!-- Sección: Servicios -->
        <section id="servicios" class="py-16">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-10">Nuestros Servicios</h2>
                <!-- Mostrar los servicios una vez que los datos sean cargados -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="(servicio, index) in servicios" :key="index"
                        class="p-6 bg-white shadow-lg rounded-2xl transition-transform transform hover:scale-105">
                        <!-- Imagen del servicio -->
                        <div class="mb-4">
                            <img src="@/assets/logo/LOGO_AXAN.png" alt="Imagen de servicio"
                                class="w-full h-48 object-cover rounded-t-2xl shadow-lg" />
                        </div>

                        <!-- Nombre y precio del servicio -->
                        <h3 class="text-xl font-semibold mb-2">{{ servicio.name }}</h3>
                        <p class="text-gray-600">
                            {{ Number(servicio.price).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sección: Testimonios -->
        <section id="testimonios" class="py-16 bg-gray-100">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-10">Testimonios</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-white p-6 shadow rounded">
                        <p class="italic text-gray-700">"Un servicio excelente, superó nuestras expectativas."</p>
                        <h4 class="mt-4 font-semibold">– Cliente A</h4>
                    </div>
                    <div class="bg-white p-6 shadow rounded">
                        <p class="italic text-gray-700">"Muy profesionales y atentos a los detalles."</p>
                        <h4 class="mt-4 font-semibold">– Cliente B</h4>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sección: Contacto -->
        <section id="contacto" class="py-16">
            <div class="container mx-auto px-4 max-w-xl">
                <h2 class="text-3xl font-bold text-center mb-6">Contacto</h2>
                <form class="space-y-4">
                    <input type="text" placeholder="Nombre" class="w-full p-3 border border-gray-300 rounded" />
                    <input type="email" placeholder="Correo electrónico"
                        class="w-full p-3 border border-gray-300 rounded" />
                    <textarea placeholder="Mensaje" rows="5"
                        class="w-full p-3 border border-gray-300 rounded"></textarea>
                    <button type="submit" class="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
                        Enviar Mensaje
                    </button>
                </form>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-[#37383A] text-[#BCC1C7] py-8 mt-16">
            <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div class="flex justify-center items-center"> <!-- Usamos flex para centrar -->
                    <!-- Imagen que se ajusta según el tamaño de la pantalla -->
                    <img src="@/assets/logo/LOGO_AXAN.png" alt="MiLogo" class="w-auto h-30 sm:h-16 md:h-35 mb-2" />
                </div>

                <div>
                    <h4 class="font-semibold mb-2 text-white">Enlaces</h4>
                    <ul class="space-y-1">
                        <li><a href="#nosotros" class="hover:text-white">Nosotros</a></li>
                        <li><a href="#servicios" class="hover:text-white">Servicios</a></li>
                        <li><a href="#testimonios" class="hover:text-white">Testimonios</a></li>
                        <li><a href="#contacto" class="hover:text-white">Contacto</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-semibold mb-2 text-white">Síguenos</h4>
                    <div class="flex justify-center md:justify-start space-x-4 text-2xl">
                        <a href="#" class="hover:text-white"><i class="fab fa-facebook"></i></a>
                        <a href="#" class="hover:text-white"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="hover:text-white"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center text-sm text-[#BCC1C7]">
                &copy; 2025 AXAN. Todos los derechos reservados.
            </div>
        </footer>

    </div>
</template>

<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
export default {
    name: 'Home',
    data() {
        return {
            showMenu: false,
            servicios: [],
        };
    },
    mounted() {
        this.fetchServicios();  // Llamar a la función cuando el componente se haya montado
    },
    methods: {
        async fetchServicios() {
            try {
                const response = await axios.get("http://localhost:8080/api/services");  // Cambia esta URL por la de tu API
                this.servicios = response.data.services;
            } catch (error) {
                console.error("Error al cargar los servicios:", error);
            }
        },
    },

};
</script>
