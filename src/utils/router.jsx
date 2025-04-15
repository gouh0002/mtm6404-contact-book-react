import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../routes/Home";
import AddContact from "../routes/AddContact";
import EditContact from "../routes/EditContact";
import ContactDetails from "../routes/ContactDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "add", element: <AddContact /> },
      { path: "edit/:id", element: <EditContact /> },
      { path: "contact/:id", element: <ContactDetails /> },
    ],
  },
]);

export default router;