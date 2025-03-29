<template>
  <div
    class="max-w-lg sm:max-w-screen-lg grid sm:grid-flow-col gap-8 sm:gap-20 py-16 sm:py-0 sm:items-center content-start sm:content-normal min-h-screen w-11/12 mx-auto">

    <section class="flex flex-1 gap-4  col-span-1 sm:h-full sm:py-12  items-center sm:flex-row-reverse sm:col-span-1 ">
      <figure
        class="sm:h-full flex flex-col items-center sm:gap-8 before:bg-gray-300 before:h-full before:w-px before:block before:content-[''] after:block after:h-full after:w-px after:bg-gray-300 after:content-[''] ">
        <img src="/images/Logo.svg" alt="logo" class="w-8 max-w-10" />
      </figure>
      <h3 class="text-xl font-semibold">Wholistika</h3>
    </section>

    <slot />
  </div>
</template>
