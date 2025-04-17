
import { setupMobileNavigation,} from './modules/nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    setupMobileNavigation();
    
    
  } catch (error) {
    console.error('Error initializing app:', error);
    handleLoadingError();
  }
});


