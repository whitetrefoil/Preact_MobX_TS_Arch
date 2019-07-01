import { FunctionComponent, h } from 'preact';
import { useState }             from 'preact/hooks';
import * as css                 from './Nested.scss';


interface Props {
  name?: string;
}

const Nested: FunctionComponent<Props> = props => {
  const [testData, setTestData] = useState('This is a test string');

  return (
    <div className={`nested ${css.nested}`}>
      <h1 className="h1">[component] Nested</h1>

      <p>This is a component in "{props.name}" module.</p>

      <p>{testData}</p>
    </div>
  );
};


export default Nested;
