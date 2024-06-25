"use client";

import Modal from "@/components/Layout/Modal/Modal";
import Anchor from "@/components/Layout/Modal/Anchor";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import { BsHouse } from "react-icons/bs";
import Flex from "@/components/Layout/Flex";
import Image from "next/image";
import { IoPersonSharp } from "react-icons/io5";
import IconButton from "@/components/Layout/IconButton";
import { PiX } from "react-icons/pi";
import { Fragment, useEffect, useState } from "react";
import { IoMdResize } from "react-icons/io";

interface Props {
  handleConfirm: (value: any) => void;
  modalData: any;
}

export default function Houses({ handleConfirm, modalData }: Props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    fetch("https://domki.szurag.pl/api/house", {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Anchor
        modal={({ open, handleClose }) => (
          <Modal open={open} handleClose={handleClose} sx={{ p: 1 }}>
            <Flex between sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", ml: 2, mt: 1 }}
              >
                Lista domków
              </Typography>
              <IconButton onClick={handleClose}>
                <PiX />
              </IconButton>
            </Flex>
            <Flex column>
              {data.length === 0 && "Brak domków"}
              {loading && (
                <Flex center alignCenter>
                  <CircularProgress />
                </Flex>
              )}
              {data.map((house: any, index: number, array: Array<any>) => (
                <Fragment key={index}>
                  <Flex
                    alignCenter
                    sx={{
                      gap: 2,
                      py: 2.5,
                      "&:hover": { backgroundColor: "#eee" },
                      "&:active": { backgroundColor: "#ddd" },
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                    onClick={() => {
                      handleConfirm(house);
                      handleClose();
                    }}
                  >
                    <Image
                      src={house.images?.[0].url}
                      alt={house.name}
                      width="64"
                      height="44"
                      objectFit="cover"
                      style={{
                        borderRadius: "9px",
                        marginLeft: "10px",
                      }}
                    />
                    <Flex column between fullWidth>
                      <Flex sx={{ gap: 2 }} alignCenter>
                        <Tooltip
                          title={
                            <div>
                              <Flex>
                                Nazwa:&nbsp;
                                <span style={{ fontWeight: "bold" }}>
                                  {house.name}
                                </span>
                              </Flex>
                              <Flex>
                                Opis:&nbsp;
                                <span style={{ fontWeight: "bold" }}>
                                  {house.description}
                                </span>
                              </Flex>
                            </div>
                          }
                        >
                          <span style={{ fontSize: 20 }}>
                            {house.name.substring(0, 14)}
                            {house.name?.length > 14 ? "..." : ""}{" "}
                          </span>
                        </Tooltip>

                        <Chip
                          style={{
                            backgroundColor: house.label.color,
                            color: "white",
                          }}
                          size="small"
                          label={house.label.name}
                        />
                      </Flex>
                      <Flex between>
                        <span style={{ fontWeight: "bold" }}>
                          {house.price} $
                        </span>
                        <Flex alignCenter sx={{ gap: 0.5 }}>
                          {house.size} m²
                          <IoMdResize
                            color="#999"
                            style={{ marginRight: "20px" }}
                          />
                          {house.capacity}x
                          <IoPersonSharp color="#999" />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                  {array.length - 1 !== index && (
                    <Divider orientation="horizontal" flexItem />
                  )}
                </Fragment>
              ))}
            </Flex>
          </Modal>
        )}
        body={({ handleOpen }) => (
          <Flex center fullWidth>
            <Button
              sx={{ mt: 2, flex: 1 }}
              variant="outlined"
              onClick={handleOpen}
              startIcon={<BsHouse size={20} />}
            >
              {modalData.name ? modalData.name : "Wybierz domek"}
            </Button>
          </Flex>
        )}
      />
    </>
  );
}
