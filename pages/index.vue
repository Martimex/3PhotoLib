<script setup lang="ts">

const sStore = useStatusStore();
const { currentHomePageView } = storeToRefs(sStore);

</script>

<template>
    <div class="absolute left-0 w-screen">
        <main class="min-h-screen bg-[#ddd] text-black flex flex-col justify-center relative overflow-hidden">
            <section class="absolute top-0 left-0 h-dvh w-screen">
                <div class="backdrop-blur-[2px] overflow-hidden flex items-center justify-center">
                    <div class="grid place-items-center bg-gradient-to-tr from-[#eee] to-[#ddd] grid-cols-[1fr_1fr_1fr] grid-rows-[auto] gap-6 max-h-dvh">
                        <div class="[transform:rotateZ(15deg)_translateX(-33%)] flex flex-col w-max justify-center items-center gap-y-6 mr-6">
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHxmb3Jlc3R8ZW58MHx8fHwxNzE4MTIzNTQyfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1627667928346-5fc86d099a5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0N3x8c3BvcnQlMjBjYXJ8ZW58MHx8fHwxNzE4MTk2MTE3fDA&ixlib=rb-4.0.3&q=80&w=1080" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1608178398319-48f814d0750c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwzfHxuZWJ1bGF8ZW58MHx8fHwxNzE4MTk2NTc4fDA&ixlib=rb-4.0.3&q=80&w=1080"/>
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1593697820940-43e77b53a1e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxOXx8cGlhbmlzdHxlbnwwfHx8fDE3MTgyMjEzNzR8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.pexels.com/photos/200985/pexels-photo-200985.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1617581629397-a72507c3de9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwyNXx8Y2hlcnJ5JTIwYmxvc3NvbXxlbnwwfHx8fDE3MTgyMjMwMjN8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                        </div>
                        <div class="[transform:rotateZ(15deg)_translateX(-33%)] flex flex-col w-max justify-center items-center gap-y-6 mr-6">
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwyMHx8ZG9nfGVufDB8fHx8MTcxODIyMjExNnww&ixlib=rb-4.0.3&q=80&w=1080" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.pexels.com/photos/68389/pexels-photo-68389.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1456553405974-0712f71f2e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0MHx8bWFuJTIwaGFuZHNvbWV8ZW58MHx8fHwxNzE4MTk1MzQ2fDA&ixlib=rb-4.0.3&q=80&w=1080" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHxmaXJld29ya3N8ZW58MHx8fHwxNzE4MjE0OTg2fDA&ixlib=rb-4.0.3&q=80&w=1080" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0fHxsYXZlbmRlciUyMGZpZWxkfGVufDB8fHx8MTcxODIxNTY0Nnww&ixlib=rb-4.0.3&q=80&w=1080" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxM3x8dGVjaG5vbG9neXxlbnwwfHx8fDE3MTgyMjE1ODR8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                        </div>
                        <div class="[transform:rotateZ(15deg)_translateX(-33%)] flex flex-col w-max justify-center items-center gap-y-6 mr-6">
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw1Nnx8c3VtbWVyfGVufDB8fHx8MTcxODIwNDM2N3ww&ixlib=rb-4.0.3&q=80&w=1080" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.pexels.com/photos/5180963/pexels-photo-5180963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHx1bnNwbGFzaHxlbnwwfHx8fDE3MTgxOTgyNzN8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw1fHxtb3VudGFpbnN8ZW58MHx8fHwxNzE4MjE0NTUwfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1621329109234-d7657d2f3846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0N3x8Y3J5c3RhbHxlbnwwfHx8fDE3MTgyMTc0NzJ8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                            <img loading="lazy" class="slide" draggable="false" src="https://images.unsplash.com/photo-1483347756197-71ef80e95f73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0c3xlbnwwfHx8fDE3MTgyMjE3OTV8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                        </div>
                    </div>
                </div>
            </section>

            <section class="">
                <div class="shadow-inner-[0_0_0.5rem_0.12rem_#222] shadow-[0_0_0.5rem_0.2rem_#111] relative w-fit text-white bg-[#ccc1] py-8 px-6 my-0 mx-auto border-solid border-y-[0.75rem] border-y-[#eee9]   backdrop-blur-lg backdrop-contrast-75
                    sm:py-5
                    lg:py-8
                ">
                    <LandingComponentsWelcomeView v-if="currentHomePageView === 'welcome'" />
                    <LandingComponentsSigninForm v-if="currentHomePageView === 'signin'" />
                    <LandingComponentsLoginForm v-if="currentHomePageView === 'login'" />
                    <LandingComponentsAccountVerifyForm v-if="currentHomePageView === 'verify'" />
                    <LandingComponentsPasswordResetForm v-if="currentHomePageView === 'reset'" /> 
                    <LandingComponentsNewPasswordForm v-if="currentHomePageView === 'new' " />
                </div>
            </section>

        </main>
    </div>
</template>

<style scoped>

.slide {
    width: max(32vw, 32vh);
    height: max(18vw, 18vh);
    box-shadow: .2rem .2rem .85rem #111;
    border-radius: 5%;
}

</style>