import '@testing-library/jest-dom';

// Source - https://stackoverflow.com/a
// Posted by leonheess, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-19, License - CC BY-SA 4.0

import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
