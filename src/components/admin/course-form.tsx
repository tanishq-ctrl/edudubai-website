"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { createCourse, updateCourse, type AdminCourse } from "@/server/actions/admin-courses"
import { CourseImageField } from "./course-image-field"

const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const
const BODIES = ["ACAMS", "GCI", "HOCK_INTERNATIONAL"] as const
const MODES = ["LIVE_VIRTUAL", "IN_PERSON", "SELF_PACED", "HYBRID"] as const

/**
 * Course editor.
 *
 * Scalars and the frequently-edited lists (outcomes, who-it's-for, FAQ) get
 * real inputs. The rarely-touched nested structures (schedules, exam info,
 * programme overview, audience categories, why-choose-us) are edited as JSON:
 * building bespoke repeaters for all of them would be a great deal of UI for
 * content that changes once a year, and the server validates every shape with
 * zod regardless, so a malformed edit is rejected rather than saved.
 */
export function CourseForm({ course }: { course?: AdminCourse }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [slug, setSlug] = useState(course?.slug ?? "")
  const [legacyId, setLegacyId] = useState(course?.id ?? "")
  const [title, setTitle] = useState(course?.title ?? "")
  const [shortDescription, setShortDescription] = useState(course?.shortDescription ?? "")
  const [longDescription, setLongDescription] = useState(course?.longDescription ?? "")
  const [category, setCategory] = useState(course?.category ?? "")
  const [issuingBody, setIssuingBody] = useState<string>(course?.issuingBody ?? "ACAMS")
  const [level, setLevel] = useState<string>(course?.level ?? "INTERMEDIATE")
  const [durationHours, setDurationHours] = useState(String(course?.duration ?? 16))
  const [priceUsd, setPriceUsd] = useState(String(course?.priceUsd ?? 0))
  const [deliveryModes, setDeliveryModes] = useState<string[]>(course?.deliveryModes ?? [])
  const [featured, setFeatured] = useState(course?.featured ?? false)
  const [published, setPublished] = useState(course?.published ?? false)
  const [imageUrl, setImageUrl] = useState(course?.imageUrl ?? "")
  const [heroImageUrl, setHeroImageUrl] = useState(course?.heroImageUrl ?? "")

  const [outcomes, setOutcomes] = useState<string[]>(course?.outcomes ?? [])
  const [whoItsFor, setWhoItsFor] = useState<string[]>(course?.whoItsFor ?? [])
  const [faq, setFaq] = useState(course?.faq ?? [])

  const [schedulesJson, setSchedulesJson] = useState(
    JSON.stringify(course?.deliverySchedules ?? [], null, 2)
  )
  const [examInfoJson, setExamInfoJson] = useState(
    JSON.stringify(course?.examInfo ?? null, null, 2)
  )
  const [overviewJson, setOverviewJson] = useState(
    JSON.stringify(course?.programOverview ?? null, null, 2)
  )
  const [audienceJson, setAudienceJson] = useState(
    JSON.stringify(course?.audienceCategories ?? [], null, 2)
  )
  const [whyChooseUsJson, setWhyChooseUsJson] = useState(
    JSON.stringify(course?.whyChooseUs ?? null, null, 2)
  )

  function parseJsonField(label: string, value: string, fallback: unknown): unknown {
    const trimmed = value.trim()
    if (!trimmed) return fallback
    try {
      return JSON.parse(trimmed)
    } catch {
      throw new Error(`${label} is not valid JSON`)
    }
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    let payload
    try {
      payload = {
        slug: slug.trim(),
        legacyId: legacyId.trim() || slug.trim(),
        title,
        shortDescription,
        longDescription,
        category,
        issuingBody,
        level,
        durationHours,
        priceUsd,
        currency: "USD",
        deliveryModes,
        featured,
        published,
        displayOrder: course?.displayOrder ?? 0,
        imageUrl: imageUrl || null,
        heroImageUrl: heroImageUrl || null,
        outcomes: outcomes.filter((o) => o.trim()),
        whoItsFor: whoItsFor.filter((w) => w.trim()),
        faq: faq.filter((f) => f.question.trim() && f.answer.trim()),
        deliverySchedules: parseJsonField("Delivery schedules", schedulesJson, []),
        audienceCategories: parseJsonField("Audience categories", audienceJson, []),
        examInfo: parseJsonField("Exam info", examInfoJson, null),
        programOverview: parseJsonField("Programme overview", overviewJson, null),
        whyChooseUs: parseJsonField("Why choose us", whyChooseUsJson, null),
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON")
      return
    }

    startTransition(async () => {
      const result = course
        ? await updateCourse(course.rowId, payload)
        : await createCourse(payload)

      if (!result.success) {
        setError(result.error)
        return
      }

      router.push("/admin")
      router.refresh()
    })
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Basics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="Title" required>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Field>

          <Field label="Slug" hint="Lowercase, hyphens only. Changing it changes the public URL.">
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              pattern="[a-z0-9-]+"
              required
            />
          </Field>

          <Field
            label="Legacy ID"
            hint="Used by per-course hero layouts. Leave as-is unless you know why."
          >
            <Input value={legacyId} onChange={(e) => setLegacyId(e.target.value)} />
          </Field>

          <Field label="Category" required>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} required />
          </Field>

          <Field label="Issuing body">
            <select
              value={issuingBody}
              onChange={(e) => setIssuingBody(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {BODIES.map((body) => (
                <option key={body} value={body}>
                  {body}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Level">
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {LEVELS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Duration (hours)">
            <Input
              type="number"
              min={1}
              value={durationHours}
              onChange={(e) => setDurationHours(e.target.value)}
              required
            />
          </Field>

          <Field label="Price (USD)">
            <Input
              type="number"
              min={0}
              step="0.01"
              value={priceUsd}
              onChange={(e) => setPriceUsd(e.target.value)}
              required
            />
          </Field>

          <Field label="Delivery modes" className="md:col-span-2">
            <div className="flex flex-wrap gap-3">
              {MODES.map((mode) => (
                <label key={mode} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={deliveryModes.includes(mode)}
                    onChange={(e) =>
                      setDeliveryModes((current) =>
                        e.target.checked
                          ? [...current, mode]
                          : current.filter((m) => m !== mode)
                      )
                    }
                  />
                  {mode}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Visibility" className="md:col-span-2">
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Published (visible on the site)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Featured on the homepage
              </label>
            </div>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Descriptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Short description" hint="Shown on course cards.">
            <Textarea
              rows={3}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
            />
          </Field>
          <Field label="Long description" hint="Shown on the course page.">
            <Textarea
              rows={8}
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              required
            />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
          <CardDescription>
            Upload a new image, or paste a path to an existing one in /public.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <CourseImageField label="Card image" value={imageUrl} onChange={setImageUrl} />
          <CourseImageField label="Hero image" value={heroImageUrl} onChange={setHeroImageUrl} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learning outcomes</CardTitle>
        </CardHeader>
        <CardContent>
          <StringList values={outcomes} onChange={setOutcomes} placeholder="What they'll learn" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Who it&apos;s for</CardTitle>
        </CardHeader>
        <CardContent>
          <StringList values={whoItsFor} onChange={setWhoItsFor} placeholder="Audience" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faq.map((item, index) => (
            <div key={index} className="space-y-2 rounded-md border p-3">
              <div className="flex items-center gap-2">
                <Input
                  value={item.question}
                  placeholder="Question"
                  onChange={(e) =>
                    setFaq((current) =>
                      current.map((f, i) =>
                        i === index ? { ...f, question: e.target.value } : f
                      )
                    )
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFaq((current) => current.filter((_, i) => i !== index))}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove question {index + 1}</span>
                </Button>
              </div>
              <Textarea
                rows={3}
                value={item.answer}
                placeholder="Answer"
                onChange={(e) =>
                  setFaq((current) =>
                    current.map((f, i) => (i === index ? { ...f, answer: e.target.value } : f))
                  )
                }
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setFaq((current) => [...current, { question: "", answer: "" }])}
          >
            <Plus className="h-4 w-4 mr-1" /> Add question
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced content</CardTitle>
          <CardDescription>
            Edited as JSON. The server validates the shape, so an invalid structure is
            rejected rather than saved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <JsonField label="Delivery schedules" value={schedulesJson} onChange={setSchedulesJson} />
          <JsonField label="Exam info" value={examInfoJson} onChange={setExamInfoJson} />
          <JsonField label="Programme overview" value={overviewJson} onChange={setOverviewJson} />
          <JsonField label="Audience categories" value={audienceJson} onChange={setAudienceJson} />
          <JsonField label="Why choose us" value={whyChooseUsJson} onChange={setWhyChooseUsJson} />
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-brand-navy hover:bg-brand-navy-dark"
        >
          {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {course ? "Save changes" : "Create course"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </Label>
      {children}
      {hint && <p className="mt-1 text-xs text-neutral-text-muted">{hint}</p>}
    </div>
  )
}

function StringList({
  values,
  onChange,
  placeholder,
}: {
  values: string[]
  onChange: (values: string[]) => void
  placeholder: string
}) {
  return (
    <div className="space-y-2">
      {values.map((value, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={value}
            placeholder={placeholder}
            onChange={(e) =>
              onChange(values.map((v, i) => (i === index ? e.target.value : v)))
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(values.filter((_, i) => i !== index))}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove item {index + 1}</span>
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...values, ""])}>
        <Plus className="h-4 w-4 mr-1" /> Add
      </Button>
    </div>
  )
}

function JsonField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  let invalid = false
  if (value.trim()) {
    try {
      JSON.parse(value)
    } catch {
      invalid = true
    }
  }

  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>
      <Textarea
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`font-mono text-xs ${invalid ? "border-red-400" : ""}`}
        spellCheck={false}
      />
      {invalid && <p className="mt-1 text-xs text-red-600">Not valid JSON</p>}
    </div>
  )
}
