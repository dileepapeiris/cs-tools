import { Card, Skeleton, Stack, Typography } from "@wso2/oxygen-ui";
interface CommentProps {
  children: string;
  author: string;
  timestamp: string;
}

export function Comment({ children, author, timestamp }: CommentProps) {
  return (
    <Card component={Stack} p={1} gap={1.5} sx={{ bgcolor: "background.default" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" fontWeight="medium">
          {author}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {timestamp}
        </Typography>
      </Stack>
      <Typography variant="body2">{children}</Typography>
    </Card>
  );
}

export function CommentSkeleton() {
  return (
    <Card component={Stack} p={1} gap={1.5} sx={{ bgcolor: "background.default" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          <Skeleton width={100} />
        </Typography>
        <Typography variant="caption">
          <Skeleton width={60} />
        </Typography>
      </Stack>

      <Typography variant="body2">
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
      </Typography>
    </Card>
  );
}
