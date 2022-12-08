import { Box } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  return(
    <Box py={4}>
      <Link href="/">Home</Link>
    </Box>
  );
};