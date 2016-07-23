# IndoorPi

## Build environment

You must have nodejs and npm installed.
The Frontend Portal relies on *Gulp* (provided by npm) to handle all serving, build and test operations.
Install it with:
```
sudo npm install --global gulp-cli bower
```

Retrieve all needed packages by running:
```
npm install
bower install
```

## Serving the project locally

To serve the project locally while targeting and communicating with the DEV API do:

```bash
gulp serve
```

## Building the project

In the same fashion, you can build the project while targeting the API environment of your choice using:

```bash
gulp build
```

```bash
gulp build:production
```

## Debugging the build

If you want to have a little more insight on what's happening during a build phase, just use the `--debug` flag. e.g. `gulp build --debug`
As of today, it'll tell you the file used to produce to `public/dist` deliverables.
# angular_1_base_template
