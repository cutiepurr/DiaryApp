import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Diary from "./diaries/Diary";
import DiaryEntryView from "./diaries/DiaryEntryView";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/diary',
    element: <Diary />
  },
  {
    path: '/diary/:id',
    element: <DiaryEntryView />
  }
];

export default AppRoutes;
