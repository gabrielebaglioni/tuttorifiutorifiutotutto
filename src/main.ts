import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { inject } from '@vercel/analytics';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();
platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    inject();
  })
  .catch(err => console.error(err));

