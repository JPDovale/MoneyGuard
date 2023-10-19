import * as Toast from '@radix-ui/react-toast';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppRoutes } from '@routes/AppRoutes';

export default function App() {
  return (
    <Toast.Provider
      swipeDirection="down"
      label="Notificação"
      duration={1000 * 5}
    >
      <Router>
        <AppRoutes />
      </Router>

      <Toast.Viewport className="fixed  bottom-0 right-10 flex flex-col p-6 gap-2 w-80 max-w-[100vw] m-0 list-none z-50 outline-none" />
    </Toast.Provider>
  );
}
