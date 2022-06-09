import CardCreator from './cardCreator';
import MongoAdapter from '../../../adapters/mongoAdapter'
import LogglyAdapter from '../../../adapters/logglyAdapter'
import EmailAdapter from '../../../adapters/emailAdapter'

const mongoRepository = new MongoAdapter();
const logglyNotifier = new  LogglyAdapter();
const emailAdapter = new  EmailAdapter();

export default CardCreator(mongoRepository, logglyNotifier, emailAdapter);