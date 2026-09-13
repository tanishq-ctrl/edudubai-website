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
import { DeliveryMode, Category } from "@/lib/types"
import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const categories: { value: Category; label: string }[] = [
  { value: "AML_CFT", label: "AML/CFT" },
  { value: "SANCTIONS", label: "Sanctions" },
  { value: "TBML", label: "Trade-Based ML" },
  { value: "FATCA_CRS", label: "FATCA/CRS" },
  { value: "TAX", label: "Tax" },
  { value: "GOVERNANCE", label: "Governance" },
  { value: "RISK", label: "Risk Management" },
  { value: "DATA_AI", label: "Data & AI" },
]

const deliveryModes: { value: DeliveryMode; label: string }[] = [
  { value: "IN_PERSON", label: "In-Person" },
  { value: "LIVE_VIRTUAL", label: "Live Virtual" },
]

export function CourseFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    (searchParams.get("category") as Category) || "all"
  )
  const [selectedMode, setSelectedMode] = useState<DeliveryMode | "all">(
    (searchParams.get("mode") as DeliveryMode) || "all"
  )
  const [selectedBody, setSelectedBody] = useState<string | "all">(
    searchParams.get("body") || "all"
  )

  useEffect(() => {
    // Debounce search to avoid too many URL updates
    const timer = setTimeout(() => {
      const params = new URLSearchParams()
      if (searchQuery) params.set("q", searchQuery)
      if (selectedCategory !== "all") params.set("category", selectedCategory)
      if (selectedMode !== "all") params.set("mode", selectedMode)
      if (selectedBody !== "all") params.set("body", selectedBody)

      const queryString = params.toString()
      router.push(`/courses${queryString ? `?${queryString}` : ""}`, { scroll: false })
    }, searchQuery ? 300 : 0) // Debounce search, immediate for filters

    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory, selectedMode, selectedBody, router])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? "all" : (value as Category))
  }

  const handleModeChange = (mode: DeliveryMode | "all") => {
    setSelectedMode(mode)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedMode("all")
    setSelectedBody("all")
  }

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedMode !== "all" || selectedBody !== "all"

  return (
    <div className="flex flex-col gap-5">
      {/* Search */}
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
          onChange={(e) => handleSearchChange(e.target.value)}
          className="h-13 pl-11 pr-11"
        />
        {searchQuery ? (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => handleSearchChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
      </div>

      {/* Filter row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full lg:w-[16rem]" aria-label="Filter by category">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/*
          Delivery mode is a single-choice filter, so it is exposed as a radio
          group rather than a row of buttons -- a screen reader otherwise gets
          three unrelated buttons with no indication of which one is active.
        */}
        <div
          role="radiogroup"
          aria-label="Delivery format"
          className="flex flex-1 flex-wrap gap-2"
        >
          {[{ value: "all" as const, label: "All formats" }, ...deliveryModes].map((mode) => {
            const active = selectedMode === mode.value
            return (
              <button
                key={mode.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => handleModeChange(mode.value as DeliveryMode | "all")}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium transition-[background-color,border-color,color] duration-fast ease-out-expo",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2",
                  active
                    ? "border-navy-700 bg-navy-700 text-white shadow-sm"
                    : "border-line-strong bg-surface-raised text-content hover:border-navy-400 hover:text-navy-700",
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
            className="whitespace-nowrap text-content-muted hover:text-navy-700"
          >
            <X className="h-3.5 w-3.5" />
            Clear all
          </Button>
        ) : null}
      </div>
    </div>
  )
}
