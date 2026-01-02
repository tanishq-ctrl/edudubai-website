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
import { X } from "lucide-react"
import { useState, useEffect } from "react"

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
  { value: "SELF_PACED", label: "Self-Paced" },
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

  useEffect(() => {
    // Debounce search to avoid too many URL updates
    const timer = setTimeout(() => {
      const params = new URLSearchParams()
      if (searchQuery) params.set("q", searchQuery)
      if (selectedCategory !== "all") params.set("category", selectedCategory)
      if (selectedMode !== "all") params.set("mode", selectedMode)

      const queryString = params.toString()
      router.push(`/courses${queryString ? `?${queryString}` : ""}`, { scroll: false })
    }, searchQuery ? 300 : 0) // Debounce search, immediate for filters

    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory, selectedMode, router])

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
  }

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedMode !== "all"

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Input
          placeholder="Search courses by title, description, or keywords..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full h-12 text-base"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => handleSearchChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Category Select */}
        <div className="w-full lg:w-auto">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full lg:w-[220px] h-11">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Delivery Mode Chips */}
        <div className="flex flex-wrap gap-2 flex-1">
          <Button
            variant={selectedMode === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleModeChange("all")}
            className={
              selectedMode === "all"
                ? "bg-brand-navy text-white hover:bg-brand-navy-dark"
                : "border-neutral-border hover:border-brand-navy"
            }
          >
            All Formats
          </Button>
          {deliveryModes.map((mode) => (
            <Button
              key={mode.value}
              variant={selectedMode === mode.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeChange(mode.value)}
              className={
                selectedMode === mode.value
                  ? "bg-brand-navy text-white hover:bg-brand-navy-dark"
                  : "border-neutral-border hover:border-brand-navy"
              }
            >
              {mode.label}
            </Button>
          ))}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-neutral-text-muted hover:text-brand-navy whitespace-nowrap"
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  )
}

