import { injectable } from 'inversify';

@injectable()
class LogglyAdapter {

  public async notify(msg: string): Promise<void> {
    this.sendLog(msg);
  }

  private async sendLog(msg: string) {
    return Promise.resolve();
  }
}

export default LogglyAdapter;