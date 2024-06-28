import IconButton from "@/components/Layout/IconButton";
import { createElement, FunctionComponent } from "react";
import { IconButtonProps, Tooltip } from "@mui/material";
import { EditorModes } from "@/app/mapbox-leaflet/consts";
import { isPoi } from "@/app/mapbox-leaflet/utils";

interface Props {
  editorMode: EditorModes;
  mode: Array<EditorModes>;
  icon: FunctionComponent<Function>;
  handleUpdateEditorMode: (mode: EditorModes) => void;
  label: string;
}

export default function ToolbarButton({
  editorMode,
  mode,
  icon,
  handleUpdateEditorMode,
  label,
  ...props
}: Props & IconButtonProps) {
  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          size="small"
          {...props}
          sx={{
            backgroundColor: mode.includes(editorMode) ? "#eee" : "white",
            borderRadius: "9px",
            p: 0.5,
            "&:hover": { backgroundColor: "#eee" },
            "&:active": { backgroundColor: "#eee" },
            ...props.sx,
          }}
          onClick={() =>
            handleUpdateEditorMode(isPoi(editorMode) ? mode[0] : mode[1])
          }
        >
          {createElement(icon)}
        </IconButton>
      </span>
    </Tooltip>
  );
}
