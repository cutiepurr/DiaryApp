import Diary from "./diaries/Diary";
import { DiaryEntryCreateForm } from "./diaries/DiaryEntryCreateForm";
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
  },
  {
    path: '/diary/new',
    element: <DiaryEntryCreateForm />
  }
];

export default AppRoutes;
