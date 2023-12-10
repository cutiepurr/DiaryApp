import Diary from "./diaries/Diary";
import { DiaryEntryEditForm } from "./diaries/DiaryEntryEditForm";
import { DiaryEntryPage } from "./diaries/DiaryEntryView";

const AppRoutes = [
  {
    index: true,
    element: <Diary />
  },
  {
    path: '/diary/:id',
    element: <DiaryEntryPage />
  },
  {
    path: '/diary/:id/edit',
    element: <DiaryEntryEditForm />
  }
];

export default AppRoutes;
