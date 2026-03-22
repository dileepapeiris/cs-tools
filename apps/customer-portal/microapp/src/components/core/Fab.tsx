import { useProject } from "@root/src/context/project";
import { Fab as MuiFab } from "@wso2/oxygen-ui";
import { Plus } from "@wso2/oxygen-ui-icons-react";
import { Link } from "react-router-dom";

export function Fab() {
  const { noveraEnabled } = useProject();

  return (
    <MuiFab
      component={Link}
      role="link"
      size="medium"
      variant="extended"
      color="primary"
      sx={{ textTransform: "initial", position: "fixed", right: 10, bottom: "calc(var(--tab-bar-height) + 60px)" }}
      to={noveraEnabled ? "/chat" : "/create"}
    >
      <Plus />
      Create Case
    </MuiFab>
  );
}
