import './style.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Initialize Lucide Icons
if (window.lucide) {
  window.lucide.createIcons();
}

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Disabled Lenis smooth scrolling for better performance
// If you want to re-enable it, uncomment the code below
/*
// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Connect GSAP to Lenis
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
*/

// Animations
const initAnimations = () => {

  // Hero Text Reveal
  const heroText = document.querySelector('.hero-text')
  if (heroText) {
    gsap.fromTo(heroText,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
    )
  }

  // Hero Title Stagger
  const heroChars = document.querySelectorAll('.hero-char')
  if (heroChars.length > 0) {
    gsap.fromTo(heroChars,
      { opacity: 0, y: 100, rotateX: -45 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.5
      }
    )
  }

  // Section Reveals
  const sections = document.querySelectorAll('section')
  sections.forEach(section => {
    gsap.fromTo(section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })

  // Project Cards Stagger
  const projectCards = document.querySelectorAll('#projects .group')
  if (projectCards.length > 0) {
    gsap.fromTo(projectCards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 70%',
        }
      }
    )
  }

  // Magnetic Buttons (Simple implementation)
  const buttons = document.querySelectorAll('button, a.group')
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out'
      })
    })

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })

}

// Create floating particles
const createParticles = () => {
  const particlesContainer = document.getElementById('particles-container')
  if (!particlesContainer) return

  const particleCount = 15 // Reduced from 30 for better performance

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'

    // Random positioning
    particle.style.left = `${Math.random() * 100}%`
    particle.style.bottom = `${Math.random() * 20}%`

    // Random size variation
    const size = Math.random() * 3 + 2
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`

    // Random animation duration and delay
    const duration = Math.random() * 15 + 15 // 15-30s
    const delay = Math.random() * 10 // 0-10s
    particle.style.animationDuration = `${duration}s`
    particle.style.animationDelay = `${delay}s`

    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.2

    particlesContainer.appendChild(particle)
  }
}

// Run animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initAnimations()
  createParticles() // Call the particle creation function
  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle')
  const html = document.documentElement

  // Always default to dark mode unless explicitly set to light
  if (localStorage.theme === 'light') {
    html.classList.remove('dark')
  } else {
    html.classList.add('dark')
    // Set localStorage to dark if not already set
    if (!localStorage.theme) {
      localStorage.theme = 'dark'
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark')
      if (html.classList.contains('dark')) {
        localStorage.theme = 'dark'
      } else {
        localStorage.theme = 'light'
      }
      // Re-initialize icons to ensure the correct sun/moon is shown if needed (though CSS handles visibility)
      if (window.lucide) {
        window.lucide.createIcons();
      }
    })
  }
})
// Also run immediately in case DOMContentLoaded already fired (module script)
// initAnimations() // Moved inside DOMContentLoaded to ensure elements exist
