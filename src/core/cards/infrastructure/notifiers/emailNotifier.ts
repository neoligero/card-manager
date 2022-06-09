import { Card } from '../../domain/card';

export interface EmailNotifier {

  notify(card: Card): Promise<void>;

}