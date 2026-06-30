import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";

export class SSETransport implements Transport {
  public onmessage: ((message: any) => void) | undefined;
  public onclose: (() => void) | undefined;
  public onerror: ((error: Error) => void) | undefined;

  constructor(private sendCallback: (message: any) => Promise<void>) { }

  async start(): Promise<void> { }
  async send(message: any): Promise<void> { await this.sendCallback(message); }
  async close(): Promise<void> { }
}
