import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image src="/next.svg" alt="logo" width={100} height={100} />
    </Link>
  )
}

export default Logo