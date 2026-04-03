const ko = {
  nav: {
    home: 'HOME',
    posts: 'POSTS',
    about: 'ABOUT',
    playground: 'PLAYGROUND',
    project: 'PROJECT',
    guest: 'GUEST',
  },
  theme: {
    toggle: '테마 변경',
  },
  home: {
    recentPosts: 'Recent Posts',
  },
  walkingDog: {
    ariaLabel:
      '산책하는 강아지 애니메이션. 클릭하거나 화살표 키로 강아지를 이동할 수 있습니다.',
    fallback: '산책하는 강아지 애니메이션',
  },
  posts: {
    tagAll: '#All',
  },
  postDetail: {
    playgroundLink: '관련 Playground 가기!',
  },
  about: {
    name: '고세미',
    role: 'Frontend Engineer',
    workExperience: 'Work Experience',
    openSource: 'Open Source',
    skills: 'Skills',
    education: 'Education',
    duties: '담당업무',
    relatedPosts: '관련 글',
  },
  guestbook: {
    title: 'Guestbook',
  },
  project: {
    title: 'Project',
  },
  feLab: {
    tabs: {
      rotation: 'DOM 회전 역산',
      linebreak: '탐색 최적화 O(n)->O(log n)',
      nonogram: '네모네모 로직',
    },
    descs: {
      rotation:
        'getBoundingClientRect는 회전된 요소의 외접 사각형만 반환합니다. 역산으로 회전된 실제 너비, 높이, 꼭짓점을 찾아줍니다.',
      linebreak:
        '텍스트 줄바꿈을 직접 해줘야 한다면 텍스트 너비를 알아야 합니다. 선형 탐색을 파라메트릭 바이너리 서치로 최적화했습니다.\n노란 삼각형을 드래그하여 너비를 조절해보세요.',
      nonogram:
        'og-image.png를 30x30으로 다운스케일하여 만든 네모네모 로직 퍼즐입니다.\n클릭으로 채우고, 우클릭(또는 길게 누르기)으로 X 표시를 할 수 있습니다.',
    },
    relatedPost: '관련글 보러가기!',
    rotation: {
      ariaLabel:
        'DOM 회전 역산 인터랙티브 데모. 드래그로 회전하고 꼭짓점을 드래그하여 크기를 조절할 수 있습니다.',
      fallback: 'DOM 회전 역산 시각화',
      dragHint: '클릭해서 마우스를 움직이면 회전 가능합니다',
      boundingRect: 'getBoundingClientRect()',
      reverseResult: '역산 결과',
      degenerateComment: '// \u03b8 \u2248 45\u00b0: 역산 불가',
    },
    linebreak: {
      dragHint: '노란색 삼각형을 클릭하면 텍스트 너비를 조정할 수 있습니다',
      ariaLabel:
        '텍스트 줄바꿈 탐색 알고리즘 시각화. 삼각형 핸들을 드래그하여 너비를 조절할 수 있습니다.',
      fallback: '텍스트 줄바꿈 탐색 알고리즘 시각화',
      linear: '선형 탐색 O(n)',
      parametric: '파라메트릭 서치 O(log n)',
      play: '재생',
      pause: '일시정지',
      stop: '멈춤',
      linearDesc:
        '한 글자씩 순차적으로 측정하며 maxWidth를 초과하는 지점을 찾습니다.',
      parametricDesc:
        '파라메트릭 서치로 조건을 만족하는 최대 인덱스를 찾습니다.',
      tableLinear: '선형',
      tableParametric: '파라메트릭',
      complexity: '복잡도',
      searchCount: '탐색 수',
      stepsOmitted: '개 스텝 생략',
    },
    nonogram: {
      checkAnswer: '정답 확인',
      reset: '초기화',
      autoSolve: '자동 풀기',
      correct: '정답입니다!',
      instructions: '클릭: 채우기 / 우클릭(또는 길게 누르기): X 표시',
    },
  },
  copyBlock: {
    copy: 'Copy',
    copied: 'Copied!',
  },
  footer: {
    copyright: '\u00a9 {year} semikoh. All rights reserved.',
  },
} as const;

// Use a recursive type to widen literal string types to string
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Dictionary = DeepStringify<typeof ko>;
export default ko;
