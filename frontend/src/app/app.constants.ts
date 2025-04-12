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
  base_url: '/tinymce',
  suffix: '.min',
  highlight_on_focus: false,
};

export type EditorSettings = typeof TINYMCE_SETTINGS;
