<template>
  <div class="page-shell">
    <MainNav />
    <main class="page-main">
      <div class="projects-layout">
        <!-- Col 1: tabs -->
        <aside class="projects-sidebar">
          <div class="tabs">
            <button
              type="button"
              class="tab"
              :class="{ 'tab-active': activeTab === 'selected' }"
              @click="activeTab = 'selected'"
              v-scramble
            >Selected</button>
            <button
              type="button"
              class="tab"
              :class="{ 'tab-active': activeTab === 'archive' }"
              @click="activeTab = 'archive'"
              v-scramble
            >Archive</button>
          </div>
        </aside>

        <!-- Col 2: filters (Archive only) -->
        <div v-if="activeTab === 'archive'" class="archive-filter-col">
          <button
            type="button"
            class="filter-tag"
            :class="{ 'filter-tag-active': archiveFilter === 'All' }"
            @click="archiveFilter = 'All'"
          >All</button>
          <button
            v-for="tag in archiveTags"
            :key="tag"
            type="button"
            class="filter-tag"
            :class="{ 'filter-tag-active': archiveFilter === tag }"
            @click="archiveFilter = tag"
          >{{ tag }}</button>
        </div>

        <!-- Projects content -->
        <!-- Selected view -->
        <section v-if="activeTab === 'selected'" class="projects-content projects-content-selected">
          <RouterLink
            v-for="project in selectedProjects"
            :key="project.slug"
            :to="`/projects/${project.slug}`"
            class="card-selected"
            @mouseenter="onSelectedCardEnter"
            @mouseleave="onSelectedCardLeave"
          >
            <div class="card-selected-text">
              <span class="card-year">{{ project.year }}</span>
              <h2
                class="card-title"
                v-scramble
                data-scramble-trigger="external"
              >{{ project.title }}</h2>
              <p class="card-desc">{{ project.description }}</p>
            </div>
            <div class="card-selected-cover">
              <img
                :src="project.cover"
                :alt="project.title"
                class="card-img"
                loading="lazy"
              />
            </div>
          </RouterLink>
        </section>

        <!-- Archive view -->
        <section v-else class="projects-content projects-content-archive">
          <div class="archive-intro">
            <p class="archive-intro-text">
              From May 2018 to now, I served as a Creative Technology Developer,
              deeply involved in all kinds of projects' creative planning, graphic design,
              and 3D production. Utilized technologies such as WebGL, Shader, and
              Blender for interactive design and graphic development of web-based
              products, creating creative H5 pages and interactive installations. I have
              served many leading internet clients in this capacity such as Alibaba
              Cloud, TMALL, Figgy, Kaola and more.
            </p>
            <ul class="archive-index">
              <li v-for="project in filteredArchiveProjects" :key="project.slug">
                <span class="archive-index-link">
                  {{ project.year }} {{ project.title }}
                </span>
              </li>
            </ul>
          </div>
          <div class="archive-grid">
            <div
              v-for="project in filteredArchiveProjects"
              :key="project.slug"
              class="card-archive"
              :class="{
                'card-archive-clickable':
                  project.slug === 'portfolio-of-qiao' || project.slug === 'cnp-life-science',
              }"
              @mouseenter="onArchiveCardEnter"
              @mouseleave="onArchiveCardLeave"
              @click="onArchiveCardClick(project)"
            >
              <div class="card-archive-cover">
                <img
                  :src="project.cover"
                  :alt="project.title"
                  class="card-img"
                  loading="lazy"
                />
              </div>
              <span class="card-year">{{ project.year }}</span>
              <h3
                class="card-archive-title"
                v-scramble
                data-scramble-trigger="external"
              >
                {{ project.title }}
              </h3>
              <span v-if="project.tags" class="card-archive-tags">
                {{ project.tags.join(', ') }}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
    <SiteFooter :show-big-word="false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import MainNav from '@/components/MainNav.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { getSelectedProjects, getArchiveProjects } from '@/data/projects';

const activeTab = ref<'selected' | 'archive'>('selected');
const archiveFilter = ref('All');

const selectedProjects = getSelectedProjects();
const archiveProjects = getArchiveProjects();

const archiveTags = computed(() => {
  const tags = new Set<string>();
  archiveProjects.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags);
});

const filteredArchiveProjects = computed(() => {
  if (archiveFilter.value === 'All') return archiveProjects;
  return archiveProjects.filter((p) => p.tags?.includes(archiveFilter.value));
});

function onArchiveCardClick(project: any) {
  if (project.slug === 'portfolio-of-qiao') {
    window.open('https://www.tangqiaoqiao.com/', '_blank', 'noopener');
  } else if (project.slug === 'cnp-life-science') {
    window.open('https://www.cnplifescience.com/', '_blank', 'noopener');
  }
}

function triggerScrambleOnChildren(target: EventTarget | null, mode: 'enter' | 'leave') {
  const el = target as HTMLElement | null;
  if (!el) return;
  const nodes = el.querySelectorAll<HTMLElement>('[data-scramble-trigger="external"]');
  nodes.forEach((node) => {
    const data = (node as any).__scrambleData;
    if (!data) return;
    if (mode === 'enter' && typeof data.onEnter === 'function') {
      data.onEnter();
    } else if (mode === 'leave' && typeof data.onLeave === 'function') {
      data.onLeave();
    }
  });
}

function onSelectedCardEnter(e: MouseEvent) {
  triggerScrambleOnChildren(e.currentTarget, 'enter');
}

function onSelectedCardLeave(e: MouseEvent) {
  triggerScrambleOnChildren(e.currentTarget, 'leave');
}

function onArchiveCardEnter(e: MouseEvent) {
  triggerScrambleOnChildren(e.currentTarget, 'enter');
}

function onArchiveCardLeave(e: MouseEvent) {
  triggerScrambleOnChildren(e.currentTarget, 'leave');
}
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

.page-main {
  flex: 1;
  padding-top: 24px;
  padding-bottom: 80px;
}

/* 16-col grid layout */
.projects-layout {
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  column-gap: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

/* --- Col 1: tabs --- */
.projects-sidebar {
  grid-column: 1 / span 1;
  position: sticky;
  top: 24px;
  align-self: start;
}

.tabs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tab {
  all: unset;
  cursor: pointer;
  letter-spacing: 0;
}

.tab-active {
  text-decoration: underline;
}

/* --- Col 2: archive filters --- */
.archive-filter-col {
  grid-column: 2 / span 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: sticky;
  top: 24px;
  align-self: start;
}

.filter-tag {
  all: unset;
  cursor: pointer;
  letter-spacing: 0;
}

.filter-tag-active {
  text-decoration: underline;
}

.filter-tag:hover {
  text-decoration: underline;
}

/* --- Selected: align with nav "Projects" (col 5) --- */
.projects-content-selected {
  grid-column: 5 / -1;
}

/* --- Archive: align with nav "Projects" (col 5) --- */
.projects-content-archive {
  grid-column: 5 / -1;
}

/* --- Selected cards --- */
.card-selected {
  display: grid;
  grid-template-columns: 4fr 8fr;
  gap: 20px;
  align-items: start;
  text-decoration: none;
  color: inherit;
  padding-bottom: 28px;
  margin-bottom: 28px;
  border-bottom: 1px solid #e0e0e0;
}

.card-selected:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.card-selected-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
}

.card-year {
  letter-spacing: 0;
}

.card-title {
  font-size: 12px;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0;
}

.card-desc {
  margin: 4px 0 0;
  max-width: 480px;
}

.card-selected-cover {
  width: 100%;
}

.card-img {
  width: 100%;
  display: block;
  border-radius: 16px;
  object-fit: cover;
  aspect-ratio: 16 / 9;
}

/* --- Archive view --- */
.archive-intro {
  margin-bottom: 32px;
  max-width: 480px;
}

.archive-intro-text {
  margin: 0 0 16px;
}

.archive-index {
  list-style: none;
  margin: 0;
  padding: 0;
}

.archive-index li {
  margin-bottom: 2px;
}

.archive-index-link {
  color: #000000;
  text-decoration: none;
}

.archive-index-link:hover {
  text-decoration: underline;
}

.archive-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 20px;
}

.card-archive {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}

.card-archive-clickable {
  cursor: pointer;
}

.card-archive-clickable:hover .card-archive-title {
  text-decoration: underline;
}

.card-archive-cover {
  width: 100%;
  margin-bottom: 16px;
}

.card-archive .card-img {
  aspect-ratio: 16 / 9;
  border-radius: 16px;
}

.card-archive .card-year {
  margin-bottom: 8px;
}

.card-archive-title {
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 2px;
}

.card-archive-tags {
  color: #000000;
  opacity: 0.3;
}

/* ====== Mobile ====== */
@media (max-width: 768px) {
  .page-main {
    padding: 16px 16px 80px;
  }

  .projects-layout {
    display: flex;
    flex-direction: column;
    margin-left: 0;
    margin-right: 0;
  }

  .projects-sidebar {
    flex-direction: row;
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
  }

  .tabs {
    flex-direction: row;
    gap: 16px;
  }

  .archive-filter-col {
    display: none;
  }

  /* Selected cards: mobile — cover first */
  .card-selected {
    display: flex;
    flex-direction: column-reverse;
    gap: 12px;
    padding-bottom: 32px;
    margin-bottom: 32px;
  }

  .card-selected-text .card-desc {
    display: none;
  }

  .card-img {
    border-radius: 10px;
  }

  .card-archive .card-img {
    border-radius: 10px;
  }

  .archive-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .archive-intro {
    max-width: none;
  }
}
</style>
