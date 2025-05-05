import { ReactNode } from "react"
import { NavBar } from "./NavBar"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <NavBar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
