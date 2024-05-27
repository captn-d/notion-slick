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
		default_icon: {
			16: 'images/icon-16.png',
			32: 'images/icon-32.png',
			48: 'images/icon-48.png',
			128: 'images/icon-128.png',
		},
		default_popup: 'src/popup.html',
		default_title: '__MSG_extensionName__ settings',
	},
	permissions: [ 'webNavigation', 'storage'],
	update_url: 'https://clients2.google.com/service/update2/crx',
}));