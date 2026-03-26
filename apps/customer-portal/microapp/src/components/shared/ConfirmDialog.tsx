import { Button, Card, Dialog, Stack, Typography } from "@wso2/oxygen-ui";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmColor?: "error" | "primary" | "secondary" | "warning" | "success" | "info";
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  confirmColor = "primary",
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{ paper: (props) => <Card component={Stack} {...props} /> }}
      slotProps={{
        paper: {
          sx: {
            bgcolor: "background.paper",
            p: 1.5,
            gap: 3,
            m: 2,
          },
        },
      }}
    >
      <Stack>
        <Typography variant="h6" fontWeight={650} mb={0.2}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {description}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="end" gap={1}>
        <Button variant="outlined" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button color={confirmColor} variant="contained" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Stack>
    </Dialog>
  );
}
