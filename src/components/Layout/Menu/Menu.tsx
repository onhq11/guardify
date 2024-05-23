import Image from "next/image";
import icon from "@/assets/horizontal-logo.png";
import { ReactNode } from "react";
import Flex from "@/components/Layout/Flex";
import Container from "@/components/Layout/Menu/Container";

interface Props {
  children: ReactNode;
}

export default function Menu({ children }: Props) {
  return (
    <Container>
      <Flex center sx={{ mt: 2, position: "relative", height: "50px" }}>
        <Image
          src={icon}
          layout="fill"
          objectFit="contain"
          alt={"Guardify"}
          style={{
            marginTop: "15px",
          }}
        />
      </Flex>
      <Flex column sx={{ gap: 1, mt: 6 }}>
        {children}
      </Flex>
    </Container>
  );
}
