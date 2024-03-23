import Flex from "@/components/Layout/Flex";
import { Avatar, Box, IconButton } from "@mui/material";
import { CiBellOn, CiSearch, CiSettings } from "react-icons/ci";

export default function Toolbar() {
  return (
    <Flex sx={{ gap: 1 }} around>
      <Flex alignCenter>
        <IconButton sx={{ fontSize: 26 }} color="secondary">
          <CiSearch />
        </IconButton>
      </Flex>
      <Flex alignCenter>
        <IconButton sx={{ fontSize: 26 }} color="secondary">
          <CiBellOn />
        </IconButton>
      </Flex>
      <Flex alignCenter>
        <IconButton sx={{ fontSize: 26 }} color="secondary">
          <CiSettings />
        </IconButton>
      </Flex>
      <Flex alignCenter>
        <IconButton sx={{ fontSize: 26 }} color="secondary">
          <Avatar />
        </IconButton>
      </Flex>
    </Flex>
  );
}
