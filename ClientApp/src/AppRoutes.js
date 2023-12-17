import AuthenticationGuard from "./authentication/AuthenticationGuard";
import Diary from "./diaries/Diary";
import { DiaryEntryCreateForm } from "./diaries/DiaryEntryCreateForm";
import { DiaryEntryEditForm } from "./diaries/DiaryEntryEditForm";
import { DiaryEntryPage } from "./diaries/DiaryEntryView";

const AppRoutes = [
  {
    index: true,
    element: <AuthenticationGuard component={Diary} />,
  },
  {
    path: "/diary/:id",
    element: <AuthenticationGuard component={DiaryEntryPage} />,
  },
  {
    path: "/diary/:id/edit",
    element: <AuthenticationGuard component={DiaryEntryEditForm} />,
  },
  {
    path: "/diary/new",
    element: <AuthenticationGuard component={DiaryEntryCreateForm} />,
  },
];

export default AppRoutes;
