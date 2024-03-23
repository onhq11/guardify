import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Label({ children }: Props) {
  return (
    <span
      style={{
        textTransform: "uppercase",
        color: "#525976",
        fontSize: 13,
        paddingLeft: "5px",
        marginBottom: "5px",
        marginTop: "35px",
      }}
    >
      {children}
    </span>
  );
}
