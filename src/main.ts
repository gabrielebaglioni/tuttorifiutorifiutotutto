import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { inject } from '@vercel/analytics';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    inject();
  })
  .catch(err => console.error(err));
