# Technical Documentation of PRCC app

**PRCC** is an Angular application.

For details on the purpose and functionality of this app, see [here](../../../../README.md).

Currently the app is deployed in [github pages](https://evyatark.github.io/prcc/).
You can use the `deploy.sh` script to deploy it anywhere (see details below).

This Angular application was built based on [Treebase application](https://github.com/hasadna/treebase-app) by Adam Kariv. I have stripped some functionalities and made many changes. All faults and errors in this application are mine!

Below is a detailed technical discussion meant for programmers, developers and maintainers of this app. 

## Background

### Required skillsets
- Web Applications, HTML, CSS
- Angular
- TypeScript

### Suggested general material
I have found the following Books, websites and Video Courses helpful:
- Pluralsight ["Angular Getting Started"](https://www.pluralsight.com/courses/angular-2-getting-started-update) video course - recommended! 

### Using the app
Currently the app is deployed in [github pages](https://evyatark.github.io/prcc/).

### Required installations for development
- git (for source control. Alternatively you can download the source code from github and continue without source control)
- npm (required for development. But the deployed app does **not** need `npm`!)
- VS Code (or any other editor/IDE for web development)

See detailed installation instructions below.

## Mapbox
The map and all its layers are implemented using Mapbox JS.

All layers are hosted on Mapbox. For detailed instructions how to use Mapbox and how to upload to it, see [here](./technical03.md).

