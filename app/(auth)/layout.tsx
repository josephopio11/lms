import Image from "next/image"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex items-center justify-center bg-sky-900">
      {children}
    </div>
  )
}
