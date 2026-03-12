<template>
  <div class="page-shell">
    <MainNav />

    <div v-if="project" class="detail-wrapper">
      <div class="detail-layout">
        <!-- Back to List -->
        <RouterLink to="/projects" class="subnav-back">&#x21A9; Back to List</RouterLink>

        <!-- Left column: meta (sticky on desktop) -->
        <div class="detail-left-col">
          <div class="detail-meta">
            <span class="detail-year">{{ project.year }}</span>
            <h1 class="detail-title">{{ project.title }}</h1>
            <p class="detail-desc">{{ project.description }}</p>

            <div v-if="project.type" class="meta-section">
              <h3 class="meta-label">Type</h3>
              <p class="meta-value">{{ project.type }}</p>
            </div>
            <div v-if="project.role" class="meta-section">
              <h3 class="meta-label">Role</h3>
              <p class="meta-value">{{ project.role }}</p>
            </div>
            <div v-if="project.services" class="meta-section">
              <h3 class="meta-label">Services</h3>
              <p class="meta-value">{{ project.services }}</p>
            </div>
            <div v-if="project.url" class="meta-section">
              <h3 class="meta-label">URL</h3>
              <p class="meta-value">
                <a :href="project.url" target="_blank" rel="noopener" class="meta-link">
                  {{ project.urlLabel || project.url }}
                </a>
              </p>
            </div>
            <div v-if="project.team?.length" class="meta-section">
              <h3 class="meta-label">Team</h3>
              <p v-for="member in project.team" :key="member" class="meta-value">
                {{ member }}
              </p>
            </div>
            <div v-if="project.recognition?.length" class="meta-section">
              <h3 class="meta-label">Recognition</h3>
              <p v-for="item in project.recognition" :key="item" class="meta-value">
                {{ item }}
              </p>
            </div>
          </div>
        </div>

        <!-- Pager: Previous / Next -->
        <div class="detail-pager">
          <RouterLink
            v-if="adjacent.prev"
            :to="`/projects/${adjacent.prev.slug}`"
            class="subnav-link"
          >
            &larr; Previous
          </RouterLink>
          <RouterLink
            v-if="adjacent.next"
            :to="`/projects/${adjacent.next.slug}`"
            class="subnav-link"
          >
            Next &rarr;
          </RouterLink>
        </div>

        <!-- Cover image -->
        <img
          :src="project.cover"
          :alt="project.title"
          class="detail-cover-img"
        />

        <!-- Gallery -->
        <div v-if="project.gallery?.length" class="detail-gallery">
          <div
            v-for="(img, i) in project.gallery"
            :key="i"
            class="gallery-item"
            :class="{ 'gallery-item-has-caption': img.caption || img.description }"
          >
            <img
              :src="img.src"
              :alt="img.alt || img.caption || project.title"
              class="gallery-img"
              loading="lazy"
            />
            <div v-if="img.caption || img.description" class="gallery-caption">
              <h4 v-if="img.caption" class="gallery-caption-title">{{ img.caption }}</h4>
              <p v-if="img.description" class="gallery-caption-desc">{{ img.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile-only: More meta at bottom -->
      <div class="detail-meta-mobile">
        <div v-if="project.type" class="meta-section">
          <h3 class="meta-label">Type</h3>
          <p class="meta-value">{{ project.type }}</p>
        </div>
        <div v-if="project.role" class="meta-section">
          <h3 class="meta-label">Role</h3>
          <p class="meta-value">{{ project.role }}</p>
        </div>
        <div v-if="project.services" class="meta-section">
          <h3 class="meta-label">Services</h3>
          <p class="meta-value">{{ project.services }}</p>
        </div>
        <div v-if="project.url" class="meta-section">
          <h3 class="meta-label">URL</h3>
          <p class="meta-value">
            <a :href="project.url" target="_blank" rel="noopener" class="meta-link">
              {{ project.urlLabel || project.url }}
            </a>
          </p>
        </div>
        <div v-if="project.team?.length" class="meta-section">
          <h3 class="meta-label">Team</h3>
          <p v-for="member in project.team" :key="member" class="meta-value">
            {{ member }}
          </p>
        </div>
        <div v-if="project.recognition?.length" class="meta-section">
          <h3 class="meta-label">Recognition</h3>
          <p v-for="item in project.recognition" :key="item" class="meta-value">
            {{ item }}
          </p>
        </div>
      </div>
    </div>

    <SiteFooter :show-big-word="false" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import MainNav from '@/components/MainNav.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { getProjectBySlug, projects } from '@/data/projects';

const route = useRoute();

const project = computed(() => {
  const slug = route.params.slug as string;
  return getProjectBySlug(slug);
});

// Pager 仅在 Selected 项目之间循环
const selectedOrder = projects.filter((p) => p.category === 'selected');

const adjacent = computed(() => {
  const slug = route.params.slug as string;
  const idx = selectedOrder.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    return { prev: undefined, next: undefined };
  }
  return {
    prev: idx > 0 ? selectedOrder[idx - 1] : undefined,
    next: idx < selectedOrder.length - 1 ? selectedOrder[idx + 1] : undefined,
  };
});
</script>

<style scoped>
.page-shell {
  position: relative;
  min-height: 100vh;
  background-color: #ffffff;
  color: #000000;
  font-family: "Suisse Intl", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  font-size: 12px;
  line-height: normal;
  display: flex;
  flex-direction: column;
}

/* --- Layout --- */
.detail-wrapper {
  flex: 1;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 24px;
  padding-bottom: 80px;
}

.detail-layout {
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  column-gap: 20px;
}

/* --- Back to List --- */
.subnav-back {
  grid-column: 1 / span 4;
  grid-row: 1;
  display: inline-block;
  margin-bottom: 24px;
  color: #000000;
  text-decoration: none;
  align-self: start;
}

.subnav-back:hover {
  text-decoration: underline;
}

/* --- Left column: meta (sticky) --- */
.detail-left-col {
  grid-column: 1 / span 4;
  grid-row: 2;
  position: sticky;
  top: 24px;
  align-self: start;
}

.detail-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-year {
  letter-spacing: 0;
}

.detail-title {
  font-size: 12px;
  font-weight: 500;
  margin: 4px 0 0;
}

.detail-desc {
  margin: 8px 0 16px;
}

.meta-section {
  margin-bottom: 12px;
}

.meta-label {
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 2px;
  color: #000000;
  opacity: 0.3;
}

.meta-value {
  margin: 0 0 2px;
}

.meta-link {
  color: #000000;
  text-decoration: underline;
}

/* --- Pager: Previous / Next (sticky) --- */
.detail-pager {
  grid-column: 5 / -1;
  grid-row: 1;
  position: sticky;
  top: 24px;
  z-index: 5;
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  margin-bottom: 24px;
  align-self: start;
}

.subnav-link {
  color: #000000;
  text-decoration: none;
}

.subnav-link:hover {
  text-decoration: underline;
}

/* --- Cover image --- */
.detail-cover-img {
  grid-column: 5 / -1;
  grid-row: 2;
  width: 100%;
  display: block;
  border-radius: 16px;
  object-fit: cover;
  aspect-ratio: 16 / 9;
  margin-bottom: 20px;
  align-self: start;
}

/* --- Gallery --- */
.detail-gallery {
  grid-column: 5 / -1;
  grid-row: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.gallery-item-has-caption {
  margin-bottom: 16px;
}

.gallery-item {
  width: 100%;
}

.gallery-img {
  width: 100%;
  display: block;
  border-radius: 16px;
  object-fit: cover;
  aspect-ratio: 16 / 9;
}

.gallery-caption {
  margin-top: 12px;
  max-width: 640px;
}

.gallery-caption-title {
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 4px;
}

.gallery-caption-desc {
  margin: 0;
  color: #000000;
  opacity: 0.3;
}

/* Mobile-only meta block — hidden on desktop */
.detail-meta-mobile {
  display: none;
}

.detail-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 80px 20px;
}

.detail-empty a {
  color: #000000;
  text-decoration: underline;
}

/* ====== Mobile (≤1024px) ====== */
@media (max-width: 1024px) {
  .detail-wrapper {
    margin-left: 16px;
    margin-right: 16px;
  }

  .detail-layout {
    display: flex;
    flex-direction: column;
  }

  .subnav-back {
    order: 1;
    margin-bottom: 16px;
  }

  .detail-pager {
    order: 2;
    position: relative;
    top: auto;
    align-self: flex-end;
    justify-content: flex-end;
    margin-bottom: 16px;
  }

  .detail-cover-img {
    order: 3;
    border-radius: 10px;
    margin-bottom: 16px;
  }

  .detail-left-col {
    order: 4;
    position: relative;
    top: auto;
    width: 75%;
    margin-bottom: 40px;
  }

  /* Hide meta-sections from left col on mobile (shown in detail-meta-mobile) */
  .detail-meta .meta-section {
    display: none;
  }

  .detail-gallery {
    order: 5;
    gap: 10px;
    margin-bottom: 80px;
  }

  .gallery-item-has-caption {
    margin-bottom: 6px;
  }

  .gallery-img {
    border-radius: 10px;
  }

  .gallery-caption-desc {
    color: #000000;
    opacity: 0.3;
  }

  /* Show More meta block at bottom */
  .detail-meta-mobile {
    display: block;
    width: 75%;
    margin-bottom: 32px;
  }
}

@media (max-width: 640px) {
  .detail-cover-img {
    aspect-ratio: 9 / 16;
  }
}
</style>
