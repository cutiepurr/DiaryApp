import Diary from "./diaries/Diary";
import DiaryEntryEditForm from "./diaries/DiaryEntryEditForm";
import DiaryEntryView from "./diaries/DiaryEntryView";

const AppRoutes = [
  {
    index: true,
    element: <Diary />
  },
  {
    path: '/diary/:id',
    element: <DiaryEntryView />
  },
  {
    path: '/diary/:id/edit',
    element: <DiaryEntryEditForm />
  }
];

export default AppRoutes;
