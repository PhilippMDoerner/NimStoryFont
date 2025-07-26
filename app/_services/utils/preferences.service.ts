import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { KeyCombination, parseKeyCombinationStr } from 'src/app/_models/hotkey';
import {
  GeneralMetadata,
  MetaDataEntry,
  MetaDataEntryRaw,
  MetaDataKind,
  ShortcutMetadataEntry,
} from 'src/app/_models/userMetadata';
import { SidebarOption } from 'src/app/design/molecules';
import { environment } from 'src/environments/environment';
import { toBoolean } from 'src/utils/bool';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  private readonly searchPreferenceKey = 'AldruneSearchPreferences';
  private readonly settingsApiUrl = `${this.apiUrl}/user/me/settings`;

  getGeneralUserMetadata(): Observable<GeneralMetadata> {
    return this.getUserMetadata('general').pipe(
      map((entryMap) => {
        const getEntry = (name: keyof GeneralMetadata) => entryMap.get(name);

        return {
          hasSeenOnboarding: toBoolean(getEntry('hasSeenOnboarding')),
        };
      }),
    );
  }

  getUserShortcuts(): Observable<ShortcutMetadataEntry[]> {
    return this.http
      .get<MetaDataEntry[]>(`${this.settingsApiUrl}/shortcut/`)
      .pipe(
        map((entries) =>
          entries?.map(
            (entry) =>
              ({
                ...entry,
                value: parseKeyCombinationStr(entry.value) as KeyCombination,
              }) satisfies ShortcutMetadataEntry,
          ),
        ),
      );
  }

  createUserMetadataEntry(entry: MetaDataEntryRaw): Observable<MetaDataEntry> {
    return this.http.post<MetaDataEntry>(`${this.settingsApiUrl}/`, entry);
  }

  updateUserMetadataEntry(entry: MetaDataEntry): Observable<MetaDataEntry> {
    return this.http.put<MetaDataEntry>(
      `${this.settingsApiUrl}/pk/${entry.id}/`,
      entry,
    );
  }

  deleteUserMetadataEntry(entryId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.settingsApiUrl}/pk/${entryId}/`)
      .pipe(map(() => void 0));
  }

  getStoredSearchPreferences(): SidebarOption | null {
    return this.getStoredPreferences(this.searchPreferenceKey);
  }

  storeSearchPreferences(preferences: SidebarOption): void {
    this.storePreferences(preferences, this.searchPreferenceKey);
  }

  private getStoredPreferences(key: string): SidebarOption | null {
    const preferencesJson: string | null = localStorage.getItem(key);
    const hasPreferences = preferencesJson != null;
    if (!hasPreferences) {
      return null;
    }
    return JSON.parse(preferencesJson);
  }

  private storePreferences(preferences: SidebarOption, key: string): void {
    const preferencesJson: string = JSON.stringify(preferences);
    localStorage.setItem(key, preferencesJson);
  }

  private getUserMetadata(
    category: MetaDataKind,
  ): Observable<Map<string, string>> {
    return this.http
      .get<MetaDataEntry[]>(`${this.settingsApiUrl}/${category}/`)
      .pipe(
        map((entries) =>
          entries.reduce((map, entry) => {
            map.set(entry.name, entry.value);
            return map;
          }, new Map()),
        ),
      );
  }
}
