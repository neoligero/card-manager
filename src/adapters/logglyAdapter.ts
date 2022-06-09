import { Card } from 'src/core/cards/domain/card';
import { LogglyNotifier } from 'src/core/cards/infrastructure/notifiers/logglyNotifier';

class LogglyAdapter implements LogglyNotifier {

    public async notify(card: Card): Promise<void> {
        this.sendLog(card);
    }

    private async sendLog(card: Card) {
       return Promise.resolve();
    }
}

export default LogglyAdapter;