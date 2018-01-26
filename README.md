# cix-lic [![Build Status](https://travis-ci.org/cix-cdx/cix-lic.svg?branch=master&bust=1)](https://travis-ci.org/cix-cdx/cix-lic) [![Coverage Status](https://coveralls.io/repos/github/cix-cdx/cix-lic/badge.svg?branch=master&bust=1)](https://coveralls.io/github/cix-cdx/cix-lic?branch=master)

Licensing via CLI (Command-Line), CI (Continuous Integration), and API

## Overview

This **cix-lic** modules can license a project via several capabilities.

- **CLI** - Command Line
- **CI** - Continuous Integration
- **API** - Application Program Interface

#### LIC Properties

Before we use **cix-lic**, it's important to know what properties are used. It's called **LIC Properties**.

- **lic** | **-l** - the **license identifier**, _see_ [**licenses**](https://spdx.org/licenses) - _default: "License"_

- **owner** | **-o** - the **owner** - _default: "Unknown"_

- **beginYear** | **-b** - the **declarative begin year** - _default: current year_

- **endYear** | **-e** - the **declarative end year** - _default: "Present"_

- **proc** | **-p** - the **process** - _default: ["lic", "file"]_

- **baseDir** | **-d** - the **directory** where to query files - _default: root source directory_

- **filter** | **-f** - the **file filter** can be **string**, **RegExp**, or **{ test: () => _boolean_ }** - _default: *.js_

- **HFLcontent** | **-h** - the **Head File License Content** (file header content) - _default: undefined_

- **licenseContent** | **-c** - the **License Content** (license content) - _default: undefined_

- **licenseFile** - the **License File** (license file) - _default: ./LICENSE_

### CLI - Command Line

#### Installation

```javascript
npm install -g cix-lic
```

#### Usage

```javascript
cix-lic [Command Tags]
```

### CI - Continuous Integration

#### Installation

```javascript
npm install cix-lic --save-dev
```

#### Usage

In **package.json** file, 

```javascript
// in package.json file
{
  "scripts": {
    "cix-lic": "cix-lic [Command Tags]"
    ...
  }
}
```

Then, we can run **cix-lic** script in **CI Process**.

### CIX-LIC Command

**Command Tags** are [**LIC Properties**](#lic-properties)

**Examples**

cix-lic **-o** _Jane Smith_ **-l** _mit_ >> **owner**: _Jane Smith_, **lic**: _MIT License_

cix-lic **-d** _./lib_ **-l** _apache-2.0_ >> **baseDir**: _./lib_, **lic**: _Apache License 2.0_

