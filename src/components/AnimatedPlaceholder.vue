<script setup lang="ts">
    defineProps({
        height: { type: String },
        width: { type: String },
        borderRadius: { type: String }
    })
</script>

<template>
    <div class="placeholder mx-2 my-4 min-w-[80vw] max-w-[90vw] rounded-md shadow-md shadow-black transition-opacity"> &nbsp; </div>
</template>

<style scoped>
    .placeholder {
        height: v-bind(height);
        background-image: linear-gradient(
            to right,
            #d6d7d8 0%,
            #e2e3e4 10%,
            #d6d7d8 20%,
            #d6d7d8 100%
        );
        background-size: 200% 100%;
        box-shadow: 0 .25rem .4rem -.1rem rgb(0, 0, 0 / 0.1),
            0 .15rem .2rem -.2rem rgb(0, 0, 0 / 0.1);
        animation: bgAnimate 1s linear infinite;
    }

    @keyframes bgAnimate {
        0% {
            background-position: 50% 0%;
        }

        100% {
            background-position: -150% 0%;
        }
    }

</style>