import { action, observable } from 'mobx';
import { IPerson }            from '../entity/person';

export class AppState {

  @observable name: string = 'Demo World';

  @observable boss: IPerson = { name: 'Demo Boss', age: 50 };

  @observable staff: IPerson[] = [
    { name: 'Tim Whatever', age: 22 },
    { name: 'Jon Whenever', age: 33 },
    { name: 'Mill Whoever', age: 44 },
  ];

  @action.bound nextYear() {
    this.boss.age += 1;
    this.staff.forEach(s => s.age += 1);
  }
}
