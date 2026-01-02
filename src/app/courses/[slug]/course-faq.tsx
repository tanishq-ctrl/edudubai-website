import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Course } from "@/lib/types"
import { HelpCircle } from "lucide-react"

interface CourseFAQProps {
  course: Course
}

export function CourseFAQ({ course }: CourseFAQProps) {
  if (!course.faq || course.faq.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-brand-gold" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {course.faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-brand-navy">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-text-muted">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
