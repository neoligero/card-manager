import { Card } from '../../domain/card';

export interface LogglyNotifier {

  notify(card: Card): Promise<void>;

}