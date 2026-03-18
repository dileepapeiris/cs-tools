import { alpha, Chip, type ChipProps } from "@wso2/oxygen-ui";

import { PRIORITY_CHIP_COLOR_CONFIG, STATUS_CHIP_COLOR_CONFIG } from "./config";
import { useProject } from "@root/src/context/project";
import { useSuspenseQuery } from "@tanstack/react-query";
import { cases } from "@src/services/cases";

interface PriorityChipProps extends Omit<ChipProps, "label"> {
  prefix?: string;
  id?: string;
}

export function PriorityChip({ prefix, id, ...props }: PriorityChipProps) {
  const { projectId } = useProject();
  const color = (id ? PRIORITY_CHIP_COLOR_CONFIG[id] : "default") ?? "default";
  const label =
    useSuspenseQuery(cases.filters(projectId!)).data.severities.find((severity) => severity.id === id)?.label ?? "N/A";

  return (
    <Chip
      label={`${prefix ? `${prefix}: ` : ""}${label}`}
      {...props}
      sx={(theme) => {
        if (color === "default") {
          return {
            bgcolor: alpha(theme.palette.text.primary, 0.08),
            color: theme.palette.text.secondary,
          };
        }

        return {
          bgcolor: alpha(theme.palette[color].light, 0.1),
          color: theme.palette[color].light,
        };
      }}
    />
  );
}

interface StatusChipProps extends Omit<ChipProps, "label"> {
  id?: string;
}

export function StatusChip({ id, ...props }: StatusChipProps) {
  const { projectId } = useProject();
  const color = (id ? STATUS_CHIP_COLOR_CONFIG[id] : "default") ?? "default";
  const label =
    useSuspenseQuery(cases.filters(projectId!)).data.caseStates.find((status) => status.id === id)?.label ?? "N/A";

  return (
    <Chip
      color={color}
      label={label}
      {...props}
      sx={(theme) => {
        if (color === "default") {
          return {
            bgcolor: alpha(theme.palette.text.primary, 0.08),
            color: theme.palette.text.secondary,
          };
        }

        return {
          bgcolor: alpha(theme.palette[color].light, 0.1),
          color: theme.palette[color].light,
        };
      }}
    />
  );
}
