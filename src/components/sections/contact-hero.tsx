import { PageHeroImage } from "@/components/sections/page-hero-image"

export function ContactHero() {
  return (
    <PageHeroImage
      image="/hero/contact.jpg"
      imageAlt="Get in Touch - Contact EduDubai"
      title="Contact Us"
      description={
        <>
          Have questions? We&apos;re here to help. <br className="hidden sm:block" />
          Reach out to our team and <br className="hidden sm:block" />
          we&apos;ll respond within 24 hours.
        </>
      }
      align="left"
    />
  )
}
