import Recorder from './Recorder';
import FlameGraph from './FlameGraph';
import MemoryGraph from './MemoryGraph';
import SearchTree from './SearchTree';

import { usePrompt } from '@meitu/rake';
import { useRoutes } from 'react-router-dom';

export const ROUTES = [
  {
    path: '/',
    element: <Recorder />,
  },
  {
    path: '/flame',
    element: <FlameGraph />,
  },
  {
    path: '/memory',
    element: <MemoryGraph />,
  },
  {
    path: '/tree',
    element: <SearchTree />,
  },
];

export default function Routes() {
  const cls = usePrompt('?');
  console.log(cls);

  return useRoutes(ROUTES);
}
