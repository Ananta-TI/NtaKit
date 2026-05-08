/**
 * Performance Optimization Utilities
 * Untuk Three.js components dan general React optimizations
 */

// ============================================
// 1. LAZY COMPONENT LOADER
// ============================================
import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

export const createLazyComponent = (importFunc, fallback = null) => {
  const LazyComponent = lazy(importFunc);
  
  return (props) => (
    <Suspense fallback={fallback || <LoadingSpinner />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export const LoadingSpinner = () => (
  <motion.div
    className="flex items-center justify-center h-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="w-8 h-8 border-[3px] border-brand-accent border-t-transparent rounded-full animate-spin" />
  </motion.div>
);

// ============================================
// 2. INTERSECTION OBSERVER HOOK
// ============================================
import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isVisible];
};

// ============================================
// 3. MEMOIZED COMPONENT WRAPPER
// ============================================
import { memo } from 'react';

export const memoizeComponent = (Component, propsAreEqual) => {
  return memo(Component, propsAreEqual);
};

// Contoh penggunaan:
// const MemoizedButton = memoizeComponent(Button, (prevProps, nextProps) => {
//   return prevProps.onClick === nextProps.onClick && 
//          prevProps.label === nextProps.label;
// });

// ============================================
// 4. DEBOUNCE & THROTTLE
// ============================================
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// ============================================
// 5. USEEFFECT CLEANUP HELPER
// ============================================
export const useAsyncEffect = (effect, deps) => {
  useEffect(() => {
    let isMounted = true;

    const asyncEffect = async () => {
      if (isMounted) {
        await effect();
      }
    };

    asyncEffect();

    return () => {
      isMounted = false;
    };
  }, deps);
};

// ============================================
// 6. THREE.JS CLEANUP HELPER
// ============================================
export const useThreeJSCleanup = (sceneRef, rendererRef) => {
  useEffect(() => {
    return () => {
      // Cleanup Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      if (sceneRef.current) {
        // Traverse dan dispose semua geometries dan materials
        sceneRef.current.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((mat) => mat.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
        sceneRef.current = null;
      }
    };
  }, []);
};

// ============================================
// 7. PERFORMANCE MONITORING
// ============================================
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
  
  return result;
};

// Contoh penggunaan dalam useEffect:
// useEffect(() => {
//   measurePerformance('GithubIsometric Load', () => {
//     fetchGitHubData();
//   });
// }, []);

// ============================================
// 8. REQUEST ANIMATION FRAME HELPER
// ============================================
export const useAnimationFrame = (callback) => {
  const frameRef = useRef();

  useEffect(() => {
    const animate = () => {
      callback();
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [callback]);
};

// ============================================
// 9. PREFETCH IMAGES
// ============================================
export const prefetchImages = (urls) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

// ============================================
// 10. LOCAL STORAGE WITH TYPE SAFETY
// ============================================
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// ============================================
// 11. VIEWPORT SIZE DETECTION
// ============================================
export const useViewportSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 150);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

// ============================================
// 12. BATCH API REQUESTS
// ============================================
export const batchRequests = async (requests, maxConcurrent = 5) => {
  const results = [];
  const executing = [];

  for (const request of requests) {
    const promise = Promise.resolve(request()).then((result) => {
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });

    results.push(promise);
    executing.push(promise);

    if (executing.length >= maxConcurrent) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
};