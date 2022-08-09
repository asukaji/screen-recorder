import { Link, RouteProps } from 'react-router-dom';
import { ROUTES } from './Routes';
import _ from 'lodash';

function renderLinkItem(props: RouteProps) {
  return (
    <div key={props.path} style={{ padding: '4px 12px' }}>
      <Link to={props.path ?? '/'}>{props.path}</Link>
    </div>
  );
}

export default function Links() {
  return <div style={{ minWidth: 128 }}>{_.map(ROUTES, renderLinkItem)}</div>;
}
