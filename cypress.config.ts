import {defineConfig} from 'cypress'
import {addMatchImageSnapshotPlugin} from '@simonsmith/cypress-image-snapshot/plugin'

export default defineConfig({
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    e2e: {
        setupNodeEvents(on, config) {
            addMatchImageSnapshotPlugin(on);

            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.name === 'chrome' && browser.isHeadless) {
                    launchOptions.args.push('--window-size=1920,1080')
                    launchOptions.args.push('--force-device-scale-factor=1')
                }
                return launchOptions
            });
        }
    },
    projectId: "5k4rdx",
    screenshotOnRunFailure: true,
    scrollBehavior: false,
    video: true,
    videoCompression: false,
    retries: {
        runMode: 2,
        openMode: 0
    }
})
