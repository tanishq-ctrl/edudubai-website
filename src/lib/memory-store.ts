/**
 * In-memory store for payments (Phase 1 MVP)
 * Replace with database in Phase 2
 */

export interface PaymentRecord {
  id: string
  courseSlug: string
  orderId: string
  paymentId: string
  email?: string
  createdAt: Date
}

class MemoryStore {
  private payments: PaymentRecord[] = []

  recordPayment({
    courseSlug,
    orderId,
    paymentId,
    email,
    createdAt = new Date(),
  }: {
    courseSlug: string
    orderId: string
    paymentId: string
    email?: string
    createdAt?: Date
  }): PaymentRecord {
    const payment: PaymentRecord = {
      id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      courseSlug,
      orderId,
      paymentId,
      email,
      createdAt,
    }

    this.payments.push(payment)
    return payment
  }

  getPayments(): PaymentRecord[] {
    return [...this.payments]
  }

  getPaymentByOrderId(orderId: string): PaymentRecord | undefined {
    return this.payments.find((p) => p.orderId === orderId)
  }

  getPaymentsByCourseSlug(courseSlug: string): PaymentRecord[] {
    return this.payments.filter((p) => p.courseSlug === courseSlug)
  }
}

// Singleton instance
export const memoryStore = new MemoryStore()

