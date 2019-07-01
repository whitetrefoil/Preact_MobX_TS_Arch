import { action, observable } from 'mobx';
import { getReceptionist }    from '../api/endpoints/receptionist';

export class ReceptionistModel {

  @observable.struct receptionist?: Receptionist;
  @observable initialized = false;
  @observable loading     = false;
  @observable.ref failure?: Error;

  @action
  set(receptionist: Receptionist) {
    this.initialized  = true;
    this.receptionist = receptionist;
  }

  @action.bound
  async fetch() {
    this.loading = true;
    this.failure = undefined;

    try {
      const receptionist = await getReceptionist();
      this.set(receptionist);
    } catch (e) {
      this.failure = e;
    } finally {
      this.loading = false;
    }
  }
}
