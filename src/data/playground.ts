export interface PlaygroundItem {
  id: number;
  slug: string;
  title: string;
  cover: string;
  url: string;
  tags: string[];
  interactiveMode?: string[];
  scenarios?: string[];
  technologies?: string[];
  appearance?: string[];
}

const imageModules = import.meta.glob<{ default: string }>(
  '@/assets/playground/*.webp',
  { eager: true },
);

function parsePlaygroundImages(): PlaygroundItem[] {
  const items: PlaygroundItem[] = [];

  for (const [path, mod] of Object.entries(imageModules)) {
    const filename = path.split('/').pop()!.replace(/\.webp$/, '');
    const dashIdx = filename.indexOf('-');
    if (dashIdx === -1) continue;

    const numStr = filename.slice(0, dashIdx);
    const id = parseInt(numStr, 10);
    if (isNaN(id)) continue;

    const slugPart = filename.slice(dashIdx + 1);
    const title = slugPart
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    // Choose URL prefix by project group
    const sketchesSlugs = new Set([
      'getijde',
      'bent',
      'why-is-the-sky-so-blue',
    ]);
    const shadertoySlugs = new Set([
      'exit-the-matrix',
      'desire-crystal',
      'iridescent-windows',
      'shaders-adamfuhrer-26',
      'trippy-triangle',
      'truchet-kaleidoscope',
    ]);
    const basicsSlugs = new Set([
      'ballpit',
      'bounds-and-makedefault',
      'cubes',
      'particles',
      'instanced-colors',
      'instanced-physics-cubes',
      'perlin-cubes',
      'pixelated-render-pass',
      'rendertexture',
      'simple-physics',
      'water-shader',
    ]);

    let prefix = 'examples';
    if (sketchesSlugs.has(slugPart)) prefix = 'sketches';
    else if (shadertoySlugs.has(slugPart)) prefix = 'shadertoy';
    else if (basicsSlugs.has(slugPart)) prefix = 'basics';

    items.push({
      id,
      slug: slugPart,
      title,
      cover: mod.default,
      url: `https://raybobo.github.io/${prefix}/${slugPart}`,
      tags: [],
    });
  }

  items.sort((a, b) => a.id - b.id);
  return items;
}

export const playgroundItems: PlaygroundItem[] = parsePlaygroundImages();

export const indexCategories = {
  'Interactive mode': ['Bound', 'Click', 'Drag-and-drop', 'Drawing', 'Mouseover', 'Mouse Path', 'Multiview', 'Parallax Scrolling', 'Scrolling'],
  'Scenarios': ['Art / Brush / Illustration', 'Audio / Music / Live / Video', 'Background', 'Game', 'Gallery', 'Info Visualization', 'Logo', 'Motion Graphic', 'Product Showcase / Product Experience', 'Sport', 'Website', '3D Panoramic Control'],
  'Technologies': ['WebGL', 'GLTF', 'Blender', 'Houdini', 'Shader', 'Processing', 'Node.js', 'next.js', 'Three.js'],
  'Appearance': ['Particles', 'Fluid', 'Lighting', 'Colorful', 'Noise', 'Matrix', 'Typeface', 'Space', 'Planet', 'Parametric', 'Object / Computer', 'Geometry / Sphere / Cube', 'Car', 'Animal', 'City'],
};

export function getPlaygroundCount(): number {
  return playgroundItems.length;
}
