<template>
  <div class="page-shell">
    <MainNav />
    <main class="page-main">
      <div class="pg-layout">
        <!-- Col 1: mode tabs -->
        <aside class="pg-sidebar">
          <div class="pg-tabs">
            <button
              type="button"
              class="pg-tab"
              :class="{ 'pg-tab-active': mode === 'random' }"
              @click="mode = 'random'"
              v-scramble
            >Random</button>
            <button
              type="button"
              class="pg-tab"
              :class="{ 'pg-tab-active': mode === 'index' }"
              @click="mode = 'index'"
              v-scramble
            >Index</button>
          </div>
        </aside>

        <!-- Col 2: Zoom controls (Random mode, web only) -->
        <div v-if="mode === 'random'" class="pg-zoom">
          <button
            type="button"
            class="pg-zoom-btn"
            :class="{ 'pg-zoom-disabled': cols <= 2 }"
            :disabled="cols <= 2"
            @click="zoomIn"
          >+</button>
          <button
            type="button"
            class="pg-zoom-btn"
            :class="{ 'pg-zoom-disabled': cols >= 6 }"
            :disabled="cols >= 6"
            @click="zoomOut"
          >&minus;</button>
        </div>

        <!-- =========== RANDOM MODE =========== -->
        <section v-if="mode === 'random'" class="pg-content">
          <div class="random-grid" :style="randomGridStyle">
            <a
              v-for="item in shuffledItems"
              :key="item.id"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="random-card"
              @mouseenter="onRandomCardEnter"
              @mouseleave="onRandomCardLeave"
            >
              <div class="random-cover" :class="showInfo ? 'random-cover-info' : 'random-cover-pure'">
                <img :src="item.cover" :alt="item.title" loading="lazy" />
              </div>
              <div v-if="showInfo" class="random-meta">
                <span class="random-num">{{ String(item.id).padStart(2, '0') }}</span>
                <h3
                  class="random-title"
                  v-scramble
                  data-scramble-trigger="external"
                >
                  {{ item.title }}
                </h3>
                <p v-if="item.tags.length" class="random-tags">
                  {{ item.tags.join(', ') }}
                </p>
              </div>
            </a>
          </div>
        </section>

        <!-- =========== INDEX MODE =========== -->
        <template v-else>
          <!-- Col 2: filters -->
          <div class="idx-filters">
            <button
              type="button"
              class="idx-filter-btn"
              :class="{ 'idx-filter-active': idxFilter === 'All' }"
              @click="idxFilter = 'All'"
            >All</button>

            <template v-for="(values, category) in indexCategories" :key="category">
              <h4 class="idx-cat-label">{{ category }}</h4>
              <button
                v-for="val in values"
                :key="val"
                type="button"
                class="idx-filter-btn"
                :class="{ 'idx-filter-active': idxFilter === val }"
                @click="idxFilter = val"
              >{{ val }}</button>
            </template>
          </div>

          <!-- Col 3: project name list -->
          <div class="idx-names">
            <a
              v-for="item in filteredIndexItems"
              :key="item.id"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="idx-name-link"
              @mouseenter="hoveredItem = item"
              v-scramble
            >{{ item.title }}</a>
          </div>

          <!-- Col 4: preview image -->
          <div class="idx-preview">
            <div v-if="hoveredItem" class="idx-preview-img-wrap">
              <img
                :src="hoveredItem.cover"
                :alt="hoveredItem.title"
                class="idx-preview-img"
              />
            </div>
          </div>
        </template>
      </div>

      <!-- Project count (web only) -->
      <div class="pg-count">{{ playgroundCount }}</div>
    </main>
    <SiteFooter :show-big-word="false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import MainNav from '@/components/MainNav.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { playgroundItems, indexCategories, getPlaygroundCount } from '@/data/playground';
import type { PlaygroundItem } from '@/data/playground';

const mode = ref<'random' | 'index'>('random');

function getDefaultCols(): number {
  const w = window.innerWidth;
  if (w >= 1728) return 6;
  if (w >= 1440) return 4;
  if (w >= 1280) return 3;
  if (w >= 1024) return 2;
  return 1;
}

const cols = ref(typeof window !== 'undefined' ? getDefaultCols() : 6);

const colSteps = [6, 4, 3, 2];

const onResize = () => {
  cols.value = getDefaultCols();
};

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

const zoomIn = () => {
  const idx = colSteps.indexOf(cols.value);
  if (idx < colSteps.length - 1) cols.value = colSteps[idx + 1];
};

const zoomOut = () => {
  const idx = colSteps.indexOf(cols.value);
  if (idx > 0) cols.value = colSteps[idx - 1];
};

const showInfo = computed(() => cols.value <= 4);

const randomGridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols.value}, 1fr)`,
  rowGap: cols.value >= 6 ? '20px' : '40px',
}));

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const shuffledItems = ref(shuffle(playgroundItems));


const playgroundCount = getPlaygroundCount();

// Index mode: sorted from newest (highest id) to oldest
const indexItems = [...playgroundItems].reverse();
const idxFilter = ref('All');
const hoveredItem = ref<PlaygroundItem | null>(indexItems[0] || null);

const filteredIndexItems = computed(() => {
  if (idxFilter.value === 'All') return indexItems;
  return indexItems.filter((item) => {
    const all = [
      ...(item.interactiveMode || []),
      ...(item.scenarios || []),
      ...(item.technologies || []),
      ...(item.appearance || []),
    ];
    return all.includes(idxFilter.value);
  });
});

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

function onRandomCardEnter(e: MouseEvent) {
  triggerScrambleOnChildren(e.currentTarget, 'enter');
}

function onRandomCardLeave(e: MouseEvent) {
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

/* ===== 16-col master grid ===== */
.pg-layout {
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  column-gap: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

/* --- Sidebar (col 1) --- */
.pg-sidebar {
  grid-column: 1 / span 1;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 24px;
  align-self: start;
}

.pg-tabs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pg-tab {
  all: unset;
  cursor: pointer;
}

.pg-tab-active {
  text-decoration: underline;
}

.pg-zoom {
  grid-column: 2 / span 2;
  display: flex;
  gap: 12px;
  position: sticky;
  top: 24px;
  align-self: start;
}

.pg-zoom-btn {
  all: unset;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  user-select: none;
}

.pg-zoom-disabled {
  opacity: 0.25;
  cursor: default;
}

/* ===== RANDOM MODE ===== */
.pg-content {
  grid-column: 5 / -1;
}

.random-grid {
  display: grid;
  gap: 40px 20px;
}

.random-card {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}

.random-cover img {
  width: 100%;
  display: block;
  border-radius: 10px;
  object-fit: cover;
}

.random-cover-pure img {
  aspect-ratio: 16 / 9;
}

.random-cover-info img {
  aspect-ratio: 16 / 9;
}

.random-meta {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}

.random-num {
  font-size: 12px;
  margin-bottom: 8px;
}

.random-title {
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 2px;
}

.random-tags {
  margin: 0;
  color: #000000;
  opacity: 0.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== INDEX MODE ===== */
.idx-filters {
  grid-column: 2 / span 3;
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: sticky;
  top: 24px;
  align-self: start;
}

.idx-cat-label {
  font-size: 12px;
  font-weight: 400;
  margin: 10px 0 2px;
  color: #999999;
}

.idx-filter-btn {
  all: unset;
  cursor: pointer;
}

.idx-filter-active {
  text-decoration: underline;
}

.idx-names {
  grid-column: 5 / span 5;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.idx-name-link {
  color: #000000;
  text-decoration: none;
}

.idx-name-link:hover {
  text-decoration: underline;
}

.idx-preview {
  grid-column: 10 / -1;
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: calc((100vw - 40px - 15 * 20px) / 16 * 7);
  z-index: 10;
  pointer-events: none;
}

.idx-preview-img-wrap {
  width: 100%;
}

.idx-preview-img {
  width: 100%;
  display: block;
  border-radius: 16px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* ===== Count number ===== */
.pg-count {
  position: fixed;
  bottom: 30px;
  left: 20px;
  z-index: 51;
  font-family: "Pixelify Sans", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  font-weight: 400;
  letter-spacing: 0;
  font-size: clamp(4rem, 7.4vw, 8rem);
  line-height: 1;
}

/* ====== MOBILE ====== */
@media (max-width: 768px) {
  .page-main {
    padding: 16px 16px 80px;
  }

  .pg-layout {
    display: flex;
    flex-direction: column;
    margin-left: 0;
    margin-right: 0;
  }

  .pg-sidebar {
    flex-direction: row;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  .pg-tabs {
    flex-direction: row;
    gap: 12px;
  }

  .pg-zoom {
    display: none;
  }

  /* Random mobile: 1 col */
  .random-grid {
    grid-template-columns: 1fr !important;
    gap: 40px;
  }

  .random-cover-pure img,
  .random-cover-info img {
    aspect-ratio: 16 / 9;
    border-radius: 10px;
  }

  .random-meta {
    display: flex;
  }

  /* Index mobile */
  .idx-filters {
    display: none;
  }

  .idx-names {
    margin-bottom: 16px;
  }

  .idx-preview {
    position: fixed;
    top: 50%;
    right: 16px;
    left: auto;
    transform: translateY(-50%);
    width: 45vw;
    pointer-events: none;
    z-index: 10;
  }

  .idx-preview-img {
    border-radius: 10px;
    aspect-ratio: 9 / 16;
  }

  /* Hide count on mobile */
  .pg-count {
    display: none;
  }
}
</style>
