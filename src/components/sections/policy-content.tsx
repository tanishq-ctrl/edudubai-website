import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PolicySection {
  title: string
  content: string[]
}

interface PolicyContentProps {
  sections: PolicySection[]
}

export function PolicyContent({ sections }: PolicyContentProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {sections.map((section, index) => (
        <Card key={index} className="border-2 border-neutral-border">
          <CardHeader>
            <CardTitle className="text-xl">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-neutral-text">
              {section.content.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

