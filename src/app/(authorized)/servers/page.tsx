import Flex from "@/components/Layout/Flex";
import {
  Card,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell from "@/components/Table/TableCell";
import { GoDotFill } from "react-icons/go";
import { PiSignIn } from "react-icons/pi";

export default function Panel() {
  return (
    <Flex center sx={{ flex: 1 }}>
      <Card sx={{ p: 2, flex: 1 }}>
        <Flex column sx={{ flex: 1 }}>
          <TableContainer sx={{ height: "80vh" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Server name</TableCell>
                  <TableCell>Healthy services</TableCell>
                  <TableCell>Updates Available</TableCell>
                  <TableCell>Uptime</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <Flex alignCenter sx={{ gap: 1 }}>
                      S720 <GoDotFill style={{ color: "green" }} />
                    </Flex>
                  </TableCell>
                  <TableCell>
                    <Chip size="small" color="info" label="3 / 5" />
                  </TableCell>
                  <TableCell>
                    <Chip size="small" color="info" label="Available: 12" />
                  </TableCell>
                  <TableCell>23d 15h 23m 12s</TableCell>
                  <TableCell align="right">
                    <IconButton sx={{ p: 0.5 }} color="secondary">
                      <PiSignIn style={{ fontSize: 20 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>
                    <Flex alignCenter sx={{ gap: 1 }}>
                      T630 <GoDotFill style={{ color: "green" }} />
                    </Flex>
                  </TableCell>
                  <TableCell>
                    <Chip size="small" color="success" label="12 / 12" />
                  </TableCell>
                  <TableCell>
                    <Chip size="small" color="success" label="Up to date" />
                  </TableCell>
                  <TableCell>2d 12h 3m 58s</TableCell>
                  <TableCell align="right">
                    <IconButton sx={{ p: 0.5 }} color="secondary">
                      <PiSignIn style={{ fontSize: 20 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>
                    <Flex alignCenter sx={{ gap: 1 }}>
                      Aspire M1935 <GoDotFill style={{ color: "red" }} />
                    </Flex>
                  </TableCell>
                  <TableCell>
                    <Chip size="small" color="error" label="0 / 38" />
                  </TableCell>
                  <TableCell>
                    <Chip size="small" color="error" label="Connection lost" />
                  </TableCell>
                  <TableCell>0s</TableCell>
                  <TableCell align="right">
                    <IconButton sx={{ p: 0.5 }} color="secondary">
                      <PiSignIn style={{ fontSize: 20 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Flex>
      </Card>
    </Flex>
  );
}
