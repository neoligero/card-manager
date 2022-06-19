import { Container } from 'inversify';
import { bindToContainer as bindLogger } from '@shared/logger/inversify.bindings';
import { bindToContainer as bindUser } from '@modules/users/inversify.bindings';

export const container = new Container();

export const initInversify = () => {
  bindLogger(container);
  bindUser(container);
};
