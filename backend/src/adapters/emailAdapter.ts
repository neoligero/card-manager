import { injectable } from "inversify";

@injectable()
class EmailAdapter {

  public async notify(msg: string): Promise<void> {
    this.sendMail(msg);
  }

  private async sendMail(msg: string) {
    return Promise.resolve();
  }
}

export default EmailAdapter;