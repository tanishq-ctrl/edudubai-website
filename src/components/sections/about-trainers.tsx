"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Award, GraduationCap, User } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const teamMembers = [
  {
    name: "Sonali Prabhu",
    role: "Founder and CEO",
    image: "/team/sonali-prabhu.jpg", // Placeholder path
    description: "Sonali Prabhu is a seasoned banking professional with extensive experience in Banking Operations, Policy Implementation, and Regulatory Compliance at HDFC Bank, one of the top 10 global banks.",
    expertise: "Her expertise in AML/CFT, sanctions screening, and audit management drives operational excellence and adherence to global GRC standards. Leveraging her deep industry knowledge, she fosters a culture of compliance, positioning Edu Dubai as a trusted provider of world-class training to the financial sector.",
  },
  {
    name: "Sanjay Prabhu",
    role: "Director – GRC Consulting & Training",
    image: "/team/sanjay-prabhu.jpg", // Placeholder path
    description: "Sanjay Prabhu is a highly experienced Compliance Trainer and Consultant with over 18 years in trade finance and banking operations, 5+ years in consulting and auditing, and 9+ years dedicated to training and managing compliance frameworks across banks, exchange houses, DNFBPs, and DPMS in Dubai, UAE.",
    expertise: "His expertise spans UAE regulations (CBUAE, SCA, ADGM, DIFC), UN and OFAC sanctions, as well as FATF standards. A Certified Compliance Manager (GCI, Australia), CFCS, and CTP (FAA, Kuala Lumpur), Sanjay specializes in AML/CFT, KYC/CDD, FATCA/CRS, sanctions, GDPR, and RegTech reporting and delivered 2,500+ training and academic sessions.",
  },
]

export function AboutTrainers() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Our Team
        </h2>
        <p className="text-lg text-neutral-text-muted max-w-2xl mx-auto">
          Meet the experienced professionals leading Edu Dubai's mission
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {teamMembers.map((member, index) => {
          const [imageError, setImageError] = useState(false)
          return (
          <Card
            key={index}
            className="border-2 border-neutral-border hover:border-brand-gold transition-all hover:shadow-xl overflow-hidden h-full"
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Image Section - Fixed size */}
              <div className="relative w-full md:w-48 md:min-w-[12rem] h-64 md:h-full bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 flex items-center justify-center p-6">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-brand-navy to-brand-navy/80 flex items-center justify-center">
                  {/* Beautiful placeholder with initials - shown when image fails to load */}
                  {imageError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <User className="h-16 w-16 text-white/80 mb-2" />
                      <span className="text-2xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  {/* Actual team member image */}
                  {!imageError && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
              </div>
              
              {/* Content Section - Consistent padding */}
              <div className="flex-1 flex flex-col p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-bold text-brand-navy mb-3">
                    {member.name}
                  </CardTitle>
                  <Badge className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light w-fit">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="p-0 flex-1 flex flex-col space-y-4">
                  <p className="text-neutral-text leading-relaxed text-base text-justify">
                    {member.description}
                  </p>
                  <div className="flex items-start gap-2 mt-auto">
                    <Award className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
                    <p className="text-neutral-text-muted text-sm leading-relaxed text-justify">
                      {member.expertise}
                    </p>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
          )
        })}
      </div>
    </section>
  )
}

