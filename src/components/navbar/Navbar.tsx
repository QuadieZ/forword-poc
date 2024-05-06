"use client";

// Navbar.tsx
import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setVisible(
        (prevScrollPos > currentScrollPos &&
          prevScrollPos - currentScrollPos > 70) ||
          currentScrollPos < 10
      );

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <Box
      position="fixed"
      width="100%"
      zIndex="1000"
      transition="top 0.3s"
      top={visible ? "0" : "-60px"}
    >
      <Flex
        bg={useColorModeValue("#CDD3EC", "#1D1D1D")} //block color
        color={useColorModeValue("#1D1D1D", "#CDD3EC")} //the alphabet color inside block
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("#CDD3EC", "#1D1D1D")} // border color of the block
        align={"center"}
        justify="space-between"
      >
        {/* Left side with logo */}
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "left", md: "start" }}
          align="center"
        >
          <Box boxSize="auto">
            <Text>Forword</Text>
          </Box>
        </Flex>

        {/* Hamburger Icon (visible on smaller screens) */}
        <Flex display={{ base: "flex", md: "none" }} align="center" pr={4}>
          <IconButton
            onClick={onToggle}
            _hover={{}}
            _active={{}}
            icon={
              isOpen ? (
                <IoCloseOutline size="24px" color="#1D1D1D" /> // This color of close icon when zoom in
              ) : (
                <RxHamburgerMenu size="24px" color="#1D1D1D" /> // This color of hamburger icon when zoom in
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        {/* Right side with navigation links (visible on larger screens) */}
        <Flex display={{ base: "none", md: "flex" }} ml={10}>
          <DesktopNav />
        </Flex>
      </Flex>

      {/* Mobile Navigation (visible on smaller screens) */}
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("#1D1D1D", "#750E21"); // navbar label element color (not zoom-in)
  const linkHoverColor = useColorModeValue("#4CB9E7", "#1640D6"); // navbar label element color when hover (not zoom-in)
  const popoverContentBgColor = "#FFFFFF"; // block when hover label element

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"16px"}
                fontWeight={500}
                color={linkColor}
                padding={"15px"}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
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
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("#CDD3EC", "#CDD3EC") }} //This is highlight Color when hover sub label inside the box
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            fontSize={"16px"}
            _groupHover={{ color: useColorModeValue("#FFFFFF", "#CDD3EC") }} // This is alphabet Color when hover sub label inside the box
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"14px"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"#1D1D1D"} w={5} h={5} as={HiOutlineChevronRight} />{" "}
          {/*Color of icon right > when zoom out*/}
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("#CDD3EC", "gray.800")}
      px={8}
      pb={4}
      display={{ md: "none" }}
      fontSize={"16px"}
      borderBottom="1px solid"
      borderColor="content.primary"
    >
      {" "}
      {/*Block color when zoom in (it's a menu block!!)*/}
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, subLabel }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Flex>
          <Text
            fontWeight={600}
            color={useColorModeValue("#FFFFFF", "gray.200")}
          >
            {" "}
            {/*This is an alphabet color for label when zoom in*/}
            {label}
          </Text>

          {children && (
            <Icon
              as={HiOutlineChevronDown}
              color="#FFFFFF" /*Color of icon right > when zoom in*/
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("#FF3535", "gray.700")} //this is line color
          align={"start"}
        ></Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export default Navbar;

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "write",
    href: "/company/create/session/editor",
  },
  {
    label: "Peofile Picture is here",
    href: "#contact",
    children: [
      {
        label: "Profile",
        href: "/founders/pichyapa",
      },
      {
        label: "Save",
        href: "/founders/ruedhaidham",
      },
      {
        label: "Customer support",
        href: "/founders/sakolkrit",
      },
      {
        label: "Setting",
        href: "/founders/yapar",
      },
      {
        label: "Logout",
        href: "/founders/yapar",
      },
    ],
  },
];
