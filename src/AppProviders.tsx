import { DataProvider } from './components/DataProvider';
import { SnackbarProvider } from './components/SnackbarProvider';
import { ThemeProvider } from '@mui/material';
import { TaskManagerProvider } from "./components/TaskManagerProvider"
import theme from './theme';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <TaskManagerProvider>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </SnackbarProvider>
      </TaskManagerProvider>
    </DataProvider>
  );
}
