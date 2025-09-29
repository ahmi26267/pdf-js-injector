import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download, X } from "lucide-react";

const CURRENT_VERSION = "1.0.0";
const VERSION_CHECK_URL = "https://api.github.com/repos/ahmi/pdf-js-injector/releases/latest";
const CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

export const UpdateChecker = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestVersion, setLatestVersion] = useState("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const lastCheck = localStorage.getItem("lastUpdateCheck");
        const now = Date.now();

        // Check if we should check for updates
        if (lastCheck && now - parseInt(lastCheck) < CHECK_INTERVAL) {
          return;
        }

        const response = await fetch(VERSION_CHECK_URL);
        const data = await response.json();
        const latest = data.tag_name?.replace('v', '') || data.name?.replace('v', '');

        if (latest && latest !== CURRENT_VERSION) {
          setLatestVersion(latest);
          setUpdateAvailable(true);
        }

        localStorage.setItem("lastUpdateCheck", now.toString());
      } catch (error) {
        console.error("Failed to check for updates:", error);
      }
    };

    checkForUpdates();
  }, []);

  if (!updateAvailable || dismissed) {
    return null;
  }

  return (
    <Alert className="fixed bottom-4 right-4 max-w-md z-50 border-primary bg-background/95 backdrop-blur">
      <Download className="h-4 w-4" />
      <AlertTitle className="flex items-center justify-between">
        Update Available
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertTitle>
      <AlertDescription className="space-y-2">
        <p>Version {latestVersion} is now available. Current: {CURRENT_VERSION}</p>
        <div className="space-y-2 text-sm">
          <p className="font-medium">Update with Docker:</p>
          <code className="block bg-muted p-2 rounded text-xs">
            docker pull ghcr.io/ahmi/pdf-js-injector:latest<br/>
            docker restart pdf-injector
          </code>
          <p className="font-medium mt-2">Update with Podman:</p>
          <code className="block bg-muted p-2 rounded text-xs">
            podman pull ghcr.io/ahmi/pdf-js-injector:latest<br/>
            podman restart pdf-injector
          </code>
        </div>
      </AlertDescription>
    </Alert>
  );
};
