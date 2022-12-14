import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import { Button } from '@components/Button'
import Image from 'next/image'
import LinkNext from 'next/link'

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

export function NavBar() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box
      pos="fixed"
      top="0"
      w="full"
      zIndex={10}
      as="header"
      css={{ backdropFilter: 'saturate(180%) blur(5px)' }}
    >
      <Flex
        bg={useColorModeValue('whiteAlpha.700', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4, md: 32 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('brand.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
          <LinkNext href="/">
            <Box pos="relative" w="30px" h="30px">
              <Image src={'/logo.jpg'} alt="logo" fill />
            </Box>
          </LinkNext>
        </Flex>
        <Flex alignItems="center" flex={{ base: 1 }}>
          <Box display={{ base: 'none', md: 'flex' }}>
            <LinkNext href="/">
              <Box pos="relative" w="40px" h="40px">
                <Image src={'/logo.jpg'} alt="logo" fill />
              </Box>
            </LinkNext>
          </Box>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={{ md: 3 }}
        >
          <LinkNext href={'/login?type=signIn'}>
            <Button variant={'tertiary'}>Sign In</Button>
          </LinkNext>
          <LinkNext href={'/login?type=signUp'}>
            <Button>Create free account</Button>
          </LinkNext>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('brand.600', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <LinkNext href={navItem.href ?? '#'}>
                <Text
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Text>
              </LinkNext>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      target="_blank"
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('brand.500', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'white' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'} _groupHover={{ color: 'white' }}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'white'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      minH="100vh"
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <LinkNext href={href ?? '#'}>
        <Flex
          py={2}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </LinkNext>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href} target="_blank">
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Courses',
    href: '/courses',
  },
  {
    label: 'Community',
    children: [
      {
        label: 'Discord',
        subLabel: 'Our server on discord',
        href: 'https://discord.gg/TKUsrKs5Qb',
      },
      {
        label: 'Whatsapp',
        subLabel: 'Our group no Whatsapp',
        href: 'https://chat.whatsapp.com/FgZDYhQwPJMERF1mp2utbd',
      },
      {
        label: 'Instagram',
        subLabel: 'Our profile on Instagram',
        href: 'https://www.instagram.com/piauindie/',
      },
      {
        label: 'Youtube',
        subLabel: 'Our channel on Youtube',
        href: 'https://www.youtube.com/channel/UChSrwvFjBscD_b7LKnNcYMw',
      },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]
