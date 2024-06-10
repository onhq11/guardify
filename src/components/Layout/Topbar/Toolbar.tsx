import Flex from "@/components/Layout/Flex";
import { Avatar } from "@mui/material";
import { CiBellOn, CiSearch, CiSettings } from "react-icons/ci";
import IconButton from "@/components/Layout/IconButton";

export default function Toolbar() {
  return (
    <Flex sx={{ gap: 1, mt: { xs: 4, lg: 2 } }} around>
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
