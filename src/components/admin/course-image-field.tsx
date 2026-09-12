"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, X } from "lucide-react"

/**
 * Image picker for the course editor.
 *
 * Accepts either an upload (stored in the course-images bucket via the
 * admin-only API route) or a hand-typed path, since the existing catalogue
 * points at files in /public and those paths must stay editable.
 */
export function CourseImageField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function upload(file: File) {
    setError(null)
    setUploading(true)

    try {
      const body = new FormData()
      body.append("file", file)

      const response = await fetch("/api/admin/course-image", { method: "POST", body })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(result.error ?? "Upload failed")
        return
      }

      onChange(result.url)
    } catch {
      setError("Upload failed. Check your connection and try again.")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>

      {value && (
        <div className="relative mb-2 h-40 w-full overflow-hidden rounded-md border bg-neutral-bg-subtle">
          {/* next/image is configured for **.supabase.co and local paths alike. */}
          <Image
            src={value}
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 320px"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label={`Clear ${label}`}
            className="absolute right-2 top-2 rounded-full bg-white/90 p-1 shadow hover:bg-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/courses/example.jpg"
          className="text-xs"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          <span className="sr-only">Upload {label}</span>
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) upload(file)
        }}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
