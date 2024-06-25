import { Paper, PaperProps } from "@mui/material";

export default function ContextPaper({ children, ...props }: PaperProps) {
  return (
    <Paper
      {...props}
      sx={{
        position: "absolute",
        left: "50%",
        bottom: "5%",
        transform: "translateX(-50%)",
        zIndex: 1200,
        p: 2,
        borderRadius: "18px",
        minWidth: "300px",
        cursor: "default",
        maxHeight: "90vh",
        maxWidth: "90vw",
        ...props.sx,
      }}
    >
      {children}
    </Paper>
  );
}
