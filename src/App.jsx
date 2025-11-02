import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { HomePage } from "./components";

function App() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    // Add your refresh logic here
    setLastUpdated(new Date());
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <ThemeProvider>
      <HomePage
        onRefresh={handleRefresh}
        loading={loading}
        lastUpdated={lastUpdated}
      />
    </ThemeProvider>
  );
}

export default App;
