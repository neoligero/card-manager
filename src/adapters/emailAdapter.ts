import { Card } from 'src/core/cards/domain/card';
import { EmailNotifier } from 'src/core/cards/infrastructure/notifiers/emailNotifier';

class EmailAdapter implements EmailNotifier {

    public async notify(card: Card): Promise<void> {
        this.sendMail(card);
    }

    private async sendMail(card: Card) {
       return Promise.resolve();
    }
}

export default EmailAdapter;