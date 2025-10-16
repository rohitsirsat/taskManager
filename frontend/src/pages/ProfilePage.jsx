import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LocalStorage } from "@/utils";
import { Button } from "@/components/ui/button";

export function ProfilePage({ className }) {
  const getStoredUser = LocalStorage.get("user");

  return (
    <Card
      className={cn(
        "w-full max-w-3xl mx-auto border border-border/80 bg-card text-card-foreground rounded-xl overflow-hidden",
        className,
      )}
      aria-label="User profile"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6">
        <Avatar className="h-20 w-20 ring-2 ring-border/60">
          <AvatarImage
            src={getStoredUser.avatar?.url || "/placeholder.svg"}
            alt={`${getStoredUser.username} avatar`}
          />
          <AvatarFallback>{getStoredUser.username}</AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-semibold leading-tight text-pretty">
            {getStoredUser.username}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {getStoredUser.email}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
            <Badge variant="secondary" className="px-2.5 py-1 rounded-md">
              {getStoredUser.role}
            </Badge>
            <Badge
              className={cn(
                "px-2.5 py-1 rounded-md",
                getStoredUser.isEmailVerified
                  ? "bg-emerald-600 text-emerald-50"
                  : "bg-amber-600 text-amber-50",
              )}
            >
              {getStoredUser.isEmailVerified
                ? "Email Verified"
                : "Email Not Verified"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-border/70" />

      {/* Details */}
      <div className="p-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border/60 p-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Username
            </dt>
            <dd className="mt-1">{getStoredUser.username}</dd>
          </div>

          <div className="rounded-lg border border-border/60 p-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Email
            </dt>
            <dd className="mt-1">{getStoredUser.email}</dd>
          </div>

          <div className="rounded-lg border border-border/60 p-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Role
            </dt>
            <dd className="mt-1 capitalize">{getStoredUser.role}</dd>
          </div>

          <div className="rounded-lg border border-border/60 p-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Email
            </dt>
            <dd className="mt-1 font-mono text-sm break-all">
              <Button variant="link" size="sm">
                Click here to verify email
              </Button>
            </dd>
          </div>

          <div className="rounded-lg border border-border/60 p-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Created At
            </dt>
            <dd className="mt-1">{getStoredUser.createdAt.slice(0, 10)}</dd>
          </div>

          <div className="rounded-lg border border-border/60 p-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Updated At
            </dt>
            <dd className="mt-1">{getStoredUser.updatedAt.slice(0, 10)}</dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}

export default ProfilePage;
