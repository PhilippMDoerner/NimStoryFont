import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import Plyr from 'plyr';

type HotKey = 'Space' | 'Enter' | 'KeyM' | 'ArrowRight' | 'ArrowLeft';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  imports: [],
})
export class PlayerComponent {
  private SEEK_TIME = 5;
  private VOLUME_STEP = 0.05;

  serverUrl = input.required<string>();
  audioSource = input.required<string>();
  downloadSource = input.required<string>();
  playTime = input.required<number | undefined>();

  audioPlayer = viewChild<ElementRef<HTMLAudioElement>>('audioPlayer');

  private plyr!: Plyr;

  constructor() {
    effect(() => {
      const playerElement = this.audioPlayer()?.nativeElement;
      if (!playerElement) return;

      this.plyr = new Plyr(playerElement, {
        controls: [
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'download',
          'settings',
        ],
        invertTime: false,
        seekTime: this.SEEK_TIME,
        volume: 0,
      });
    });
    effect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.plyr as any).download = this.downloadSource();
    });

    effect(() => this.setPlayTime(this.playTime()));
  }

  triggerHotkeyAction(keyPressEvent: KeyboardEvent) {
    keyPressEvent.stopPropagation();
    const pressedKey: HotKey = keyPressEvent.code as HotKey;
    switch (pressedKey) {
      case 'Space':
        this.play();
        break;
      case 'Enter':
        this.play();
        break;
      case 'KeyM':
        this.mute();
        break;
      case 'ArrowRight':
        this.seekForward();
        break;
      case 'ArrowLeft':
        this.seekBackward();
        break;
      default:
        break;
    }
  }

  private setPlayTime(time: number | undefined): void {
    if (time == null) {
      return;
    }
    this.plyr.currentTime = time;
  }

  private play(): void {
    this.plyr.togglePlay();
  }

  private seekBackward(): void {
    this.plyr.rewind(this.SEEK_TIME);
  }

  private seekForward(): void {
    this.plyr.forward(this.SEEK_TIME);
  }

  private increaseVolume(): void {
    this.plyr.increaseVolume(this.VOLUME_STEP);
  }

  private decreaseVolume(): void {
    this.plyr.decreaseVolume(this.VOLUME_STEP);
  }

  private mute(): void {
    this.plyr.muted = !this.plyr.muted;
  }
}
