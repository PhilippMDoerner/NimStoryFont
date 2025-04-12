import { inject, Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

export type PushNotificationOptions = Omit<
  NotificationOptions,
  | 'icon'
  | 'badge'
  | 'image'
  | 'en'
  | 'silent'
  | 'vibrate'
  | 'dir'
  | 'tag'
  | 'lang'
> & { campaignName: string };

export interface PushNotification {
  title: string;
  options: PushNotificationOptions;
}

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  readonly serviceWorkerPush = inject(SwPush);

  private APP_ICON_URL = '/assets/icons/icon-72x72.webp';
  private BADGE_IMG_URL = '/assets/icons/icon-96x96.webp';

  sendPushNotification(notificationConfig: PushNotification) {
    switch (Notification.permission) {
      case 'default':
        Notification.requestPermission().then(() =>
          this.sendPushNotification(notificationConfig),
        );
        return;
      case 'denied':
        return;
      case 'granted': {
        // const { campaignName, ...rest } = notificationConfig.options;
        // const config: NotificationOptions = {
        //   ...rest,
        //   tag: campaignName,
        //   icon: this.APP_ICON_URL,
        //   badge: this.BADGE_IMG_URL,
        //   silent: true,
        //   lang: 'en',
        // };
        // const notification = new Notification(notificationConfig.title, config);
      }
    }
  }
}
