import { observer } from 'mobx-react';
import * as React   from 'react';
import { IPerson }  from '../entity/person';

interface IProps {
  person: IPerson
}


const NameBoard = (props: IProps) => <span>{props.person.name} ({props.person.age})</span>;

export default observer(NameBoard);
