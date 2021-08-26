/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link } from './link'

export const BlogCard = ({ blogPosts }) => {
  return (
    <Center py={6}>
      {blogPosts.map((blogPost) => (
        <Box
          as="article"
          key={blogPost.id}
          maxW={'445px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          mx="2"
          overflow={'hidden'}
        >
          <Link href={`/posts/${blogPost.id}`}>
            <a>
              <Box
                h={'210px'}
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}
                pos={'relative'}
              >
                <Image
                  {...blogPost.headerImage.img}
                  layout={'fill'}
                  src={blogPost.headerImage.src}
                  placeholder="blur"
                  blurDataURL={blogPost.headerImage.base64}
                  alt={blogPost.headerImage.alt}
                  objectFit="cover"
                />
              </Box>
              <Stack>
                <Text
                  color={'green.500'}
                  textTransform={'uppercase'}
                  fontWeight={800}
                  fontSize={'sm'}
                  letterSpacing={1.1}
                >
                  Blog
                </Text>
                <Heading
                  color={useColorModeValue('gray.700', 'white')}
                  fontSize={'2xl'}
                  fontFamily={'body'}
                >
                  {blogPost.title}
                </Heading>
              </Stack>
              <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                <Avatar
                  src={`https://github.com/${blogPost.author}.png`}
                  alt={'Author'}
                />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                  <Text fontWeight={600}>{blogPost.author}</Text>
                  <Text color={'gray.500'}>{blogPost.createdAt}</Text>
                </Stack>
              </Stack>
            </a>
          </Link>
        </Box>
      ))}
    </Center>
  )
}
