<template>
  <footer class="footer">
    <div v-if="showBigWord" class="footer-bottom-word">RAYBO STUDIO</div>

    <div class="footer-layout">
      <div class="footer-left">© 2026 Raybo Studio</div>

      <div class="footer-center">
        <span class="footer-links-full">
          <a
            href="https://x.com/Raybo26"
            target="_blank"
            rel="noopener noreferrer"
            v-scramble
          >X</a>,
          <a href="mailto:bobolau2626@gmail.com" v-scramble>Email</a>,
          <a
            href="https://www.linkedin.com/in/raybo26/"
            target="_blank"
            rel="noopener noreferrer"
            v-scramble
          >LinkedIn</a>,
          <a
            href="https://github.com/raybobo"
            target="_blank"
            rel="noopener noreferrer"
            v-scramble
          >Github</a>,
          <a
            href="https://www.behance.net/bobolau262f165"
            target="_blank"
            rel="noopener noreferrer"
            v-scramble
          >Behance</a>
        </span>
        <span class="footer-links-email">Email</span>
      </div>

      <button
        v-if="showBackToTop"
        class="back-to-top"
        type="button"
        @click="scrollToTop"
      >
        Back to Top
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

withDefaults(defineProps<{ showBigWord?: boolean }>(), { showBigWord: true });

const showBackToTop = ref(false);

const handleScroll = () => {
  if (typeof window === 'undefined') return;
  showBackToTop.value = window.scrollY > window.innerHeight;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: transparent;
  padding-top: 12px;
  padding-bottom: 12px;
}

.footer-bottom-word {
  font-family: "Pixelify Sans", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0;
  font-size: clamp(3rem, 16vw, 8rem);
  line-height: 0.8;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 12px;
  color: #000000;
}

.footer-layout {
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  column-gap: 20px;
  margin-left: 20px;
  margin-right: 20px;
  align-items: center;
}

.footer-left {
  grid-column: 1 / span 4;
  opacity: 0.4;
}

.footer-center {
  grid-column: 5 / span 8;
}

.footer-links-full {
  display: inline;
}

.footer-links-email {
  display: none;
}

.footer-center a {
  color: #000000;
  text-decoration: none;
}

.footer-center a:hover {
  text-decoration: underline;
}

.back-to-top {
  grid-column: 14 / -1;
  justify-self: end;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  font-size: 12px;
  font-family: inherit;
  color: #000000;
}

@media (max-width: 768px) {
  .footer {
    padding: 10px 16px;
  }

  .footer-layout {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-left: 0;
    margin-right: 0;
  }

  .footer-bottom-word {
    font-size: clamp(2.5rem, 22vw, 5rem);
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 8px;
  }

  .footer-left {
    order: 1;
  }

  .footer-center {
    order: 2;
    display: none;
  }

  .back-to-top {
    order: 3;
    align-self: auto;
  }
}

@media (max-width: 480px) {
  .footer-links-full {
    display: none;
  }

  .footer-links-email {
    display: inline;
  }
}
</style>
