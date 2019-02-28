import { inject, observer } from 'mobx-react';
import React                from 'react';
import { AppState }         from '../store/AppState';
import NameBoard            from './NameBoard';

interface IProps {
  app?: AppState
}

@inject('app')
@observer
export default class CompanyView extends React.Component<IProps> {

  render() {

    const staff = this.props.app!.staff.map(s => <li key={s.name}><NameBoard person={s}/></li>);

    return (
      <div className="company">
        <h1>{this.props.app!.name}</h1>

        <p>
          <button onClick={this.props.app!.nextYear}>See what will happen next year&hellip;</button>
        </p>

        <p>Owner: <NameBoard person={this.props.app!.boss}/></p>

        <p>Staff:</p>
        <ul>{staff}</ul>
      </div>
    );
  }
}
