<template>
  <header class="nav" :class="{ 'nav-hidden': hidden, 'nav-transparent': transparent }">
    <div class="nav-grid">
      <div class="nav-left">
        <RouterLink to="/" class="nav-logo" v-scramble>Raybo Studio</RouterLink>
      </div>
      <nav class="nav-links">
        <RouterLink
          to="/projects"
          class="nav-link"
          :class="{ 'nav-link-active': isProjectsSection }"
          v-scramble
        >
          Projects
        </RouterLink>
        <RouterLink
          to="/playground"
          class="nav-link"
          active-class="nav-link-active"
          v-scramble
        >
          Playground
        </RouterLink>
        <RouterLink
          to="/info"
          class="nav-link"
          active-class="nav-link-active"
          v-scramble
        >
          Info
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

withDefaults(defineProps<{ transparent?: boolean }>(), { transparent: false });

const route = useRoute();
const isProjectsSection = computed(() => route.path.startsWith('/projects'));

const hidden = ref(false);
let lastScrollY = 0;
let ticking = false;

const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 60) {
      hidden.value = true;
    } else {
      hidden.value = false;
    }
    lastScrollY = currentY;
    ticking = false;
  });
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  padding-top: 18px;
  padding-bottom: 18px;
  background-color: transparent;
  transition: transform 0.3s ease;
}

.nav-hidden {
  transform: translateY(-100%);
}

.nav-transparent {
  background-color: transparent;
}

.nav-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  column-gap: 20px;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
}

.nav-left {
  display: flex;
  align-items: center;
  grid-column: 1 / span 4;
}

.nav-logo {
  text-decoration: none;
  color: #000000;
  letter-spacing: 0;
}

.nav-links {
  display: flex;
  gap: 48px;
  grid-column: 5 / -1;
}

.nav-link {
  text-decoration: none;
  color: #000000;
  letter-spacing: 0;
}

.nav-link-active {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .nav {
    padding: 18px 16px;
  }

  .nav-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0;
    margin-right: 0;
  }

  .nav-links {
    gap: 32px;
  }
}
</style>
