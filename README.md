# angular-aws-amplify-issue
A sample application showing linting issues with a version of aws-amplify.

## Versions

- Angular v19.2.6
- aws-amplify v6.14.3 (works with v6.13.5)
- aws-amplify/ui-angular v5.1.1

## Building

```
npm install
ng build
```

## Output

```
Node.js version v23.11.0 detected.
Odd numbered Node.js versions will not enter LTS status and should not be used for production. For more information, please see https://nodejs.org/en/about/previous-releases/.
Application bundle generation failed. [7.085 seconds]

✘ [ERROR] TS7030: Not all code paths return a value. [plugin angular-compiler]

    node_modules/@aws-amplify/core/src/BackgroundProcessManager/BackgroundProcessManager.ts:87:1:
      87 │   add<T>(
         ╵   ~~~


✘ [ERROR] TS7030: Not all code paths return a value. [plugin angular-compiler]

    node_modules/@aws-amplify/core/src/BackgroundProcessManager/BackgroundProcessManager.ts:333:9:
      333 │   private closedFailure(description: string) {
          ╵           ~~~~~~~~~~~~~


✘ [ERROR] TS6133: '_observerOverride' is declared but its value is never read. [plugin angular-compiler]

    node_modules/@aws-amplify/core/src/Reachability/Reachability.ts:49:16:
      49 │   private static _observerOverride(status: NetworkStatus): void {
         ╵                  ~~~~~~~~~~~~~~~~~


✘ [ERROR] TS6133: '_publicKey' is declared but its value is never read. [plugin angular-compiler]

    node_modules/@aws-amplify/core/src/ServiceWorker/ServiceWorker.ts:33:9:
      33 │   private _publicKey?: string;
         ╵           ~~~~~~~~~~


✘ [ERROR] TS6133: '_subscription' is declared but its value is never read. [plugin angular-compiler]

    node_modules/@aws-amplify/core/src/ServiceWorker/ServiceWorker.ts:36:9:
      36 │   private _subscription?: PushSubscription;
         ╵           ~~~~~~~~~~~~~


✘ [ERROR] TS7030: Not all code paths return a value. [plugin angular-compiler]

    node_modules/@aws-amplify/core/src/ServiceWorker/ServiceWorker.ts:137:58:
      137 │ ...registration.pushManager.getSubscription().then(subscription => {
          ╵                                                    ~~~~~~~~~~~~~~~~~
```