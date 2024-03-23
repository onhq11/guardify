import { Button, IconButton, Paper } from "@mui/material";
import { PiInfo } from "react-icons/pi";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <Button variant="contained" color="primary">
        primary
      </Button>
      <Button variant="contained" color="secondary">
        secondary
      </Button>
      <Button variant="contained" color="success">
        success
      </Button>
      <Button variant="contained" color="warning">
        warning
      </Button>
      <Button variant="contained" color="error">
        error
      </Button>
      <Button variant="contained" color="info">
        info
      </Button>
      <IconButton color="primary">
        <PiInfo />
      </IconButton>
      <IconButton color="secondary">
        <PiInfo />
      </IconButton>
      <IconButton color="success">
        <PiInfo />
      </IconButton>
      <IconButton color="warning">
        <PiInfo />
      </IconButton>
      <IconButton color="error">
        <PiInfo />
      </IconButton>
      <IconButton color="info">
        <PiInfo />
      </IconButton>
      <Paper>
        <h2>Card</h2>
        <p>Some content</p>
      </Paper>
    </>
  );
}
