import { MasterClassPopup } from "@/components/MasterClassPopup"

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <MasterClassPopup />
        </>
    )
}
