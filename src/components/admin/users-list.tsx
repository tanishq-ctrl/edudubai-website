"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/**
 * The user list.
 *
 * This was a grid of cards, one per user, which is the wrong shape for a list
 * whose whole purpose is comparison and lookup: three cards per row, no way to
 * find anybody, and the roll-up figures buried inside each card. A table puts
 * the same facts in scannable columns and makes room for a search box, which
 * is the thing that was actually missing -- there is no other way to answer
 * "is this person registered" without reading every card.
 *
 * Filtering is client-side because the whole list is already in the page.
 */

interface User {
  id: string
  email: string
  name: string | null
  role: string
  createdAt: Date
  _count: {
    enrollments: number
    payments: number
  }
}

const ROLE_STYLES: Record<string, string> = {
  ADMIN: "bg-crimson-600 text-content-on-dark",
  INSTRUCTOR: "bg-gold-400 text-ink-950",
  STUDENT: "bg-surface-sunken text-content-strong",
}

export function AdminUsersList({ users }: { users: User[] }) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return users
    return users.filter(
      (user) =>
        user.email.toLowerCase().includes(term) ||
        (user.name ?? "").toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    )
  }, [users, search])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-content-strong">
            Registered users
          </h2>
          <p className="mt-1 text-sm text-content-muted">
            {filtered.length === users.length
              ? `${users.length} ${users.length === 1 ? "account" : "accounts"}`
              : `${filtered.length} of ${users.length} shown`}
          </p>
        </div>

        <div className="relative w-full max-w-xs">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-subtle"
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, email or role"
            aria-label="Search users"
            className="pl-9"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-sm border border-line bg-surface-raised">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Enrolments</TableHead>
              <TableHead className="text-right">Payments</TableHead>
              <TableHead className="text-right">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-content-strong">
                  {user.name || "—"}
                </TableCell>
                <TableCell className="text-content-muted">
                  <a
                    href={`mailto:${user.email}`}
                    className="underline-offset-4 hover:text-crimson-600 hover:underline"
                  >
                    {user.email}
                  </a>
                </TableCell>
                <TableCell>
                  <Badge
                    className={ROLE_STYLES[user.role] ?? "bg-surface-sunken text-content-strong"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular">
                  {user._count.enrollments}
                </TableCell>
                <TableCell className="text-right tabular">{user._count.payments}</TableCell>
                <TableCell className="text-right tabular text-content-muted">
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-content-muted">
                  No account matches “{search}”.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
