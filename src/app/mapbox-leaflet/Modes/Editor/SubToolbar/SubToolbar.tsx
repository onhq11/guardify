import { PiPencil, PiTrash, PiWrench } from "react-icons/pi";
import Flex from "@/components/Layout/Flex";
import ToolbarButton from "@/app/mapbox-leaflet/Modes/Editor/SubToolbar/ToolbarButton";
import { editorModes, EditorModes } from "@/app/mapbox-leaflet/consts";

interface Props {
  editorMode: EditorModes;
  handleUpdateEditorMode: (mode: EditorModes) => void;
}

export default function SubToolbar({
  editorMode,
  handleUpdateEditorMode,
}: Props) {
  return (
    <Flex
      sx={{
        position: "absolute",
        top: "6vh",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1200,
        gap: 1,
      }}
    >
      <ToolbarButton
        editorMode={editorMode}
        mode={[editorModes.POI_CREATE, editorModes.HOUSE_CREATE]}
        icon={PiPencil}
        handleUpdateEditorMode={handleUpdateEditorMode}
        label="Utwórz"
      />
      <ToolbarButton
        editorMode={editorMode}
        mode={[editorModes.POI_EDIT, editorModes.HOUSE_EDIT]}
        icon={PiWrench}
        handleUpdateEditorMode={handleUpdateEditorMode}
        label="Edytuj"
      />
      <ToolbarButton
        editorMode={editorMode}
        mode={[editorModes.POI_DELETE, editorModes.HOUSE_DELETE]}
        icon={PiTrash}
        color="error"
        handleUpdateEditorMode={handleUpdateEditorMode}
        label="Usuń"
      />
    </Flex>
  );
}
