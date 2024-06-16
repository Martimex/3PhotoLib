<script setup lang="ts">

</script>

<template>
    <main class="min-h-screen bg-[#ddd] text-black flex flex-col justify-center relative overflow-hidden">
<!--         <section class="flex flex-col items-center justify-center">
            <h1 class="text-5xl font-bold"> 3PhotoLib </h1>
            <h2 class="text-xl"> Welcome!!! </h2>
            <div>
                <button> Log in </button>
            </div>
        </section> -->
        <section class="sectest ">
            <div class="board backdrop-blur-[2px]">
                <div class="slide-container">
                    <div class="slide-box">
                        <img class="slide" src="https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHxmb3Jlc3R8ZW58MHx8fHwxNzE4MTIzNTQyfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1627667928346-5fc86d099a5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0N3x8c3BvcnQlMjBjYXJ8ZW58MHx8fHwxNzE4MTk2MTE3fDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1608178398319-48f814d0750c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwzfHxuZWJ1bGF8ZW58MHx8fHwxNzE4MTk2NTc4fDA&ixlib=rb-4.0.3&q=80&w=1080"/>
                        <img class="slide" src="https://images.unsplash.com/photo-1593697820940-43e77b53a1e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxOXx8cGlhbmlzdHxlbnwwfHx8fDE3MTgyMjEzNzR8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.pexels.com/photos/200985/pexels-photo-200985.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" />
                        <img class="slide" src="https://images.unsplash.com/photo-1617581629397-a72507c3de9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwyNXx8Y2hlcnJ5JTIwYmxvc3NvbXxlbnwwfHx8fDE3MTgyMjMwMjN8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                    </div>
                    <div class="slide-box">
                        <img class="slide" src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwyMHx8ZG9nfGVufDB8fHx8MTcxODIyMjExNnww&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.pexels.com/photos/68389/pexels-photo-68389.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" />
                        <img class="slide" src="https://images.unsplash.com/photo-1456553405974-0712f71f2e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0MHx8bWFuJTIwaGFuZHNvbWV8ZW58MHx8fHwxNzE4MTk1MzQ2fDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHxmaXJld29ya3N8ZW58MHx8fHwxNzE4MjE0OTg2fDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0fHxsYXZlbmRlciUyMGZpZWxkfGVufDB8fHx8MTcxODIxNTY0Nnww&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxM3x8dGVjaG5vbG9neXxlbnwwfHx8fDE3MTgyMjE1ODR8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                    </div>
                    <div class="slide-box">
                        <img class="slide" src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw1Nnx8c3VtbWVyfGVufDB8fHx8MTcxODIwNDM2N3ww&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1548111396-12bc79c82f18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw1Mnx8VFJBSU4lMjBGRU1BTEUlMjBTSVRUSU5HfGVufDB8fHx8MTcxODMwNDA4Mnww&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHx1bnNwbGFzaHxlbnwwfHx8fDE3MTgxOTgyNzN8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw1fHxtb3VudGFpbnN8ZW58MHx8fHwxNzE4MjE0NTUwfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1621329109234-d7657d2f3846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0N3x8Y3J5c3RhbHxlbnwwfHx8fDE3MTgyMTc0NzJ8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1483347756197-71ef80e95f73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0c3xlbnwwfHx8fDE3MTgyMjE3OTV8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                    </div>
<!--                     <div class="slide-box">
                        <img class="slide NOLIVE" src="https://images.unsplash.com/photo-1491929007750-dce8ba76e610?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0MHx8c3VtbWVyfGVufDB8fHx8MTcxODIwNDI0Nnww&ixlib=rb-4.0.3&q=80&w=1080"  />
                        <img class="slide NOLIVE" src="https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHx1bnNwbGFzaHxlbnwwfHx8fDE3MTgxOTgyNzN8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide NOLIVE" src="https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHx1bnNwbGFzaHxlbnwwfHx8fDE3MTgxOTgyNzN8MA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide NOLIVE" src="https://images.unsplash.com/photo-1627667928346-5fc86d099a5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0N3x8c3BvcnQlMjBjYXJ8ZW58MHx8fHwxNzE4MTk2MTE3fDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide NOLIVE" src="https://images.unsplash.com/photo-1627667928346-5fc86d099a5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0N3x8c3BvcnQlMjBjYXJ8ZW58MHx8fHwxNzE4MTk2MTE3fDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide NOLIVE" src="https://images.unsplash.com/photo-1627667928346-5fc86d099a5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHw0N3x8c3BvcnQlMjBjYXJ8ZW58MHx8fHwxNzE4MTk2MTE3fDA&ixlib=rb-4.0.3&q=80&w=1080" />
                    </div> -->
<!--                     <div class="slide-box">
                        <img class="slide" src="https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHxmb3Jlc3R8ZW58MHx8fHwxNzE4MTIzNTQyfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwzfHxmb3Jlc3R8ZW58MHx8fHwxNzE4MTIzNTQyfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHxmb3Jlc3R8ZW58MHx8fHwxNzE4MTIzNTQyfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwzfHxmb3Jlc3R8ZW58MHx8fHwxNzE4MTIzNTQyfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                    </div>
                    <div class="slide-box">
                        <img class="slide" src="https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHxmb3Jlc3R8ZW58MHx8fHwxNzE4MTIzNTQyfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwzfHxmb3Jlc3R8ZW58MHx8fHwxNzE4MTIzNTQyfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwxfHxmb3Jlc3R8ZW58MHx8fHwxNzE4MTIzNTQyfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                        <img class="slide" src="https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyNjl8MHwxfHNlYXJjaHwzfHxmb3Jlc3R8ZW58MHx8fHwxNzE4MTIzNTQyfDA&ixlib=rb-4.0.3&q=80&w=1080" />
                    </div> -->
                </div>
            </div>
        </section>

        <section class="">
            <div class="contentbox text-white bg-[#cccf] py-8 px-4 backdrop-blur-lg backdrop-contrast-75">
                <h1 class="main-title text-6xl font-semibold font-mono text-center mt-8 mb-12"> 3PhotoLib </h1>
                <h2 class="main-title-alt text-xl font-mono text-center my-4"> The royalty-free photo delivery platform for free-forever use! </h2>
                <div class="mt-8 mb-4 min-w-24 max-w-[40vw] min-h-10 bg-[#111a] rounded-full mx-auto"> 
                    <p class="main-title-alt text-xl text-center py-5 px-8 font-bold text-nowrap"> Sign In </p> 
                </div>
            </div>
        </section>

    </main>
</template>

<style scoped>
body {
  margin: 0 auto;
}

.board {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-container {
  display: grid;
  place-items: center;
  width: max(max-content, 100vw);
  background: linear-gradient(45deg, #eee, #ddd);
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1.5rem;
  max-height: 100dvh;
}

.slide-box {
  transform: rotateZ(15deg) translateX(-33%);
  display: flex;
  width: max-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1.5rem;
  margin-right: 1.5rem;
}

.slide {
  width: max(32vw, 32vh);
  height: max(18vw, 18vh);
  box-shadow: .2rem .2rem .85rem #111;
  border-radius: 5%;
}


/* */

.sectest {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
}


.contentbox {
    position: relative;
    background: #eee0;
    min-width: 80vw;
    margin: 0 auto;
    border-block: .75rem solid #eee4;
    box-shadow: inset 0 0 .5rem .12rem #222, 0 0 .5rem .2rem #111;
/*     position: absolute;
    top: 50%;
    left: 10%; */
    
}

.main-title {
    font-family: Montserrat, 'Arial Narrow Bold', sans-serif, Haettenschweiler;
    text-shadow: -.25rem -.25rem .33rem #111;
    filter: drop-shadow(0rem 0rem .25rem #000);
}

.main-title-alt {
    font-family: Montserrat, 'Arial Narrow Bold', sans-serif, Haettenschweiler;
    filter: drop-shadow(.12rem .12rem .1rem #000);
}

</style>