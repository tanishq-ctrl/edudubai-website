"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"
import { Loader2, AlertCircle, CheckCircle2, MessageSquare, Calendar } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { z } from "zod"

const supportRequestSchema = z.object({
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function SupportPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [supportRequests, setSupportRequests] = useState<any[]>([])
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  })

  useEffect(() => {
    const loadSupportRequests = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login?next=/dashboard/support")
          return
        }

        // Get support requests
        const { data: requests, error: requestsError } = await supabase
          .from("support_requests")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (requestsError) {
          console.error("Error loading support requests:", requestsError)
        } else {
          setSupportRequests(requests || [])
        }
      } catch (err) {
        console.error("Error loading support requests:", err)
      } finally {
        setLoading(false)
      }
    }

    loadSupportRequests()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      // Validate form data
      const validatedData = supportRequestSchema.parse(formData)

      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError("You must be logged in to submit a support request")
        return
      }

      // Create support request
      const { data, error: createError } = await supabase
        .from("support_requests")
        .insert({
          user_id: user.id,
          subject: validatedData.subject,
          message: validatedData.message,
          status: "OPEN",
        })
        .select()
        .single()

      if (createError) {
        setError(createError.message || "Failed to submit support request")
        return
      }

      // Add to list
      setSupportRequests([data, ...supportRequests])
      setFormData({ subject: "", message: "" })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else {
        console.error("Error submitting support request:", err)
        setError("An error occurred. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "OPEN":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Open</Badge>
      case "IN_PROGRESS":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">In Progress</Badge>
      case "RESOLVED":
        return <Badge className="bg-green-500 hover:bg-green-600">Resolved</Badge>
      case "CLOSED":
        return <Badge variant="outline">Closed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy mb-2">Support</h1>
        <p className="text-neutral-text-muted">
          Get help with your courses or account
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Support Request */}
        <Card>
          <CardHeader>
            <CardTitle>Submit a Request</CardTitle>
            <CardDescription>
              We&apos;ll get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Support request submitted successfully!
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="What can we help you with?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide details about your issue or question..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-semibold"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support Requests History */}
        <Card>
          <CardHeader>
            <CardTitle>Request History</CardTitle>
            <CardDescription>
              {supportRequests.length} {supportRequests.length === 1 ? "request" : "requests"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : supportRequests.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-neutral-text-muted mx-auto mb-4" />
                <p className="text-neutral-text-muted">
                  No support requests yet
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {supportRequests.map((request) => (
                  <div key={request.id} className="border-b border-neutral-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-brand-navy">{request.subject}</h3>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm text-neutral-text-muted mb-3 line-clamp-2">
                      {request.message}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-neutral-text-muted">
                      <Calendar className="h-3 w-3" />
                      {new Date(request.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

