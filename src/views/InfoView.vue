<template>
  <div class="page-shell">
    <MainNav />
    <main class="page-main">
      <div class="info-layout">
        <div class="info-content">
          <p class="info-intro">
            Raybo Liu works as Creative Coder at
            <a
              href="https://www.meshy.ai/"
              target="_blank"
              rel="noopener"
              class="no-underline"
            >Meshy</a>
            – creating custom tools and generative design for visual identities in
            collaboration with
            <a href="#" rel="noopener" class="no-underline">Motion and Visual Designer</a>.
            While his approach is often complex, technical, and computational, the
            visual outcome is, in most cases, minimalistic or organic. Raybo teaches
            creative coding at different international art academies and gives
            various workshops and talks on coding and motion. He is deeply in love
            with coding and design, Data and AI.
          </p>

          <section class="info-section">
            <h2 class="info-heading">Education</h2>
            <p class="info-text">
              2015 - 2019 Sun Yat-sen University, Software Engineering-Digital Media
            </p>
          </section>

          <section class="info-section">
            <h2 class="info-heading">Work Experience</h2>
            <ul class="info-list info-list-plain">
              <li>
                2022 - Present _ Product Engineer and Lead 3D Dataset _
                <a
                  href="https://www.meshy.ai/"
                  target="_blank"
                  rel="noopener"
                  v-scramble
                >Meshy</a>
              </li>
              <li>
                2020 - 2022 _ Sr. Creative Technologist _
                <a
                  href="https://www.alibabacloud.com/"
                  target="_blank"
                  rel="noopener"
                  v-scramble
                >Alibaba Cloud</a>
              </li>
            </ul>
          </section>

          <section class="info-section">
            <h2 class="info-heading">Stack [/&:] Coding</h2>
            <p class="info-text">WebGL / WebGPU / GLSL / Three.js</p>
            <p class="info-text">
              TypeScript / Vue / React / Node.js / Processing / Arduino
            </p>
            <p class="info-text">
              Python / Flask / Prefect / DataBricks / Git / VVVV
            </p>
          </section>

          <section class="info-section">
            <h2 class="info-heading">Services [/>:]</h2>
            <ul class="info-list info-list-bullet">
              <li>Interactive Motion Design</li>
              <li>Creative Development</li>
              <li>Realtime Graphics</li>
              <li>Full-stack Development</li>
              <li>Front-end Development</li>
              <li>Web Development</li>
              <li>Distributed System Design</li>
              <li>System Architecture and Integration</li>
              <li>API Integration</li>
              <li>Database</li>
              <li>AR & VR</li>
              <li>Strategy, design and motion (with collaborators)</li>
            </ul>
          </section>

          <section class="info-section">
            <h2 class="info-heading">Selected Awards and Talks</h2>
            <ul class="info-list info-list-bullet">
              <li>2022 Webby Awards, Best Use of Animation or Motion Graphics, Nominee. PHOTON Experience</li>
              <li>2022 Red Dot Brand & Communication Award. PHOTON Experience</li>
              <li>2022 Awwwards Site of the Day. PHOTON Experience</li>
              <li>2021 FWA Site of the Day. PHOTON Experience</li>
              <li>2021 iF Design Award. Alibaba Cloud Security Center - The Eyes of Horus [Real 3D]</li>
              <li>2021 DIA (Design Intelligence Award), Alibaba Cloud BIV Builder</li>
              <li>2021 Expand the Possibilities of Design with Creative Technology, Alibaba Design</li>
              <li>2020 Academy of Art & Design, Tsinghua University x Alibaba Design Day</li>
              <li>2019 Creative Coding: The Journey of PI, Alibaba Cloud</li>
              <li>2018, 第九届虎啸技术营销金奖</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
    <SiteFooter :show-big-word="false" />
  </div>
</template>

<script setup lang="ts">
import MainNav from '@/components/MainNav.vue';
import SiteFooter from '@/components/SiteFooter.vue';
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
  padding-top: 40px;
  padding-bottom: 160px;
}

/* 16 列布局：margin 20, gutter 20，内容从第 5 列开始 */
.info-layout {
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  column-gap: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.info-content {
  grid-column: 5 / -1;
  max-width: 720px;
}

.info-intro {
  margin: 0 0 40px;
}

.info-intro a {
  color: #000000;
  text-decoration: underline;
}

.info-intro a.no-underline {
  text-decoration: none;
}

.info-section {
  margin-bottom: 40px;
}

.info-section:last-of-type {
  margin-bottom: 0;
}

.info-heading {
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 8px;
  letter-spacing: 0;
}

.info-text {
  margin: 0 0 6px;
}

.info-text:last-child {
  margin-bottom: 0;
}

.info-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.info-list-plain li {
  margin-bottom: 4px;
}

.info-list-plain a {
  color: #000000;
  text-decoration: underline;
  white-space: nowrap;
}

.info-list-bullet li {
  position: relative;
  padding-left: 12px;
  margin-bottom: 4px;
}

.info-list-bullet li::before {
  content: "-";
  position: absolute;
  left: 0;
}

@media (max-width: 768px) {
  .page-main {
    padding: 24px 16px 80px;
  }

  .info-layout {
    margin-left: 0;
    margin-right: 0;
    column-gap: 16px;
  }

  .info-content {
    grid-column: 1 / span 12;
  }

  .info-intro {
    margin-bottom: 24px;
  }

  .info-section {
    margin-bottom: 22px;
  }
}
</style>
