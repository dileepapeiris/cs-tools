import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { Card, Stack, Avatar as MuiAvatar, Typography, Chip, useTheme, pxToRem, Skeleton } from "@wso2/oxygen-ui";
import { ShieldUser, ChevronRight, Mail } from "@wso2/oxygen-ui-icons-react";
import { capitalize, stringAvatar } from "@utils/others";
import type { Role, User } from "@src/types";

dayjs.extend(relativeTime);

export interface UserListItemProps {
  name: string;
  email: string;
  role: Role;
  lastActive: string;
}

export function UserListItem({ firstName, lastName, email, roles, lastActive }: User) {
  const theme = useTheme();
  const admin = roles.includes("Admin");

  return (
    <Card
      component={Link}
      elevation={0}
      to="/users/edit"
      state={{ email, name: firstName + " " + lastName, role: roles[0] }}
      sx={{ textDecoration: "none", p: 1 }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Avatar>{`${firstName} ${lastName}`}</Avatar>

          <Stack>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography variant="subtitle1" fontWeight="medium" noWrap>
                {`${firstName} ${lastName}`}
              </Typography>
              {roles.length > 0 && <Chip size="small" label={capitalize(roles[0])} />}
            </Stack>

            <Stack direction="row" alignItems="center" gap={1}>
              <Mail color={theme.palette.text.secondary} size={pxToRem(13)} />
              <Typography variant="subtitle2" fontWeight="regular" color="text.secondary">
                {email}
              </Typography>
            </Stack>

            <Typography variant="caption" fontWeight="regular" color="text.secondary" mt={0.5}>
              Last Active: {dayjs(lastActive).fromNow()}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" gap={2}>
          {admin && <ShieldUser color={theme.palette.primary.main} size={pxToRem(28)} />}
          <ChevronRight color={theme.palette.text.secondary} size={pxToRem(18)} />
        </Stack>
      </Stack>
    </Card>
  );
}

export function Avatar({ children }: { children: string }) {
  return (
    <MuiAvatar
      sx={(theme) => ({
        height: 40,
        width: 40,
        bgcolor: "primary.main",
        fontSize: theme.typography.h5,
        fontWeight: "medium",
      })}
    >
      {stringAvatar(children)}
    </MuiAvatar>
  );
}

export function UserListItemSkeleton() {
  return (
    <Card elevation={0} sx={{ p: 1, pointerEvents: "none" }}>
      <Stack direction="row" alignItems="center" gap={2}>
        <Skeleton variant="circular" width={40} height={40} />

        <Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <Skeleton variant="text" width={120} height={24} />
            <Skeleton variant="rounded" width={50} height={20} />
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            <Skeleton variant="circular" width={13} height={13} />
            <Skeleton variant="text" width={180} height={20} />
          </Stack>

          <Skeleton variant="text" width={100} height={16} sx={{ mt: 0.5 }} />
        </Stack>
      </Stack>
    </Card>
  );
}
