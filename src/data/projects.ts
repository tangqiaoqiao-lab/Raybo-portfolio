/* Project cover images from assets */
import coverMeshy from '@/assets/project-meshy/cover.jpg';
import coverTaitopia from '@/assets/project-taitopia/cover.jpg';
import coverPhoton from '@/assets/project-photon/cover.jpg';
import photonImg01 from '@/assets/project-photon/01.jpg';
import photonImg02 from '@/assets/project-photon/02.gif';
import photonImg03 from '@/assets/project-photon/03.gif';
import photonImg04 from '@/assets/project-photon/04.gif';
import photonImg05 from '@/assets/project-photon/05.gif';
import photonImg06 from '@/assets/project-photon/06.gif';
import photonImg07 from '@/assets/project-photon/07.jpg';
import photonImg08 from '@/assets/project-photon/08.jpg';
import photonImg09 from '@/assets/project-photon/09.gif';
import photonImg10 from '@/assets/project-photon/10.jpg';
import coverHorus from '@/assets/project-horus/cover.jpg';
import coverReal3d from '@/assets/project-real3d/cover.jpg';
import real3dImg01 from '@/assets/project-real3d/image-01.jpg';
import real3dImg02 from '@/assets/project-real3d/image-02.jpg';
import real3dImg03 from '@/assets/project-real3d/image-03.jpg';
import real3dImg04 from '@/assets/project-real3d/image-04.jpg';
import coverBiv from '@/assets/project-biv/cover.jpg';
import bivImg01 from '@/assets/project-biv/01.gif';
import bivImg02 from '@/assets/project-biv/02.webp';
import bivImg03 from '@/assets/project-biv/03.gif';
import bivImg04 from '@/assets/project-biv/04.gif';
import bivImg05 from '@/assets/project-biv/05.gif';
import bivImg06 from '@/assets/project-biv/06.gif';
import bivImg07 from '@/assets/project-biv/07.gif';
import coverBdesign from '@/assets/project-bdesign/cover.jpg';
import bdesignImg01 from '@/assets/project-bdesign/01.jpg';
import bdesignImg02 from '@/assets/project-bdesign/02.gif';
import bdesignImg03 from '@/assets/project-bdesign/03.jpg';
import bdesignVid04 from '@/assets/project-bdesign/04.mp4';
import coverPortfolioOfQiao from '@/assets/project-archive/image-portfolioofqiao.jpg';
import coverCnp from '@/assets/project-archive/image-cnp.gif';
import coverTmallDungeon from '@/assets/project-archive/image-tmalldungeon.jpg';
import coverFliggy from '@/assets/project-archive/image-fliggy.jpg';
import coverCrland from '@/assets/project-archive/image-crland.jpg';
import coverHotsar from '@/assets/project-archive/image-hotsar.jpg';
import coverTmallDiscovery from '@/assets/project-archive/image-tmalldiscovery.jpg';
import coverKaola from '@/assets/project-archive/image-kaola.jpg';

export interface ProjectImage {
  src: string;
  alt?: string;
  caption?: string;
  description?: string;
}

export interface Project {
  slug: string;
  year: string;
  title: string;
  description: string;
  cover: string;
  category: 'selected' | 'archive';
  tags?: string[];
  type?: string;
  role?: string;
  services?: string;
  url?: string;
  urlLabel?: string;
  team?: string[];
  recognition?: string[];
  gallery?: ProjectImage[];
}

export const projects: Project[] = [
  {
    slug: 'meshy-ai',
    year: '2024 - now',
    title: 'Meshy AI',
    description:
      'Meshy is a 3D AI toolkit that enables users to effortlessly create stunning 3D models and textures. It offers a suite of powerful tools, including Text-to-3D, Image-to-3D, Text-to-Texture and AI Texturing, allowing users to bring their creative visions to life in minutes. Meshy is an all-in-one stop solution for creating animated characters, catering to artists and developers in gaming, film, XR, and beyond.',
    cover: coverMeshy,
    category: 'selected',
    tags: ['AI Product', 'Website', 'Real-time Rendering'],
    type: 'AI Product / Website / Real-time Rendering / Brand Experience',
    role: 'Lead Creative Technologist',
    services: 'WebGL, WebGPU, Shader, HTML, CSS, JavaScript, Infographic data visualisation, API integration, Framer, MatterJS, SVG, WebSockets',
    url: 'https://www.meshy.ai/',
    urlLabel: 'www.meshy.ai',
    team: [
      'Creative Technical Director: Haihang',
      'Lead Designer / Art Director: Guangxi Cai',
      'Creative Developer: Raybo Liu',
    ],
    recognition: [
      'Product Hunt #1 Product of the Day',
    ],
  },
  {
    slug: 'taitopia',
    year: '2022 - 2023',
    title: 'taitopia',
    description:
      'Taitopia is a cloud 3D rendering platform for lightning-fast and photorealistic product visualization.',
    cover: coverTaitopia,
    category: 'selected',
    tags: ['Web Development'],
    type: 'Website / Web Application',
    role: 'Sr. Creative Technologist',
    services: 'WebGL, Three.js, Vue, Node.js',
  },
  {
    slug: 'photon',
    year: '2021',
    title: 'PHOTON - A.I. & Creative Experience',
    description:
      'PHOTON A.I. is an interaction-based visual reasoning system from Neuro - Symbolic Lab, an A.I. lab with a focus on future technology, innovation from Alibaba Cloud. Alibaba Cloud Design, together with NS - Lab, has created an immersive digital experience that enables users to interact with PHOTON and generate 3D digital fibers representing PHOTON consciousness online.',
    cover: coverPhoton,
    category: 'selected',
    tags: ['AI Product', 'Website', 'Real-time Rendering', 'Brand Experience'],
    type: 'AI Product / Website / Real-time Rendering / Brand Experience',
    role: 'Developer / Technical Artist',
    services: 'WebGL, WebGPU, Shader, HTML, CSS, JavaScript, Infographic data visualisation, API integration, Framed, MatterJS, SVG, WebSockets',
    url: 'https://www.neuro-symbolic-lab.com/experience',
    urlLabel: 'www.neuro-symbolic-lab.com/experience',
    team: [
      'Creative Technical Director: Haihang',
      'Lead Designer / Art Director: Guangxi Cai',
      'Creative Developer: Raybo Liu',
      'Backend & AI: NS-LAB',
      'Logo Graphics: Yan Zhu',
    ],
    recognition: [
      '2022 Webby Awards Best Use of Animation or Motion Graphics, Nominee',
      '2022 Red Dot Brand & Communication Award',
      '2022 Awwwards Site of the Day',
      '2021 FWA Site of the Day',
    ],
    gallery: [
      {
        src: photonImg01,
        caption: 'AI Logic Capability Chain',
        description:
          'Users upload images and ask any questions: it will call upon the capabilities of photons for reading comprehension, supplemented by semantics, to return answers and generate fibers.',
      },
      {
        src: photonImg02,
      },
      {
        src: photonImg03,
      },
      {
        src: photonImg04,
        caption: 'AI Imagination Capability Chain',
        description:
          'By constructing sentences, images and fibers are generated on the server-side machines.',
      },
      {
        src: photonImg05,
      },
      {
        src: photonImg06,
        caption: 'The real-time rendering effect of neural fibers implemented using GPGPU technology in WebGL',
      },
      {
        src: photonImg07,
      },
      {
        src: photonImg08,
      },
      {
        src: photonImg09,
        caption: 'Generated by different users',
      },
      {
        src: photonImg10,
      },
    ],
  },
  {
    slug: 'biv-builder',
    year: '2021',
    title: 'Alibaba Cloud BIV Builder',
    description:
      'A no-code data visualization builder for creating interactive dashboards and infographic presentations.',
    cover: coverBiv,
    category: 'selected',
    tags: ['Data Visualization', 'Web Application'],
    type: 'Web Application / Data Visualization',
    role: 'Sr. Creative Technologist',
    services: 'Vue, WebGL, SVG, Canvas, Node.js',
    team: [ 'Creative & Technical Director: Du Haihang',
       'Product Design: Tan Xiao, Zheng Ya',
       'Product Management: Ming Cheng', 
       'Animation & Reel Design: Guangxi Cai', 
       'Product UI Design: Zhou Yujie', 
       'WebGL Development: Du Haihang, Liu Bo', 
       'Front-End Development: Jiang Qi, Liu Bo', 
       'Product Developer: Huang Zhi, Qing Chan'],
    recognition: [
      '2021 DIA (Design Intelligence Award)',
    ],
    gallery: [
      { src: bivImg01 },
      { src: bivImg02 },
      { src: bivImg03 },
      { src: bivImg04 },
      { src: bivImg05 },
      { src: bivImg06 },
      { src: bivImg07 },
    ],
  },
  {
    slug: 'real-3d',
    year: '2020 - 2022',
    title: 'REAL 3D',
    description:
      "'Real 3D' is a 3D Architecture Diagram Product that efficiently visualizes the Alibaba Cloud products in real-time. It is initiated by Alibaba Cloud Design on top of WebGL technology.",
    cover: coverReal3d,
    category: 'selected',
    tags: ['Data Visualization', 'WebGL'],
    type: 'SaaS Product Experience / 3D Panoramic Control / Information 3D Visualization / Real-time Interactive Experience',
    role: 'Developer / Technical Lead',
    services: 'WebGL, WebGPU, Shader, GLIF, Infographic data visualisation, API integration, Fronted, MatterJS, SVG, WebSockets',
    team: [
      'Technical Lead: Raybo Liu',
      'Creative Technical Director: Haihang',
      'Designer: Yujie Zhou, Guangxi Cai',
      'Collaborative Team: Alibaba Cloud Security Center, Alibaba Cloud Cloud Native Business Team / Alibaba Cloud Cloud Network Business Line Team / Alibaba Cloud Cloud Product Team'
    ],
    gallery: [
      { src: real3dImg01, caption: '01. MVP: Minimum Viable Product', description: 'We shipped a version of MVP for Real 3D. In the development, we consolidated the product from the design to technical development, and solved many technical problems in the difficulty of graphics coding. Such as automatic layout in the nested relationship of VPC, Block, and Region, adaptive response to viewport resizing, parametric material and styles, etc.' },
      { src: real3dImg02, caption: '02. Apsara Conference 2020 - "Future Oriented Cloud Native" Animation', description: 'Enterprise Distributed Application Service (EDAS) is the core product of Alibaba Enterprise Internet Architecture solution. In the keynote speech of "Future Oriented Cloud Native" at the 2020 Cloud Summit Conference, Real 3D is once again a force to be reckoned with, visualizing 3D graphics rendered in real-time with real data to demonstrated EDAS 3.0 ability to smartly limit flow, automatically expand capacity, and repair failures in response to traffic peaks.' },
      { src: real3dImg03, caption: '03. GLOBE OF CLOUD NETWORK', description: 'Collaborating with the Alibaba Cloud Network Business Line team, I developed a 3D interactive online experience center to concretize the Alibaba Cloud Network product system. The experience center covers 16 cloud network products, divided into 5 major modules across 14 pages, and has been launched on the Alibaba Cloud official website' },
      { src: real3dImg04, caption: '04. Model Assets', description: 'To begin the product incubation, we plugged the 3D models into Blender for optimizations and created highly reusable design assets: we combed through hundreds of products from Alibaba Cloud and redesigned the icon and models using simple and semantic elements. Given that these models are ultimately used for high-performance, and real-time renderings in the browser, the models required extremely demanding polished geometries. The models were magnificently optimized to low-poly glTF Models averaging only 10 - 30K per model.' },
    ],
  },
  {
    slug: 'horus',
    year: '2021',
    title: 'The Eyes of Horus [Real 3D]',
    description:
      'The 3D management platform built by "The Eyes of Horus" allows enterprise customers to review their assets on the cloud in the most intuitive way and interact with their products in a natural way. In order to achieve the highest operational efficiency and visual effects, the entire 3D visualization part based on WebGL graphics technology is developed by the creative graphic designers of Alibaba Design. Currently, The Eyes of Horus, a popular new feature of the Cloud Security Center, is already providing security services to more than dozens of enterprise customers. And that, in turn, is today\'s protagonist: the forerunner of Real 3D.',
    cover: coverHorus,
    category: 'selected',
    tags: ['Data Visualization', 'WebGL'],
    type: 'Data Visualization / WebGL Experience',
    role: 'Creative Interactive Developer',
    services: 'WebGL, Three.js, Shader, Data Visualization',
    team: [
      'Creative Technical Director: Haihang',
      'Creative Developer: Raybo Liu',
    ],
    recognition: [
      '2021 iF Design Award',
    ],
  },
  {
    slug: 'b-design',
    year: '2020',
    title: 'B-Design Color Palette',
    description:
      'Based on WebGL noise algorithms, I have developed a real-time breathing color survival tool. Users can simply adjust parameters to package and release various dynamic real-time rendering breathing color animations.',
    cover: coverBdesign,
    category: 'selected',
    tags: ['Design System', 'Branding', '3D'],
    type: 'Design System / WEBGL',
    role: 'Creative Developer',
    services: 'Three.js, WebGL, Shader, CSS Animation',
    gallery: [
      { src: bdesignImg01 },
      { src: bdesignImg02 },
      { src: bdesignImg03 },
      { src: bdesignVid04 },
    ],
  },
  // Archive projects
  {
    slug: 'portfolio-of-qiao',
    year: '2024 - 2025',
    title: 'Portfolio of Qiao',
    description: 'Personal portfolio website design and development.',
    cover: coverPortfolioOfQiao,
    category: 'archive',
    tags: ['Web Development'],
  },
  {
    slug: 'cnp-life-science',
    year: '2024',
    title: 'CNP Life Science',
    description: 'Corporate website for CNP Life Science.',
    cover: coverCnp,
    category: 'archive',
    tags: ['Web Development'],
  },
  {
    slug: 'tmall-dungeon',
    year: '2020',
    title: 'TMALL Dungeon',
    description: 'Web Development, Virtual Spaces, Brand Experience, Online 3D Interactions.',
    cover: coverTmallDungeon,
    category: 'archive',
    tags: ['Web Development', 'Virtual Spaces', 'Brand Experience', 'Online 3D Interactions'],
  },
  {
    slug: 'figgy-travel-freak',
    year: '2019',
    title: 'Figgy - Adventurous Travel Freak',
    description: 'Interactive installation experience.',
    cover: coverFliggy,
    category: 'archive',
    tags: ['Installation'],
  },
  {
    slug: 'cr-land-kitten',
    year: '2019',
    title: 'CR Land - Kitten Catches Gifts',
    description: 'Interactive installation for CR Land.',
    cover: coverCrland,
    category: 'archive',
    tags: ['Installation'],
  },
  {
    slug: 'hotsar-website',
    year: '2018',
    title: 'HOTSAR Website',
    description: 'Web development and creative experience for HOTSAR.',
    cover: coverHotsar,
    category: 'archive',
    tags: ['Web Development'],
  },
  {
    slug: 'tmall-discovery',
    year: '2018',
    title: 'TMALL Discovery - Aroma Christmas Tree',
    description: 'Interactive installation for TMALL.',
    cover: coverTmallDiscovery,
    category: 'archive',
    tags: ['Installation'],
  },
  {
    slug: 'kaola-smile-machine',
    year: '2018',
    title: 'Kaola - Smile Machine',
    description: 'Interactive smile detection installation.',
    cover: coverKaola,
    category: 'archive',
    tags: ['Installation'],
  },
];

export function getSelectedProjects(): Project[] {
  return projects.filter((p) => p.category === 'selected');
}

export function getArchiveProjects(): Project[] {
  return projects.filter((p) => p.category === 'archive');
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project | undefined; next: Project | undefined } {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : undefined,
    next: idx < projects.length - 1 ? projects[idx + 1] : undefined,
  };
}
