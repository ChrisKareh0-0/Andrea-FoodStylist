// Global type declarations for third-party libraries

declare global {
  interface Window {
    AOS: {
      init: (options?: {
        duration?: number;
        easing?: string;
        once?: boolean;
        mirror?: boolean;
      }) => void;
    };
    GLightbox: (options?: {
      selector?: string;
      touchNavigation?: boolean;
      loop?: boolean;
      autoplayVideos?: boolean;
    }) => void;
    PureCounter: new () => void;
    Typed: new (element: Element, options: {
      strings: string[];
      typeSpeed: number;
      backSpeed: number;
      backDelay: number;
      loop: boolean;
    }) => void;
  }
}

export {};
