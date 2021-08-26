import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Link = (props) => {
  const { children, href, ...rest } = props

  return (
    <NextLink passHref href={href}>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </NextLink>
  )
}
