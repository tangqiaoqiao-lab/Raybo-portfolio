const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default {
  mounted(el) {
    const rawText = el.textContent || '';
    const originalText = rawText.trim();
    if (!originalText) return;

    // 锁定当前文字宽度，避免 hover 时宽度抖动（Raybo Studio 保持原样）
    if (!el.classList.contains('nav-logo')) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        el.style.display = 'inline-block';
        el.style.width = `${rect.width}px`;
      }
    }

    let frame = 0;
    let rafId = null;
    // 控制动效时长：数值越大越慢
    const totalFrames = 40;

    const animate = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const revealCount = Math.floor(originalText.length * progress);

      const chars = originalText
        .split('')
        .map((ch, idx) => {
          // 保留内部空格 / 换行等空白字符，避免打散宽度
          if (/\s/.test(ch)) return ch;
          if (idx < revealCount) return originalText[idx];
          return LETTERS[Math.floor(Math.random() * LETTERS.length)];
        })
        .join('');

      el.textContent = chars;

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        el.textContent = originalText;
      }
    };

    const onEnter = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      frame = 0;
      animate();
    };

    const onLeave = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      el.textContent = originalText;
    };

    el.__scrambleData = { onEnter, onLeave };

    // 默认由自身 hover 触发；当 data-scramble-trigger="external" 时，交给父元素控制
    if (el.dataset.scrambleTrigger !== 'external') {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    }
  },

  beforeUnmount(el) {
    const data = el.__scrambleData;
    if (!data) return;
    el.removeEventListener('mouseenter', data.onEnter);
    el.removeEventListener('mouseleave', data.onLeave);
    delete el.__scrambleData;
  },
};

