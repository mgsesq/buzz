import type { SVGProps } from "react";
import { Globe } from "lucide-react";

import { GitHubMark } from "./GitHubMark";
import { GitLabMark } from "./GitLabMark";

type ExternalForgeIconProps = SVGProps<SVGSVGElement> & {
  host: string;
};

export function ExternalForgeIcon({ host, ...props }: ExternalForgeIconProps) {
  if (host === "github.com") return <GitHubMark {...props} />;
  if (host === "gitlab.com") return <GitLabMark {...props} />;
  return <Globe {...props} />;
}
