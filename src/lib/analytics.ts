// Analytics hooks - placeholder for production analytics integration

export type AnalyticsEvent = 
  | "page_view"
  | "course_view"
  | "enroll_click"
  | "brochure_download"
  | "whatsapp_click"
  | "contact_form_submit"
  | "newsletter_signup"

export interface AnalyticsProperties {
  [key: string]: string | number | boolean | undefined
}

// Placeholder analytics tracking
export function trackEvent(event: AnalyticsEvent, properties?: AnalyticsProperties) {
  // In production, integrate with your analytics provider (Google Analytics, Mixpanel, etc.)
  if (typeof window !== "undefined") {
    // Only log in development (check for Next.js dev mode)
    if (process.env.NODE_ENV !== "production" || window.location.hostname === "localhost") {
      console.log("[Analytics]", event, properties)
    }
    
    // Example: Google Analytics 4
    // if (window.gtag) {
    //   window.gtag("event", event, properties)
    // }
    
    // Example: Mixpanel
    // if (window.mixpanel) {
    //   window.mixpanel.track(event, properties)
    // }
  }
}

export function trackPageView(path: string, title?: string) {
  trackEvent("page_view", { path, title })
}

export function trackCourseView(courseId: string, courseTitle: string) {
  trackEvent("course_view", { courseId, courseTitle })
}

export function trackEnrollClick(courseId: string, courseTitle: string) {
  trackEvent("enroll_click", { courseId, courseTitle })
}

export function trackBrochureDownload(courseId?: string) {
  trackEvent("brochure_download", { courseId })
}

export function trackWhatsAppClick(source: string) {
  trackEvent("whatsapp_click", { source })
}

export function trackContactFormSubmit(formType: string) {
  trackEvent("contact_form_submit", { formType })
}

export function trackNewsletterSignup(email: string) {
  trackEvent("newsletter_signup", { email })
}

