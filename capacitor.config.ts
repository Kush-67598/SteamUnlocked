import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.steamunlocked.app",
  appName: "SteamUnlockedApp",
  webDir: "public",
  server: {
    url: "https://steamunlocked-mocha.vercel.app",
    cleartext: false,
  },
};

export default config;
