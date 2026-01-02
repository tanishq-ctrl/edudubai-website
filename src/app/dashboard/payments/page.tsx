import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getUserPayments } from "@/server/dashboard/queries"
import { Download, CreditCard, Calendar } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mark as dynamic since it uses cookies
export const dynamic = 'force-dynamic'

export default async function PaymentsPage() {
  let user

  try {
    const supabase = await createClient()
    const { data: { user: authUser } } = await supabase.auth.getUser()
    user = authUser

    if (!user) {
      redirect("/auth/login?next=/dashboard/payments")
    }
  } catch (error) {
    console.error("Supabase error:", error)
    redirect("/auth/login?next=/dashboard/payments")
  }

  const payments = await getUserPayments(user.id)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
      case "FAILED":
        return <Badge variant="destructive">Failed</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy mb-2">Payments & Invoices</h1>
        <p className="text-neutral-text-muted">
          View your payment history and download invoices
        </p>
      </div>

      {payments.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Payments Yet</CardTitle>
            <CardDescription>
              Your payment history will appear here after you enroll in a course
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              {payments.length} {payments.length === 1 ? "payment" : "payments"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div className="font-medium text-brand-navy">
                          {payment.course_slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-neutral-bg-subtle px-2 py-1 rounded">
                          {payment.order_id.slice(0, 12)}...
                        </code>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatAmount(payment.amount_usd, payment.currency)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(payment.status)}
                      </TableCell>
                      <TableCell>
                        {new Date(payment.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {payment.status === "SUCCESS" && (
                          <Button variant="outline" size="sm" disabled>
                            <Download className="mr-2 h-3 w-3" />
                            Invoice
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {payments.map((payment) => (
                <Card key={payment.id} className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {payment.course_slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(payment.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-text-muted">Amount:</span>
                        <span className="font-semibold text-brand-navy">
                          {formatAmount(payment.amount_usd, payment.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-text-muted">Order ID:</span>
                        <code className="text-xs bg-neutral-bg-subtle px-2 py-1 rounded">
                          {payment.order_id.slice(0, 12)}...
                        </code>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-text-muted">
                        <Calendar className="h-4 w-4" />
                        {new Date(payment.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    {payment.status === "SUCCESS" && (
                      <Button variant="outline" className="w-full" disabled>
                        <Download className="mr-2 h-4 w-4" />
                        Download Invoice
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

