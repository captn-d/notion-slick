import { defineManifest } from '@crxjs/vite-plugin';
import packageJson from './package.json';

// get version key from package.json
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
	// can only contain digits, dots, or dash
	.replace(/[^\d.-]+/g, '')
	// split into version parts
	.split(/[.-]/);

export default defineManifest(async () => ({
	manifest_version: 3,
	// manifest comptaible version number (up to four numbers separated by dots)
	version: `${major}.${minor}.${patch}.${label}`,
	// semver is OK in "version_name"
	version_name: version,
	name: '__MSG_extensionName__',
	background: {
		service_worker: 'src/background.ts',
		type: 'module',
	},
	content_scripts: [{
		js: [
			'src/toc.tsx', // table of contents
			'src/disable-ai.ts', // disable Q&A and AI on space press
		],
		matches: [ '*://*.notion.so/*' ],
	}],
	default_locale: 'en',
	description: '__MSG_extensionDescription__',
	icons: {
		16: 'images/icon-16.png',
		32: 'images/icon-32.png',
		48: 'images/icon-48.png',
		128: 'images/icon-128.png',
	},
	action: {
		default_icon: 'logo.svg',
		default_popup: 'src/popup.html',
		default_title: '__MSG_extensionName__ settings',
	},
	key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuiMgClMKDeqQlrr5LenYCszVh7NWkpMtEDTL0DMn53lvCei/+9rbIoBxyO9zM9pnMj4sOOD37dsuWdtgAAi42b3j+zuowYfegfSXHdxOUe8A1sK/S/sYZPiQqqMnGvehzzfou1SMAptB9b7u3BvwK8RuZolO8c6Z+KVwYS4vq+guOvdfNlms4Z1HQfdK1h9aktbBkXeTBt34qH0+3iSjC8rHAHEMRLxH0fS6O11CroXcEMbr2RFPpuT2QY8zssaIs5ZlEXFYiPf31SyFTBJENGSQev7UP8YtLMtzhmB6aoWPiFKnf5s0E8zGcu2KszNezzKKv7dGm/ZQl9vz7AVL2QIDAQAB',
	permissions: [ 'webNavigation', 'storage', 'tabs' ],
	update_url: 'https://clients2.google.com/service/update2/crx',
}));