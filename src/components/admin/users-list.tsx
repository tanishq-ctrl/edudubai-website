"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

export function AdminUsersList({ users }: { users: User[] }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy mb-6">All Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{user.name || user.email}</CardTitle>
                <Badge>{user.role}</Badge>
              </div>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Enrollments:</span>
                  <span className="font-medium">{user._count.enrollments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payments:</span>
                  <span className="font-medium">{user._count.payments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Joined:</span>
                  <span className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

