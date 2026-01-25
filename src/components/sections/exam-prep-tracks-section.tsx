import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DeliveryFormatBadge } from "@/components/delivery-format-badge"
import { CourseImage } from "@/components/course-image"
import { getCourseBySlugNew } from "@/server/actions/courses"
import { Award, BookOpen, TrendingUp } from "lucide-react"

const examPrepTracks = [
  {
    slug: "anti-money-laundering-specialist",
    icon: Award,
    badge: "AML",
  },
  {
    slug: "fatca-crs-specialist",
    icon: BookOpen,
    badge: "FCS",
  },
  {
    slug: "sanctions-compliance-specialist",
    icon: TrendingUp,
    badge: "SCS",
  },
  {
    slug: "regulatory-compliance-specialist",
    icon: Award,
    badge: "RCS",
  },
  {
    slug: "certified-compliance-manager",
    icon: Award,
    badge: "CCM",
  },
  {
    slug: "certified-global-sanctions-specialist",
    icon: TrendingUp,
    badge: "CGSS",
  },
  {
    slug: "trade-based-money-laundering",
    icon: Award,
    badge: "TBML",
  },
]

export async function ExamPrepTracksSection() {
  const tracks = await Promise.all(
    examPrepTracks.map(async (track) => {
      const course = await getCourseBySlugNew(track.slug)
      return course ? { ...track, course } : null
    })
  )

  const validTracks = tracks.filter((track): track is NonNullable<typeof track> => track !== null)

  return (
    <section className="mb-20 md:mb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-8 bg-brand-gold" />
            <span className="text-brand-gold font-bold text-xs uppercase tracking-[0.2em]">Our Specializations</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
            Exam Preparation Tracks
          </h2>
          <p className="text-lg text-neutral-text-muted max-w-2xl leading-relaxed">
            Master the most in-demand financial compliance certifications with curriculam
            developed by market-leading practitioners.
          </p>
        </div>
        <div className="hidden md:block">
          <Badge className="bg-brand-navy/5 text-brand-navy border-brand-navy/10 px-4 py-2 rounded-lg font-bold text-sm">
            {validTracks.length} Official Tracks
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {validTracks.map((track) => {
          const Icon = track.icon
          const course = track.course

          return (
            <Card
              key={course.id}
              className="overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-neutral-border/50 flex flex-col h-full bg-white relative"
            >
              {/* Image Section with 3D Floating Effect */}
              {course.imageUrl && (
                <div className="relative w-full aspect-[4/3] bg-brand-navy p-6 flex items-center justify-center overflow-hidden border-b border-brand-gold/10">
                  {/* Decorative Light Effects */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/10 blur-[60px] rounded-full -mr-24 -mt-24 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full -ml-16 -mb-16 pointer-events-none" />

                  <div className="relative w-full h-full shadow-[0_25px_60px_rgba(0,0,0,0.6)] group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.9)] transition-all duration-700 rounded-lg overflow-hidden group-hover:scale-[1.03] group-hover:rotate-1">
                    <CourseImage
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Top-Level Badge */}
                  <div className="absolute top-5 left-5 z-20">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-2xl">
                      Official Path
                    </div>
                  </div>

                  <div className="absolute top-5 right-5 z-20 group-hover:scale-110 transition-transform">
                    <Badge className="bg-brand-gold text-brand-navy border-0 font-black shadow-lg uppercase tracking-widest text-[10px] px-3 py-1">
                      {track.badge}
                    </Badge>
                  </div>
                </div>
              )}

              <CardHeader className="flex-1 space-y-4 pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-navy/5 rounded-xl group-hover:bg-brand-gold/10 transition-colors">
                    <Icon className="h-5 w-5 text-brand-navy group-hover:text-brand-gold transition-colors" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-text-muted">
                    {course.category.replace(/_/g, " ")}
                  </span>
                </div>

                <CardTitle className="text-2xl font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-tight">
                  {course.title.replace("(CAMS)", "").replace("(CGSS)", "").trim()}
                </CardTitle>

                <CardDescription className="line-clamp-3 text-base leading-relaxed text-black">
                  {course.shortDescription}
                </CardDescription>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {course.deliveryModes.map((mode) => (
                    <DeliveryFormatBadge key={mode} format={mode} className="text-[10px] px-2" />
                  ))}
                </div>
              </CardHeader>

              <CardContent className="pt-0 pb-8 space-y-6">
                <div className="flex items-center justify-between py-4 border-y border-neutral-border/40">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-neutral-text-muted uppercase tracking-wider">Duration</span>
                    <span className="text-lg font-bold text-brand-navy">{course.duration} Hours</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-neutral-text-muted uppercase tracking-wider">Level</span>
                    <span className="text-lg font-bold text-brand-navy">{course.level}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-neutral-text-muted uppercase tracking-wider">Start Price</span>
                    <span className="text-2xl font-black text-brand-navy">${course.priceUsd.toLocaleString()}</span>
                  </div>
                  <Button asChild className="bg-brand-navy hover:bg-brand-navy-dark text-white rounded-xl px-6 h-12 flex-1 shadow-lg shadow-brand-navy/10 active:scale-95 transition-all">
                    <Link href={`/courses/${course.slug}`}>View Track</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

