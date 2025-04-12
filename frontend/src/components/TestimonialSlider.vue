<template>
    <div class="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <div class="flex flex-col items-center gap-4">
        <!-- Imagen -->
        <img :src="image" alt="user image" class="rounded-full w-24 h-24 object-cover shadow-md" />
  
        <!-- Nombre -->
        <p class="text-lg font-semibold" style="font-family: 'Montserrat', sans-serif;">{{ name }}</p>
  
        <!-- Descripción -->
        <p
          class="text-gray-600 text-center break-words px-2 w-full"
          style="font-family: 'Montserrat', sans-serif;"
        >
          {{ descripcion }}
        </p>
  
        <!-- Calificación en estrellas -->
        <div class="flex justify-center gap-1 text-yellow-400 mt-2 text-lg">
          <i
            v-for="n in 5"
            :key="n"
            :class="n <= Number(calification) ? 'fa-solid fa-star' : 'fa-regular fa-star text-gray-300'"
          ></i>
        </div>
  
        <!-- Firma -->
        <!-- <p class="text-sm font-semibold text-gray-500" style="font-family: 'Montserrat', sans-serif;">- {{ name }}</p> -->
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    image: String,
    name: String,
    descripcion: String,
    calification: [String, Number]  // acepta ambos
  })
  </script>
  