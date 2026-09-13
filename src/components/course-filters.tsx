"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DeliveryMode, Category, Course } from "@/lib/types"
import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

/**
 * Catalogue filters.
 *
 * The options are NOT a hardcoded list. This component used to declare eight
 * categories while the catalogue only ever used four, so half the menu led
 * straight to an empty state -- a filter that can only fail is worse than no
 * filter. The server passes the facets it actually found, so an option exists
 * only when something matches it.
 *
 * Issuing body used to be reachable only through the "Certifications" dropdown
 * in the header (ACAMS / GCI). That put a filter in the navigation, where it
 * replaced the visitor's other choices instead of combining with them. It is a
 * filter, so it belongs here.
 */

const CATEGORY_LABELS: Partial<Record<Category, string>> = {
  AML_CFT: "AML / CFT",
  SANCTIONS: "Sanctions",
  TBML: "Trade-based ML",
  FATCA_CRS: "FATCA / CRS",
  TAX: "Tax",
  GOVERNANCE: "Governance",
  RISK: "Risk management",
  DATA_AI: "Data & AI",
}

const LEVEL_LABELS: Record<Course["level"], string> = {
  BEGINNER: "Foundation",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
}

const deliveryModes: { value: DeliveryMode; label: string }[] = [
  { value: "IN_PERSON", label: "In-person" },
  { value: "LIVE_VIRTUAL", label: "Live virtual" },
]

const titleCase = (v: string) =>
  v
    .split("_")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ")

export type CourseFacets = {
  categories: Category[]
  bodies: string[]
  levels: Course["level"][]
}

export function CourseFilters({ facets }: { facets: CourseFacets }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    (searchParams.get("category") as Category) || "all",
  )
  const [selectedMode, setSelectedMode] = useState<DeliveryMode | "all">(
    (searchParams.get("mode") as DeliveryMode) || "all",
  )
  const [selectedBody, setSelectedBody] = useState<string>(searchParams.get("body") || "all")
  const [selectedLevel, setSelectedLevel] = useState<string>(searchParams.get("level") || "all")

  useEffect(() => {
    // Debounce the text field; the selects and pills apply immediately.
    const timer = setTimeout(
      () => {
        const params = new URLSearchParams()
        if (searchQuery) params.set("q", searchQuery)
        if (selectedCategory !== "all") params.set("category", selectedCategory)
        if (selectedMode !== "all") params.set("mode", selectedMode)
        if (selectedBody !== "all") params.set("body", selectedBody)
        if (selectedLevel !== "all") params.set("level", selectedLevel)

        const queryString = params.toString()
        router.push(`/courses${queryString ? `?${queryString}` : ""}`, { scroll: false })
      },
      searchQuery ? 300 : 0,
    )

    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory, selectedMode, selectedBody, selectedLevel, router])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedMode("all")
    setSelectedBody("all")
    setSelectedLevel("all")
  }

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedCategory !== "all" ||
    selectedMode !== "all" ||
    selectedBody !== "all" ||
    selectedLevel !== "all"

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <label htmlFor="course-search" className="sr-only">
          Search courses
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-content-subtle"
        />
        <Input
          id="course-search"
          name="q"
          type="search"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search by title, topic or keyword…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-13 bg-surface pl-11 pr-11"
        />
        {searchQuery ? (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {facets.bodies.length > 1 ? (
          <Select value={selectedBody} onValueChange={setSelectedBody}>
            <SelectTrigger className="w-[calc(50%-0.375rem)] bg-surface sm:w-[13rem]" aria-label="Filter by issuing body">
              <SelectValue placeholder="Any issuer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any issuer</SelectItem>
              {facets.bodies.map((body) => (
                <SelectItem key={body} value={body}>
                  {body === "HOCK_INTERNATIONAL" ? "HOCK International" : body}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}

        {facets.categories.length > 1 ? (
          <Select
            value={selectedCategory}
            onValueChange={(v) => setSelectedCategory(v === "all" ? "all" : (v as Category))}
          >
            <SelectTrigger className="w-[calc(50%-0.375rem)] bg-surface sm:w-[13rem]" aria-label="Filter by subject">
              <SelectValue placeholder="Any subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any subject</SelectItem>
              {facets.categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {CATEGORY_LABELS[cat] ?? titleCase(cat)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}

        {facets.levels.length > 1 ? (
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[calc(50%-0.375rem)] bg-surface sm:w-[11rem]" aria-label="Filter by level">
              <SelectValue placeholder="Any level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any level</SelectItem>
              {facets.levels.map((lvl) => (
                <SelectItem key={lvl} value={lvl}>
                  {LEVEL_LABELS[lvl]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}

        {/*
          Delivery mode is single-choice, so it is a radio group rather than a
          row of buttons -- a screen reader otherwise gets unrelated buttons
          with no indication of which one is active.
        */}
        <div role="radiogroup" aria-label="Delivery format" className="flex flex-wrap gap-2">
          {[{ value: "all" as const, label: "Any format" }, ...deliveryModes].map((mode) => {
            const active = selectedMode === mode.value
            return (
              <button
                key={mode.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelectedMode(mode.value as DeliveryMode | "all")}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium transition-[background-color,border-color,color] duration-fast ease-out-expo",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2",
                  active
                    ? "border-navy-700 bg-navy-700 text-white shadow-sm"
                    : "border-line-strong bg-surface text-content hover:border-navy-400 hover:text-navy-700",
                )}
              >
                {mode.label}
              </button>
            )
          })}
        </div>

        {hasActiveFilters ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto whitespace-nowrap text-content-muted hover:text-navy-700"
          >
            <X className="h-3.5 w-3.5" />
            Clear all
          </Button>
        ) : null}
      </div>
    </div>
  )
}
