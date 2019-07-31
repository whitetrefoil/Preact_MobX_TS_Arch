import { action, computed, observable } from 'mobx';
import { getReceptionist }              from '../api/endpoints/receptionist';

export class ReceptionistModel {

  @observable.struct receptionist?: Receptionist;
  @observable initialized = false;
  @observable loading = false;
  @observable.ref failure?: Error;

  @computed
  get greeting(): string {
    return this.receptionist == null ? 'Waiting for a receptionist...' : `${this.receptionist.name}: Hello!`;
  }

  @action
  set(receptionist: Receptionist) {
    this.initialized = true;
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


export const receptionistModel = new ReceptionistModel();

export default receptionistModel;
