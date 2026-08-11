// import { EmbedBlot } from 'parchment';
import Quill, { QuillOptions } from 'quill';
import TableUp, {
  defaultCustomSelect,
  TableAlign,
  TableMenuContextmenu,
  TableResizeScale,
  TableSelection,
  TableVirtualScrollbar,
} from 'quill-table-up';
export const MOBILE_WIDTH = 767; //medium screen size
export const SWIPE_X_THRESHOLD = 125;
export const SWIPE_Y_THRESHOLD = 150;
export const PROLOGUE_FORBIDDEN_CHARACTERS = /[[\]()|\\%~#<>?/,]/g;
export const SCROLL_UP_DISTANCE = 500;

export const TINYMCE_SETTINGS = {
  plugins: [
    'advlist',
    'autolink',
    'autosave',
    'lists',
    'link',
    'image',
    'charmap',
    'anchor',
    'searchreplace',
    'visualblocks',
    'media',
    'table',
    'help',
    'wordcount',
  ],
  toolbar: [
    'restoredraft undo redo | formatselect | bold italic underline strikethrough subscript superscript link unlink blockquote | backcolor forecolor hilitecolor fontsizeselect |',
    'alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | table help',
  ],
  skin: 'oxide-dark',
  content_css: 'dark',
  browser_spellcheck: true,
  menubar: false,
  height: 500,
  convert_urls: false,
  relative_urls: false,
  branding: false,
  base_url: '/wiki2/tinymce',
  suffix: '.min',
  highlight_on_focus: false,
};

export type EditorSettings = typeof TINYMCE_SETTINGS;

Quill.register({ [`modules/${TableUp.moduleName}`]: TableUp }, true);

// We temporarily disable this for now because I currently do not want to deal with bugs that softbreak introduces
// class SoftBreak extends EmbedBlot {}
// SoftBreak.blotName = 'softbreak';
// SoftBreak.tagName = 'BR';
// Quill.register(SoftBreak);

export const QUILL_SETTINGS: QuillOptions = {
  theme: 'snow',
  modules: {
    // Quill's history module is roughly equivalent to
    // TinyMCE's undo/redo functionality.
    history: {
      delay: 1000,
      maxStack: 100,
      userOnly: true,
    },
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        { script: 'sub' },
        { script: 'super' },
      ],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video'],
      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [
        // use picker to enable the customSelect option
        { [TableUp.toolName]: [] },
      ],
      ['clean'],
    ],
    [TableUp.moduleName]: {
      customSelect: defaultCustomSelect,
      modules: [
        { module: TableVirtualScrollbar },
        { module: TableAlign },
        { module: TableResizeScale },
        { module: TableSelection },
        { module: TableMenuContextmenu },
      ],
    },
  },
  placeholder: '',
} as const;
