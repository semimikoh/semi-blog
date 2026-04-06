import type { Dictionary } from './ko';

const en: Dictionary = {
  nav: {
    home: 'HOME',
    posts: 'POSTS',
    about: 'ABOUT',
    playground: 'PLAYGROUND',
    project: 'PROJECT',
    guest: 'GUEST',
  },
  theme: {
    toggle: 'Toggle theme',
  },
  home: {
    recentPosts: 'Recent Posts',
  },
  walkingDog: {
    ariaLabel:
      'Walking dog animation. Click or use arrow keys to move the dog.',
    fallback: 'Walking dog animation',
  },
  posts: {
    tagAll: '#All',
  },
  postDetail: {
    playgroundLink: 'Go to related Playground!',
  },
  about: {
    name: 'Semi Ko',
    role: 'Frontend Engineer',
    workExperience: 'Work Experience',
    openSource: 'Open Source',
    skills: 'Skills',
    education: 'Education',
    duties: 'Responsibilities',
    relatedPosts: 'Related Posts',
  },
  guestbook: {
    title: 'Guestbook',
  },
  project: {
    title: 'Project',
  },
  feLab: {
    tabs: {
      rotation: 'DOM Rotation Inverse',
      linebreak: 'Search Optimization O(n)->O(log n)',
      nonogram: 'Nonogram',
    },
    descs: {
      rotation:
        'getBoundingClientRect only returns the axis-aligned bounding box of a rotated element. This demo recovers the actual width, height, and vertices via inverse calculation.',
      linebreak:
        'When you need to handle text line breaks manually, you must know the text width. This optimizes linear search to parametric binary search.\nDrag the yellow triangle to adjust the width.',
      nonogram:
        'A nonogram puzzle created by downscaling og-image.png to 30x30.\nClick to fill, right-click (or long press) to mark X.',
    },
    relatedPost: 'Read related post!',
    rotation: {
      ariaLabel:
        'DOM rotation inverse interactive demo. Drag to rotate, drag vertices to resize.',
      fallback: 'DOM rotation inverse visualization',
      dragHint: 'Click and move mouse to rotate',
      boundingRect: 'getBoundingClientRect()',
      reverseResult: 'Inverse result',
      degenerateComment: '// \u03b8 \u2248 45\u00b0: cannot invert',
    },
    linebreak: {
      dragHint: 'Click the yellow triangle to adjust text width',
      ariaLabel:
        'Text line break search algorithm visualization. Drag the triangle handle to adjust width.',
      fallback: 'Text line break search algorithm visualization',
      linear: 'Linear Search O(n)',
      parametric: 'Parametric Search O(log n)',
      play: 'Play',
      pause: 'Pause',
      stop: 'Stop',
      linearDesc:
        'Measures one character at a time to find where maxWidth is exceeded.',
      parametricDesc:
        'Uses parametric search to find the maximum index satisfying the condition.',
      tableLinear: 'Linear',
      tableParametric: 'Parametric',
      complexity: 'Complexity',
      searchCount: 'Searches',
      stepsOmitted: ' steps omitted',
    },
    nonogram: {
      checkAnswer: 'Check',
      reset: 'Reset',
      autoSolve: 'Auto Solve',
      correct: 'Correct!',
      instructions: 'Click: fill / Right-click (or long press): mark X',
    },
  },
  copyBlock: {
    copy: 'Copy',
    copied: 'Copied!',
  },
  footer: {
    copyright: '\u00a9 {year} semikoh. All rights reserved.',
  },
};

export default en;
