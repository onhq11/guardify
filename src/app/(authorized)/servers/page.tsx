import Flex from "@/components/Layout/Flex";
import {
  Box,
  Card,
  Chip,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import TableCell from "@/components/Table/TableCell";
import { GoDotFill } from "react-icons/go";
import { PiInfo, PiSignIn } from "react-icons/pi";
import LinkModal from "@/app/(authorized)/servers/LinkModal";
import { InstancesAPI } from "@/api/Instances";
import Link from "next/link";
import { generatePath } from "@/utils/route";
import { protectedRoutes } from "@/config/routes/protectedRoutes";
import IconButton from "@/components/Layout/IconButton";

export default async function () {
  const data = await InstancesAPI.LIST.listInstances();

  return (
    <Flex center sx={{ flex: 1 }}>
      <Card sx={{ p: 3, flex: 1 }}>
        <Flex column sx={{ flex: 1 }}>
          <Flex end>
            <LinkModal />
          </Flex>
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
                {data.items?.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <Flex alignCenter sx={{ gap: 1 }}>
                        {item.name} <GoDotFill style={{ color: "green" }} />
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
                      <IconButton
                        label={
                          <Flex column>
                            <Box>
                              <span style={{ fontWeight: "bold" }}>
                                Address:
                              </span>{" "}
                              {item.address}
                            </Box>
                          </Flex>
                        }
                        sx={{ p: 0.5 }}
                        color="info"
                      >
                        <PiInfo style={{ fontSize: 20 }} />
                      </IconButton>
                      <IconButton
                        href={generatePath(
                          protectedRoutes.server_details.href,
                          { id: item.id },
                        )}
                        label={"Server Details"}
                        sx={{ p: 0.5 }}
                        color="secondary"
                      >
                        <PiSignIn style={{ fontSize: 20 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Flex>
      </Card>
    </Flex>
  );
}
