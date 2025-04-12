import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Timestamp } from 'src/app/_models/sessionAudio';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { CardComponent } from 'src/app/design/atoms/card/card.component';
import { FormComponent } from 'src/app/design/molecules';
import { LinkEntryComponent } from 'src/app/design/molecules/link-entry/link-entry.component';
import { LinkEntry } from '../../molecules/_models/link-entry';
import { PlayerComponent } from '../player/player.component';

type TimestampState = 'CREATE' | 'DISPLAY';

@Component({
  selector: 'app-sessionaudio-player',
  templateUrl: './sessionaudio-player.component.html',
  styleUrls: ['./sessionaudio-player.component.scss'],
  imports: [
    PlayerComponent,
    LinkEntryComponent,
    ButtonComponent,
    FormComponent,
    CardComponent,
    NgTemplateOutlet,
  ],
})
export class SessionaudioPlayerComponent {
  sessionAudioPk = input.required<number>();
  timestamps = input.required<Timestamp[] | undefined>();
  serverUrl = input.required<string>();
  audioSource = input.required<string>();
  downloadSource = input.required<string>();
  canDelete = input.required<boolean>();
  canCreate = input.required<boolean>();

  readonly deleteTimestamp = output<Timestamp>();
  readonly createTimestamp = output<Timestamp>();

  timestampEntries = computed<LinkEntry<Timestamp>[] | undefined>(() => {
    return this.timestamps()?.map((timestamp) => ({
      value: timestamp,
      label: timestamp.name,
      linkText: this.timeToString(timestamp.time),
    }));
  });
  timestampState = signal<TimestampState>('DISPLAY');
  currentTime = signal<number | undefined>(0);
  timestampForm = new FormGroup({});
  timestampFields = computed<FormlyFieldConfig[]>(() => [
    this.formlyService.buildInputConfig({
      key: 'time',
      maxLength: 8,
      minLength: 8,
      placeholder: 'hh:mm:ss',
      className: 'timestamp-input black-background px-0 col-lg-2 col-3',
      validators: ['time'],
      required: true,
      inputKind: 'STRING',
    }),
    this.formlyService.buildInputConfig({
      key: 'name',
      label: 'Title',
      className: 'timestamp-input black-background px-0 col-lg-10 col-9',
      required: true,
      inputKind: 'STRING',
    }),
  ]);
  timestampModel = signal<
    Exclude<Partial<Timestamp>, 'time'> & { time?: string }
  >({});

  constructor(private formlyService: FormlyService) {}

  changeTimestampState(newState: TimestampState) {
    this.timestampState.set(newState);
  }

  onLinkClick(timestamp: Timestamp) {
    this.currentTime.set(timestamp.time);
    // currentTime is set to undefined so that clicking the same
    // timestamp again resets the playtime on the player again
    // Must be done async as otherwise the two set operations get
    // optimized to solely setting "undefined" and no change events in
    // player-component get thrown.
    setTimeout(() => this.currentTime.set(undefined), 1);
  }

  onSubmit(timestamp: { name?: string; time?: string }): void {
    // const time: number = this.stringToTime(timestamp.time as string);
    const newTimestamp = {
      name: timestamp.name as string,
      time: this.stringToTime(timestamp.time as string),
      session_audio: this.sessionAudioPk(),
    };

    this.createTimestamp.emit(newTimestamp);
    this.timestampState.set('DISPLAY');
    this.timestampModel.set({});
  }

  private timeToString(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const remainingSeconds = Math.floor(seconds - hours * 3600 - minutes * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  private stringToTime(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
}
