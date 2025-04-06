import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// MCPサーバーを作成
const server = new McpServer({
  name: "時間表示サーバー",
  version: "1.0.0",
});

server.tool(
  "get-current-time",
  // オプションでパラメータを受け取る
  { format: z.enum(["full", "date", "time"]).optional() },
  async ({ format = "full" }) => {
    const now = new Date();
    let timeString = "";

    switch (format) {
      case "date":
        timeString = now.toLocaleDateString("ja-JP");
        break;
      case "time":
        timeString = now.toLocaleTimeString("ja-JP");
        break;
      case "full":
        timeString = now.toLocaleString("ja-JP");
        break;
      default:
        timeString = now.toLocaleString("ja-JP");
        break;
    }

    return {
      content: [
        {
          type: "text",
          text: `現在の時刻は ${timeString} です。`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
