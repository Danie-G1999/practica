<template>
  <div class="slider relative w-full h-[700px] overflow-hidden">
    <!-- Carrusel -->
    <div
      class="list absolute top-0 left-0 flex transition-all duration-1000"
      :style="sliderStyle"
    >
      <div
        class="item flex-shrink-0 w-screen h-full"
        v-for="(image, index) in images"
        :key="index"
      >
        <img :src="image" alt="" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Botones -->
    <div class="buttons absolute top-1/2 left-0 w-full px-5 flex justify-between transform -translate-y-1/2">
      <button @click="prev" class="w-12 h-12 rounded-full bg-white text-black font-bold shadow">←</button>
      <button @click="next" class="w-12 h-12 rounded-full bg-white text-black font-bold shadow">→</button>
    </div>

    <!-- Dots -->
    <ul class="dots absolute bottom-5 left-0 w-full flex justify-center space-x-2">
      <li
        v-for="(dot, index) in images"
        :key="index"
        :class="{'bg-white w-8': active === index, 'bg-gray-400 w-4': active !== index}"
        class="h-2 rounded-full transition-all duration-500 cursor-pointer"
        @click="goToSlide(index)"
      ></li>
    </ul>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        active: 0,
        images: [
          '/image/generica1.jpg',
          '/image/generica2.jpg',
        ],
        intervalId: null
      };
    },
    computed: {
      sliderStyle() {
        return {
          left: `-${this.active * 100}%`
        };
      }
    },
    methods: {
      next() {
        this.active = (this.active + 1) % this.images.length;
      },
      prev() {
        this.active = (this.active - 1 + this.images.length) % this.images.length;
      },
      goToSlide(index) {
        this.active = index;
      },
      startAutoSlide() {
        this.intervalId = setInterval(this.next, 3000);
      },
      stopAutoSlide() {
        clearInterval(this.intervalId);
      }
    },
    mounted() {
      this.startAutoSlide();
    },
    beforeDestroy() {
      this.stopAutoSlide();
    }
  };
  </script>
  
  <style scoped>
  .slider {
    height: 700px;
    position: relative;
    overflow: hidden;
  }
  .slider img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 768px) {
    .slider {
      height: 400px;
    }
  }
  </style>
  