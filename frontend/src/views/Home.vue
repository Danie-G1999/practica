<template>
    <div class="bg-[#F8F0E6]">
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-[#2E2F31] shadow p-4 text-[#BCC1C7]">
            <div class="container mx-auto flex items-center justify-between">
                <!-- Logo -->
                <div>
                <img src="@/assets/logo/LOGO_AXAN.png" alt="MiLogo" class="h-10 w-auto" />
                </div>

                <!-- Navegación -->
                <nav class="hidden md:flex space-x-6">
                <a href="#nosotros" class="hover:text-white">Nosotros</a>
                <a href="#servicios" class="hover:text-white">Servicios</a>
                <a href="#testimonios" class="hover:text-white">Testimonios</a>
                <a href="#contacto" class="hover:text-white">Contacto</a>
                </nav>

                <!-- Botón Hamburguesa para móvil -->
               <button
               @click="showMenu = !showMenu"
               class="md:hidden text-white text-2xl focus:outline-none"
               >
               <span v-if="!showMenu">☰</span>
               <span v-else class="text-white">✖</span>
               </button>
                <!-- Botón de búsqueda -->
                <!-- <button class="cursor-pointer hidden md:block bg-white text-[#2E2F31] px-4 py-2 rounded hover:bg-[#F8F0E6]">
                Buscar
                </button> -->
            </div>

            <!-- Menú Móvil -->
            <div v-if="showMenu" class="md:hidden mt-4 px-4 space-y-3">
                <a href="#nosotros" @click="showMenu = false" class="block">Nosotros</a>
                <a href="#servicios" @click="showMenu = false" class="block">Servicios</a>
                <a href="#testimonios" @click="showMenu = false" class="block">Testimonios</a>
                <a href="#contacto" @click="showMenu = false" class="block">Contacto</a>
            </div>
        </header>



        <!-- Imagen sobre la sección de Nosotros -->
        <div class="w-full">
            <ImageSlider />
        </div>

        <!-- Sección: Nosotros -->
        <section id="nosotros" class="py-20 bg-gradient-to-r from-indigo-50 to-white">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-extrabold text-center text-black mb-12" style="font-family: 'Montserrat', sans-serif;">
                Nuestra Esencia
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <!-- Misión -->
                <div class="cursor-pointer bg-white shadow-xl rounded-lg p-8 transform hover:scale-105 transition duration-300">
                    <div class="flex items-center justify-center mb-4">
                    <!-- <img src="/icons/mission-icon.svg" alt="Misión" class="w-16 h-16"> -->
                    </div>
                    <h3 class="text-2xl font-semibold text-center text-black mb-2" style="font-family: 'Montserrat', sans-serif;">Misión</h3>
                    <p class="text-black text-center" style="font-family: 'Source Sans Pro', sans-serif;">
                        Transformar espacios con precisión, innovación y elegancia,
                        ofreciendo soluciones en construcción y reformas con pladur
                        que combinan diseño, funcionalidad y excelencia.
                        Nos comprometemos con la calidad, la puntualidad y
                        la satisfacción del cliente, creando ambientes
                        sofisticados y atemporales
                    </p>
                </div>

                <!-- Visión -->
                <div class="cursor-pointer bg-white shadow-xl rounded-lg p-8 transform hover:scale-105 transition duration-300">
                    <div class="flex items-center justify-center mb-4">
                    <!-- <img src="/icons/vision-icon.svg" alt="Visión" class="w-16 h-16"> -->
                    </div>
                    <h3 class="text-2xl font-semibold text-center text-black mb-2" style="font-family: 'Montserrat', sans-serif;">Visión</h3>
                    <p class="text-black text-center" style="font-family: 'Source Sans Pro', sans-serif;">
                        Ser el referente en reformas con pladur en España y Europa,
                        elevando los estándares de calidad y diseño.
                        Aspiramos a transformar cada proyecto en una obra maestra,
                        fusionando innovación, eficiencia y estética para redefinir
                        la manera en que se experimentan los espacios.
                    </p>
                </div>
                </div>
            </div>
        </section>



        <!-- Sección: Servicios -->
        <section id="servicios" class="py-16">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-10" style="font-family: 'Montserrat', sans-serif;">Nuestros Servicios</h2>
                <p class="text-black text-center mb-10" style="font-family: 'Montserrat', sans-serif;">
                    Nuestra labor se caracteriza por la pasión, el compromiso, la innovación y el enfoque detallado. Estos son solo algunos de los principios que guían a nuestro equipo, conformado por interioristas, arquitectos, coordinadores de proyectos, jefes de obra y colaboradores estratégicos.
                </p>
                <!-- Mostrar los servicios una vez que los datos sean cargados -->
                <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <TransitionGroup name="fade" tag="div" class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        <div
                            v-for="(servicio, index) in visibleServices"
                            :key="currentServiceIndex + '-' + index"
                            class="p-6 bg-white shadow-lg rounded-2xl transition-transform transform hover:scale-105"
                        >
                            <div class="mb-4">
                            <img
                                src="@/assets/logo/LOGO_AXAN.png"
                                alt="Imagen de servicio"
                                class="w-full h-48 object-cover rounded-t-2xl shadow-lg"
                            />
                            </div>
                            <h3 class="text-xl font-semibold mb-2" style="font-family: 'Montserrat', sans-serif;">
                            {{ servicio.name }}
                            </h3>
                            <p class="text-gray-600">
                            {{ Number(servicio.price).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
                            </p>
                        </div>
                    </TransitionGroup>
                </div>
            </div>
        </section>

        <!-- Sección: Testimonios -->
        <section id="testimonios" class="py-20 bg-gray-100">
            <div class="container mx-auto px-6">
                
                <h2 class="text-4xl font-extrabold text-center text-black mb-12" style="font-family: 'Montserrat', sans-serif;">
                Testimonios
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <!-- Columna izquierda -->
                    <div>
                        <h3 class="text-2xl font-semibold mb-4" style="font-family: 'Montserrat', sans-serif;">Lo que dicen nuestros clientes</h3>
                        <p class="text-gray-700 text-lg leading-relaxed" style="font-family: 'Source Sans Pro', sans-serif;">
                        Aquí se reflejan los testimonios sobre nuestro excelente trabajo y la dedicación con la que convertimos los sueños de nuestros clientes en realidad. Sus palabras son el mejor reflejo del compromiso, la calidad y la pasión que ponemos en cada proyecto.
                        </p>
                    </div>

                    <!-- Columna derecha con slider -->
                    <div class="grid grid-cols-1 md:grid-cols-1 gap-6">

                        <div class="relative w-full max-w-2xl mx-auto">
                            <!-- Tarjeta actual -->
                            <Transition name="fade" mode="out-in">
                            <TestimonialSlider
                                v-bind="testimonials[currentIndex]"
                                :key="currentIndex"
                            />
                            </Transition>

                            <!-- Botones de navegación -->
                            <div class="flex justify-between mt-6 px-4">
                            <button
                                @click="prevSlide"
                                class="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                            >
                                ←
                            </button>
                            <button
                                @click="nextSlide"
                                class="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                            >
                                →
                            </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>


        <!-- Sección: Contacto -->
        <section id="contacto" class="py-16">
            <div class="container mx-auto px-4 max-w-xl">
                <h2 class="text-3xl font-bold text-center mb-6" style="font-family: 'Montserrat', sans-serif;">Contacto</h2>
                <form class="space-y-4" @submit.prevent="addContact">
                    <input type="text" placeholder="Nombre" class="w-full p-3 border border-gray-300 rounded" v-model="contact.name" />
                    <input type="email" placeholder="Correo electrónico" v-model="contact.email"
                        class="w-full p-3 border border-gray-300 rounded"  />
                    <input type="tel" placeholder="Número celular" v-model="contact.phone" maxlength="15"
                        class="w-full p-3 border border-gray-300 rounded" />
                    <textarea placeholder="Mensaje" rows="5" v-model="contact.message"
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

                <div style="font-family: 'Montserrat', sans-serif;">
                    <h4 class="font-semibold mb-2 text-white">Enlaces</h4>
                    <ul class="space-y-1" >
                        <li><a href="#nosotros" class="hover:text-white">Nosotros</a></li>
                        <li><a href="#servicios" class="hover:text-white">Servicios</a></li>
                        <li><a href="#testimonios" class="hover:text-white">Testimonios</a></li>
                        <li><a href="#contacto" class="hover:text-white">Contacto</a></li>
                        <li><a href="/" target="_blank" class="hover:text-white">Administracion</a></li>
                    </ul>
                </div>

                <div style="font-family: 'Montserrat', sans-serif;">
                    <h4 class="font-semibold mb-2 text-white">Síguenos</h4>
                    <div class="flex justify-center md:justify-start space-x-4 text-2xl">
                        <a href="https://facebook.com" target="_blank" class="hover:text-white"><i class="fab fa-facebook"></i></a>
                        <a href="https://www.instagram.com/reformas_pladur_axan" target="_blank" class="hover:text-white"><i class="fab fa-instagram"></i></a>
                        <a href="https://api.whatsapp.com/send?phone=34633712501" target="_blank" class="hover:text-white"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center text-sm text-[#BCC1C7]" style="font-family: 'Montserrat', sans-serif;">
                &copy; 2025 AXAN. Todos los derechos reservados.
            </div>
        </footer>

    </div>
</template>

<script>
import axios from 'axios';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import ImageSlider from '@/components/ImageSlider.vue';
import TestimonialSlider from '@/components/TestimonialSlider.vue';


export default {
    
  name: 'Home',
  components: {
    ImageSlider,
    TestimonialSlider
  },
  data() {
    return {
      showMenu: false,
      servicios: [],
      currentIndex: 0,
      currentServiceIndex: 0,
      visibleCount: 1, // Por defecto mostramos 1
      intervalId: null,
      testimonials: [],
      contact: {
        name: '', email: '', phone: '', message: '' 
      }
    };
  },
  computed: {
    visibleServices() {
      return this.servicios.slice(this.currentServiceIndex, this.currentServiceIndex + this.visibleCount)
    }
  },
  mounted() {
    this.autoplay = setInterval(this.nextSlide, 6000); // autoplay opcional

    this.fetchServicios()
    this.getTestimonies()
    this.updateVisibleCount()
    window.addEventListener('resize', this.updateVisibleCount)
    this.contact = {
        name: '', email: '', phone: '', message: '' 
      }

    this.intervalId = setInterval(this.autoAdvance, 4000)
  },
  beforeUnmount() {
    clearInterval(this.intervalId)
    window.removeEventListener('resize', this.updateVisibleCount)
  },
  beforeUnmount() {
    clearInterval(this.autoplay);
  },
  methods: {
    async addContact() {
        try {
            const response = await axios.post('http://localhost:8080/api/contact', this.contact);

            if (response.status === 200) {
            this.$notifier.success('Mensaje enviado correctamente');
            // Limpiar el formulario si se desea
            this.contact = {
                name: '',
                email: '',
                phone: '',
                message: ''
            };
            } else {
            this.$notifier.alert('Hubo un problema al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error al enviar el contacto:', error);
            this.$notifier.alert('Error al enviar el contacto');
        }
    },
    updateVisibleCount() {
      this.visibleCount = window.innerWidth >= 768 ? 3 : 1
    },
    autoAdvance() {
      if (this.servicios.length <= this.visibleCount) return

      this.currentServiceIndex += this.visibleCount
      if (this.currentServiceIndex >= this.servicios.length) {
        this.currentServiceIndex = 0
      }
    },
    async fetchServicios() {
      try {
        const response = await axios.get("http://localhost:8080/api/services");
        this.servicios = response.data.services;
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      }
    },
    async getTestimonies(){
        try {
          const response = await axios.get('http://localhost:8080/api/testimonialsActive');

          if (response.data.status === 200) {
            this.testimonials = response.data.testimonies;
            console.log(this.testimonials)
          } else {
            this.$notifier.alert('Error al cargar los testimonios');
          }
        } catch (error) {
          console.error('Error al cargar testimonios:', error);
          this.$notifier.alert('No se pudieron cargar los testimonios');
        }
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    },
    nextService() {
        this.currentServiceIndex =
        (this.currentServiceIndex + 1) % this.servicios.length;
    },
    prevService() {
        this.currentServiceIndex =
        (this.currentServiceIndex - 1 + this.servicios.length) % this.servicios.length;
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>

