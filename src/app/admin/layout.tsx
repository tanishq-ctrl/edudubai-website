/**
 * The admin screens render under the site's fixed header, and `main` carries
 * no offset of its own, so without this the page title sits behind the nav --
 * the same defect the public pages had before the hero work.
 *
 * Access is checked per page (and again in every server action), not here: a
 * layout is not a security boundary.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ paddingTop: "var(--header-h)" }}>{children}</div>
}
