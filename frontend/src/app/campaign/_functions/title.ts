import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

type TitleSegment =
  | {
      kind: 'PARAM';
      param: string;
    }
  | {
      kind: 'TEXT';
      text: string;
    }
  | {
      kind: 'PARAM_WITH_TEXT';
      param: string;
      prefix?: string;
      suffix?: string;
    };

function toStringSegment(route: ActivatedRouteSnapshot, segment: TitleSegment) {
  switch (segment.kind) {
    case 'PARAM':
      return route.params[segment.param];
    case 'TEXT':
      return segment.text;
    case 'PARAM_WITH_TEXT': {
      const param = route.params[segment.param];
      return `${segment.prefix || ''} ${param} ${segment.suffix || ''}`;
    }
  }
}

export const paramTitle = (segments: TitleSegment[]): ResolveFn<string> => {
  return (route: ActivatedRouteSnapshot) => {
    return segments
      .map((segment) => toStringSegment(route, segment))
      .filter(Boolean)
      .join(' - ');
  };
};

export const campaignTitle = (title: string): ResolveFn<string> =>
  paramTitle([
    {
      kind: 'PARAM',
      param: 'campaign',
    },
    {
      kind: 'TEXT',
      text: title,
    },
  ]);

export const articleTitle = (middleSegment: string): ResolveFn<string> =>
  paramTitle([
    {
      kind: 'PARAM',
      param: 'campaign',
    },
    {
      kind: 'TEXT',
      text: middleSegment,
    },
    {
      kind: 'PARAM',
      param: 'name',
    },
  ]);

export const diaryentryTitle = (): ResolveFn<string> =>
  paramTitle([
    {
      kind: 'PARAM',
      param: 'campaign',
    },
    {
      kind: 'PARAM_WITH_TEXT',
      param: 'sessionNumber',
      prefix: 'Diaryentry#',
    },
    {
      kind: 'PARAM_WITH_TEXT',
      param: 'authorName',
      prefix: 'by',
    },
  ]);

export const markerTitle = (): ResolveFn<string> =>
  paramTitle([
    {
      kind: 'PARAM',
      param: 'campaign',
    },
    {
      kind: 'TEXT',
      text: 'Marker',
    },
    {
      kind: 'PARAM',
      param: 'location_name',
    },
  ]);

export const sessionaudioTitle = (): ResolveFn<string> =>
  paramTitle([
    {
      kind: 'PARAM',
      param: 'campaign',
    },
    {
      kind: 'PARAM_WITH_TEXT',
      param: 'sessionNumber',
      prefix: 'Recording of Session#',
    },
  ]);
