import { Card } from '../domain/card';
import { CardRepository } from '../infrastructure/persistence/CardRepository';
import { LogglyNotifier } from '../infrastructure/notifiers/logglyNotifier';
import { EmailNotifier } from '../infrastructure/notifiers/emailNotifier';

const createCard = (
    cardRepository: CardRepository,
    logglyNotifier: LogglyNotifier,
    emailNotifier: EmailNotifier
) => async (card: Card) => {
      // Logic and tranforms
      await cardRepository.save(card);
      await logglyNotifier.notify(card);
      await emailNotifier.notify(card);
    }

export default createCard;