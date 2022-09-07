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
  console.log(`
                            ug
                       b
                      g           bug
                      u        bug
      bugbug          b       g
            bug      bugbug bu
               bug  bugbugbugbugbugbug
  bug   bug   bugbugbugbugbugbugbugbugb
     bug   bug bugbugbugbugbugbugbugbugbu
   bugbugbugbu gbugbugbugbugbugbugbugbugbu
  bugbugbugbug
   bugbugbugbu gbugbugbugbugbugbugbugbugbu
     bug   bug bugbugbugbugbugbugbugbugbu
  bug   bug  gbugbugbugbugbugbugbugbugb
               bug  bugbugbugbugbugbug
            bug      bugbug  bu
      bugbug          b        g
                      u         bug
                      g            bug
                       b
                        ug
  `);

  return <div style={{ minWidth: 128 }}>{_.map(ROUTES, renderLinkItem)}</div>;
}
