import type { CallRequestDto } from "@root/src/types/engagement.dto";
import { Card, Chip, colors, pxToRem, Stack, Typography, Box } from "@wso2/oxygen-ui";
import { Clock, PhoneCall } from "@wso2/oxygen-ui-icons-react";

export function CallRequestCard(props: CallRequestDto) {
  return (
    <Card
      sx={{
        p: 1,
      }}
    >
      <Stack spacing={1}>
        <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <PhoneCall color={colors.blue[600]} size={pxToRem(18)} />
            <Box>
              <Typography variant="body1" fontWeight="medium" color="text.primary">
                Call Request
              </Typography>
            </Box>
          </Stack>
          <Chip size="small" label={props.state.label} />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            pt: 1,
            borderTop: `1px solid ${colors.grey[100]}`,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            {props.createdOn}
          </Typography>

          <Stack direction="row" gap={0.5} alignItems="center">
            <Clock size={pxToRem(13)} color={colors.grey[500]} />
            <Typography variant="subtitle2" color="text.secondary">
              {props.durationMin} Minutes
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
